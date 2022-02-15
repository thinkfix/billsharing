import React, { useState } from 'react';

interface ExpensesProps {
	id: string;
	index: number;
	value: number;
	addExpenses: (id: number, expense: number) => void;
}
const Expenses: React.FC<ExpensesProps> = (props) => {
	const { id, index, value, addExpenses } = props;
	const [expenses, setExpenses] = useState<number>(value);

	return (
		<>
			<label htmlFor={id}>
				<input
					id={id}
					onChange={(e) => setExpenses(+e.target.value)}
					type='number'
					value={expenses}
				/>
			</label>
			<button
				onClick={() => {
					addExpenses(index, expenses);
				}}
				type='button'
			>
				Add
			</button>
		</>
	);
};

export default Expenses;
