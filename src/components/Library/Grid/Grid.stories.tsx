import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Grid as GridComponent, Col } from '.';

export default {
	title: 'Library/Grid',
	argTypes: {
		gap: {
			control: { type: 'number', min: 0 }
		},
		autoFlow: {
			options: ['unset', 'row', 'column', 'dense'],
			control: { type: 'select' },
			table: {
				defaultValue: { summary: 'unset' }
			}
		}
	},
	args: {
		gap: 15,
		autoFlow: 'unset'
	}
} as ComponentMeta<typeof GridComponent>;

const cols = Object.freeze<Partial<typeof Col>[]>([
	{ md: 4 },
	{ md: 5 },
	{ md: 4 },
	{ lg: 4 },
	{ sm: 3 },
	{
		md: 4,
		lg: 3
	},
	{ lg: 6 }
]);

export const GridExample: ComponentStory<typeof GridComponent> = args => {
	return (
		<GridComponent {...args} style={{ padding: 25 }}>
			{cols.map((col, i) => (
				<Col
					{...col}
					key={`col_${i}`}
					style={{
						display: 'flex',
						minHeight: i === 1 ? 200 : 50,
						backgroundColor: 'indianred',
						borderRadius: 10,
						color: 'white',
						order: i
					}}>
					<p style={{ width: '100%', textAlign: 'center', margin: 'auto' }}>{i + 1}</p>
				</Col>
			))}
		</GridComponent>
	);
};
