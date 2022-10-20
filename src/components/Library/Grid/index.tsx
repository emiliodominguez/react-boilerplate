import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import { className } from '@app/helpers';
import styles from './Grid.module.scss';

interface IGridProps extends HTMLAttributes<HTMLDivElement> {
	order?: number;
	gap?: number | string;
	autoFlow?: 'unset' | 'row' | 'column' | 'dense';
}

/**
 * Grid component
 */
export function Grid(props: PropsWithChildren<IGridProps>): JSX.Element {
	/**
	 * Gets the div element specific props
	 * @returns The div props
	 */
	function getDivProps(): HTMLAttributes<HTMLDivElement> {
		const clonedProps = { ...props };
		delete clonedProps.order;
		delete clonedProps.gap;
		delete clonedProps.autoFlow;
		return clonedProps;
	}

	return (
		<div
			{...getDivProps()}
			{...className(styles.grid, props.className)}
			style={
				{
					...props.style,
					gridAutoFlow: props.autoFlow,
					gridGap: props.gap,
					order: props.order
				} as CSSProperties
			}>
			{props.children}
		</div>
	);
}

export * from './Col';
