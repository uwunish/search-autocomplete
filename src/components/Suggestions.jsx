import React from "react";

function Suggestions({ filteredUsers, handleClick }) {
	return (
		<div className="dropdown-container">
			{filteredUsers.map((users, index) => (
				<p onClick={handleClick} key={index}>
					{users}
				</p>
			))}
		</div>
	);
}

export default Suggestions;
