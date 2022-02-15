import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App test', () => {
	beforeEach(() => {
		render(<App />);
	});
	test('render Total field', () => {
		expect(screen.getByLabelText('Total')).toBeInTheDocument();
	});

	test('Need to have input of friends names', () => {
		expect(screen.getByLabelText(/friend/gi)).toBeInTheDocument();
	});

	test('render result list', () => {
		expect(screen.getByRole('list')).toBeInTheDocument();
	});

	test('show list of friends', async () => {
		const inputText = 'Test friend';
		userEvent.type(screen.getByLabelText('Total'), inputText);
		userEvent.click(screen.getByRole('button'));
		const listItems = await screen.findAllByRole('listitem');
		expect(listItems.length).toBe(1);
	});

	test('do not add item in case of empty input', async () => {
		userEvent.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(screen.queryAllByRole('listitem').length).toBe(0);
		});

		const inputText = 'Test friend';
		userEvent.type(screen.getByLabelText('Friend'), inputText);
		userEvent.click(screen.getByRole('button'));
		const listItems = await screen.findAllByRole('listitem');
		expect(listItems.length).toBe(1);
	});

	test('split total between list of friends', () => {
		userEvent.type(screen.getByLabelText('Total'), '100');
		userEvent.type(screen.getByLabelText('Friend'), 'Friend1');
		userEvent.click(screen.getByRole('button'));
		userEvent.type(screen.getByLabelText('Friend'), 'Friend2');
		userEvent.click(screen.getByRole('button'));

		expect(screen.findByText('Friend1: 50'));
		expect(screen.findByText('Friend2: 50'));
	});
});
