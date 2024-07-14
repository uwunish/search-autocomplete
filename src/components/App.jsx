import React, { useState, useEffect } from "react";
import Suggestions from "./Suggestions";

function App() {
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState([]);
	const [error, setError] = useState(null);
	const [searchParameter, setSearchParameter] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);

	function handleClick(event) {
		console.log(event.target.innerText);
		const name = event.target.innerText;
		setSearchParameter(name);
		setShowDropdown(false);
		setFilteredUsers([]);
	}

	function handleChange(event) {
		const query = event.target.value.toLowerCase();
		setSearchParameter(query);
		if (query.length > 1) {
			const filteredData =
				userData && userData.length
					? userData.filter(
							(item) => item.toLowerCase().indexOf(query) > -1
					  )
					: [];
			setFilteredUsers(filteredData);
			setShowDropdown(true);
		} else {
			setShowDropdown(false);
		}
	}

	function fetchData() {
		setLoading(true);
		fetch("https://dummyjson.com/users")
			.then((res) => res.json())
			.then((data) => {
				if (data && data.users && data.users.length) {
					const firstName = data.users.map(
						(userItem) => userItem.firstName
					);
					setUserData(firstName);
					setLoading(false);
				}
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
				setError(error);
			});
	}

	useEffect(() => {
		fetchData();
	}, []);

	console.log(userData, filteredUsers);

	if (loading) {
		return <h1>Loading... Please wait</h1>;
	}

	return (
		<div className="app-container">
			<input
				className="input-field"
				name="search-user"
				value={searchParameter}
				placeholder="Search Users here..."
				onChange={(event) => handleChange(event)}
			/>
			{showDropdown ? (
				<Suggestions
					handleClick={handleClick}
					filteredUsers={filteredUsers}
				/>
			) : null}
		</div>
	);
}

export default App;
