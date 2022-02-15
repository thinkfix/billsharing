import './App.css';
import { FormEvent, useState } from 'react';

import { v4 as uuid } from 'uuid';

import Expenses from './components/Expenses';
import FriendInput from './components/FriendInput';

interface IFriends {
	[key: string]: number;
}

const App = (): JSX.Element => {
	const [friends, setFriends] = useState<IFriends[]>([]);

	const handleClick = (index: number, expense: number) => {
		const key = Object.keys(friends[index])[0];
		setFriends((prevState) =>
			prevState.map((item, idx) => {
				if (idx === index) {
					return { [key]: expense };
				}
				return item;
			})
		);
	};
	const getTotal = (friendsObj: IFriends[]) =>
		friendsObj.reduce((acc, friend) => acc + friend[Object.keys(friend)[0]], 0);

	const getBalance = (value: number) => {
		const average = Math.floor(+getTotal(friends) / friends.length);
		const res = value - average;
		if (res < 0) {
			return <span style={{ color: 'red' }}>You should pay: {-res}</span>;
		}
		return <span style={{ color: 'green' }}>You should get: {res}</span>;
	};

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div>Total: {getTotal(friends)}</div>

			<FriendInput
				onClick={(e: FormEvent, some: string) => {
					setFriends((prevState) => [...prevState, { [some]: 0 }]);
				}}
			/>
			<ul onChange={(e) => {}}>
				{friends.map((friend, index) => {
					const id = uuid();
					const key = Object.keys(friend)[0];
					return (
						<li key={id}>
							<fieldset>
								<span>{`${key}: `}</span>
								<Expenses
									addExpenses={handleClick}
									id={id}
									index={index}
									value={friend[key]}
								/>
								<span>{getBalance(friend[key])}</span>
							</fieldset>
						</li>
					);
				})}
			</ul>
		</form>
	);
};
export default App;
