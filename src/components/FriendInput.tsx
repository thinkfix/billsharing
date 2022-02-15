import React, { ChangeEvent, useState } from 'react';

const FriendInput: React.FC<any> = (props) => {
	const { onClick } = props;
	const [friendsName, setFriendsName] = useState<string>('');
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setFriendsName(value);
	};

	return (
		<div>
			<label htmlFor='friend'>
				<div>Friend</div>
				<input
					id='name'
					name='name'
					onChange={handleChange}
					placeholder='Enter Your Name...'
					value={friendsName}
				/>
			</label>
			<button
				onClick={(e) => {
					onClick(e, friendsName);
					setFriendsName('');
				}}
				type='button'
			>
				Add +
			</button>
		</div>
	);
};

export default FriendInput;
