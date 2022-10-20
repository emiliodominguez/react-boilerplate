import { useState, useEffect, useRef } from 'react';
import { className } from '@app/helpers';
import styles from './Toast.module.scss';

export type TToast = typeof Toast;

export interface IToastProps {
	type: 'danger' | 'warning' | 'success';
	text: string;
	onTop?: boolean;
	delay?: number;
	maxWidth?: number;
	verticalOffset?: number;
	hideCloseButton?: boolean;
	action?: { text: string; callback: () => void };
	close: () => void;
}

interface IUseToastPayload {
	showToast: (props: IToastProps) => void;
	closeToast: (delay?: number) => number;
	Toast: () => JSX.Element;
}

/**
 * The toast component
 */
function Toast(props: IToastProps): JSX.Element {
	return (
		<div
			role="dialog"
			{...className(styles.toast, styles[props.type], { [styles.toTop]: props.onTop })}
			style={
				{
					'--toast-max-width': !!props.maxWidth && `${props.maxWidth}px`,
					'--toast-vertical-offset': !!props.verticalOffset && `${props.verticalOffset}px`
				} as Record<string, string>
			}>
			<span>{props.text}</span>

			{props.action && (
				<button className={styles.actionBtn} onClick={props.action.callback}>
					{props.action.text}
				</button>
			)}

			{!props.hideCloseButton && (
				<button className={styles.closeBtn} onClick={props.close}>
					Close
				</button>
			)}
		</div>
	);
}

/**
 * A hook to configure and display a toast
 */
export function useToast(): IUseToastPayload {
	const [toastProps, setToastProps] = useState<IToastProps | null>(null);
	const timeoutRef = useRef<number>();

	useEffect(() => {
		if (!!toastProps?.delay) closeToast(toastProps.delay);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [toastProps]);

	/**
	 * Show quick toast
	 */
	function showToast(props: IToastProps): void {
		setToastProps({ ...props, close: closeToast });
	}

	/**
	 * Closes the toast
	 */
	function closeToast(delay?: number): number {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => setToastProps(null), delay || 0);
		return timeoutRef.current;
	}

	return {
		showToast,
		closeToast,
		Toast: () => (!!toastProps ? <Toast {...toastProps} /> : <></>)
	};
}
