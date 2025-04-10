import { useEffect, useState } from "react";
import { fetchUsers, type User } from "../actions/userActions";

export const UserList = () => {
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [isPending, setIsPending] = useState(false);

	useEffect(() => {
		setIsPending(true);

		fetchUsers(search)
			.then((result) => setUsers(result))
			.finally(() => setIsPending(false));
	}, [search]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div>
			<h2>Search Users</h2>
			<input
				type="text"
				value={search}
				onChange={handleChange}
				placeholder="Search by name..."
				style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
			/>

			{isPending && <p>Loading...</p>}

			<ul>
				{users.length === 0 && !isPending && <p>No users found.</p>}
				{users.map((user) => (
					<li key={user.id}>
						<strong>{user.name}</strong> — {user.email}
					</li>
				))}
			</ul>
		</div>
	);
};
