import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select as SelectComponent } from '.';

export default {
	title: 'UI',
	args: {
		placeholder: 'Select an option',
		showCounterPlaceholder: true,
		searchable: true,
		closeOnSelect: false
	}
} as ComponentMeta<typeof SelectComponent>;

export const Select: ComponentStory<typeof SelectComponent> = args => {
	const [selected, setSelected] = useState<string[]>([]);

	/**
	 * Selects or unselects a value
	 * @param value The value
	 */
	function selectElement(value: string): void {
		setSelected(prev => (prev.includes(value) ? prev.filter(x => x !== value) : [...prev, value]));
	}

	return (
		<div style={{ padding: 25 }}>
			<SelectComponent
				{...args}
				styles={{ wrapper: { maxWidth: 350 } }}
				options={[...Array(5).keys()].map(x => ({
					value: `option_${x}`,
					label: `Option ${x + 1}`,
					selected: selected.includes(`option_${x}`)
				}))}
				onSelect={option => selectElement(option.value)}
			/>
		</div>
	);
};
