import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useQuery } from "react-query";
import Loader from '../../components/Loader/Loader';
import { UserCard } from '../../components/UserCard/UserCard';
import { LoadMoreButton } from '../../components/Buttons/LoadMoreButton';
import { debounce } from 'lodash';

import './MainPage.css';
export default function MainPage() {
	const url = 'https://randomuser.me/api/?results=5';
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [userInput, setUserInput] = useState('');

	const { data, error, isLoading, refetch } = useQuery("data", () =>
		fetch(url)
			.then((res) => res.json())
			.then(data => {
				console.log('FETCH')
				if (userInput !== '') setUserInput('');
				console.log('data res ', data.results)
				setUsers(data.results)
				let mutableArray = users.map(user => user);

				return setFilteredUsers(mutableArray);
			}
			));


	const debouncedFilter = useCallback(debounce(query =>
		setFilteredUsers(users.filter(
			user => `${user.name.first} ${user.name.last}`.trim().toLowerCase().includes(query?.toLowerCase())
		)), 500), []
	)

	const doUserFilter = query => {
		if (!query) return setFilteredUsers([])
		debouncedFilter(query)
	}

	const handleInput = (e) => {
		setUserInput(e.target.value);
		doUserFilter(e.target.value);
	}

	if (isLoading) return <Loader />;
	if (error) return `An error has occurred: ${error.message}`;
	if (users.length === 0) return <div> No users found</div>
	return (
		<div className='data-container'>
			<input className="search-input" type="text" value={userInput} onChange={handleInput} placeholder="Search" />
			{filteredUsers.length === 0 && users.map((user) => (
				<UserCard key={user.login.uuid} picture={user.picture.thumbnail} name={`${user.name.first} ${user.name.last}`} email={user.email} />
			))}
			{filteredUsers.length > 0 && filteredUsers.map((user) => (
				<UserCard key={user.login.uuid} picture={user.picture.thumbnail} name={`${user.name.first} ${user.name.last}`} email={user.email} />
			))}
			{userInput.length > 0 && filteredUsers.length === 0 && <p>Users not found :(</p>}
			<LoadMoreButton handler={refetch} />
		</div>
	)
}
