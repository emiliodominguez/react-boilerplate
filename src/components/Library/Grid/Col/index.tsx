import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import { className } from '@app/helpers';
import styles from './Col.module.scss';

const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

type TColSize = typeof sizes[number];

interface IColProps extends HTMLAttributes<HTMLDivElement> {
	sm?: TColSize;
	md?: TColSize;
	lg?: TColSize;
	xl?: TColSize;
	fullHeight?: boolean;
}

/**
 * Col component
 */
export function Col(props: PropsWithChildren<IColProps>): JSX.Element {
	/**
	 * Gets the div element specific props
	 * @returns The div props
	 */
	function getDivProps(): HTMLAttributes<HTMLDivElement> {
		const clonedProps = { ...props };
		delete clonedProps.sm;
		delete clonedProps.md;
		delete clonedProps.lg;
		delete clonedProps.xl;
		delete clonedProps.fullHeight;
		return clonedProps;
	}

	return (
		<div
			{...getDivProps()}
			{...className(styles.col, props.className, {
				[styles.sm]: !!props.sm,
				[styles.md]: !!props.md,
				[styles.lg]: !!props.lg,
				[styles.xl]: !!props.xl
			})}
			style={
				{
					...props.style,
					height: props.fullHeight ? '100%' : props.style?.height,
					'--col-sm': props.sm,
					'--col-md': props.md,
					'--col-lg': props.lg,
					'--col-xl': props.xl
				} as CSSProperties
			}>
			{props.children}
		</div>
	);
}
