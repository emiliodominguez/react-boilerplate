import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Grid, Col as ColComponent } from '..';

export default {
	title: 'Library/Grid',
	argTypes: {
		sm: {
			description: 'The column behavior from sm size onwards',
			control: { type: 'number', min: 1, max: 12 }
		},
		md: {
			description: 'The column behavior from md size onwards',
			control: { type: 'number', min: 1, max: 12 }
		},
		lg: {
			description: 'The column behavior from lg size onwards',
			control: { type: 'number', min: 1, max: 12 }
		},
		xl: {
			description: 'The column behavior from xl size onwards',
			control: { type: 'number', min: 1, max: 12 }
		}
	}
} as ComponentMeta<typeof ColComponent>;

export const ColExample: ComponentStory<typeof ColComponent> = args => (
	<Grid gap={15} style={{ padding: 25 }}>
		<ColComponent
			{...args}
			style={{
				padding: 15,
				backgroundColor: 'indianred',
				borderRadius: 10,
				color: 'white'
			}}>
			<p style={{ textAlign: 'center' }}>Example column</p>
		</ColComponent>
	</Grid>
);
