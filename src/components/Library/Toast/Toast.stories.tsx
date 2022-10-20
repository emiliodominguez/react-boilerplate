import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useToast, TToast } from '.';

export default {
	title: 'Library/Toast',
	argTypes: {
		type: {
			options: ['danger', 'warning', 'success'],
			control: { type: 'inline-radio' }
		},
		text: {
			control: { type: 'text' }
		},
		maxWidth: {
			control: { type: 'number' }
		},
		delay: {
			control: { type: 'number' }
		},
		verticalOffset: {
			control: { type: 'number' }
		}
	},
	args: {
		onTop: false,
		hideCloseButton: false
	}
} as ComponentMeta<TToast>;

const Template: ComponentStory<TToast> = args => {
	const { Toast, showToast } = useToast();

	return (
		<>
			<button onClick={() => showToast(args)}>Show the toast</button>
			<Toast />
		</>
	);
};

export const Danger = Template.bind({});
Danger.args = {
	type: 'danger',
	text: 'This is an error notification!'
};

export const Warning = Template.bind({});
Warning.args = {
	type: 'warning',
	text: 'This is a warning notification!'
};

export const Success = Template.bind({});
Success.args = {
	type: 'success',
	text: 'This is a success notification!'
};

export const WithAction = Template.bind({});
WithAction.args = {
	type: 'success',
	text: 'Lorem ipsum dolor sit',
	action: { text: 'Click me', callback: () => alert('Hi there!') }
};
