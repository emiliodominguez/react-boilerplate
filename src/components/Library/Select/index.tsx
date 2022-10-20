import { CSSProperties, useMemo, useRef, useState } from 'react';
import { useClickOutside } from '@app/hooks';
import { className } from '@app/helpers';
import styles from './Select.module.scss';

interface ISelectOption {
	value: string;
	label: string;
	selected?: boolean;
}

interface ISelectProps {
	placeholder: string;
	options: ISelectOption[];
	classNames?: {
		wrapper?: string;
		toggler?: string;
		options?: string;
	};
	styles?: {
		wrapper?: CSSProperties;
		toggler?: CSSProperties;
		options?: CSSProperties;
	};
	closeOnSelect?: boolean;
	showCounterPlaceholder?: boolean;
	searchable?: boolean;
	onSelect: (option: ISelectOption) => void;
}

/**
 * The select component
 */
export function Select(props: ISelectProps): JSX.Element {
	const selectRef = useRef<HTMLDivElement>(null);
	const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>('');
	const filteredOptions = useMemo<ISelectOption[]>(
		() => (!!searchText ? props.options.filter(option => option.label.toLowerCase().includes(searchText.toLowerCase())) : props.options),
		[props.options, searchText]
	);
	const selectedElementsCount = useMemo<number>(() => props.options.filter(x => x.selected).length, [props.options]);
	const placeholder = useMemo<string>(
		() => (props.showCounterPlaceholder && !!selectedElementsCount ? `${selectedElementsCount} selected` : props.placeholder),
		[props.placeholder, props.showCounterPlaceholder, selectedElementsCount]
	);

	/**
	 * Selects an option and closes the dropdown if required
	 * @param option The option
	 */
	function selectOption(option: ISelectOption): void {
		props.onSelect(option);
		if (props.closeOnSelect) setOptionsVisible(false);
	}

	useClickOutside<HTMLDivElement>(selectRef, () => setOptionsVisible(false));

	return (
		<div ref={selectRef} style={props.styles?.wrapper} {...className(styles.select, props.classNames?.wrapper, { [styles.open]: optionsVisible })}>
			<div {...className(styles.toggler, props.classNames?.toggler)} style={props.styles?.toggler}>
				{props.searchable ? (
					<input
						type="search"
						value={searchText}
						placeholder={placeholder}
						onClick={() => setOptionsVisible(!optionsVisible)}
						onInput={e => setSearchText(e.currentTarget.value)}
					/>
				) : (
					<button onClick={() => setOptionsVisible(!optionsVisible)}>{placeholder}</button>
				)}
			</div>

			{optionsVisible && (
				<ul {...className(styles.options, props.classNames?.options)} style={props.styles?.options}>
					{filteredOptions.map(option => (
						<li key={option.value} {...className(styles.option, { [styles.selected]: !!option.selected })}>
							<button onClick={() => selectOption(option)}>{option.label}</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
