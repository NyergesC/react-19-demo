import { useState, useTransition } from "react";
import { fetchUsers, type User } from "../actions/userActions";

export const UserList = () => {
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const [isPending, startTransition] = useTransition();

	//useTransition has no parameter
	//return an array with 2 items: isPending boolean value, startTransition function
	//limitation: we have to wrap the state update in the startTransition function
	//StartTransition is async so no need useEffect!
	//MAIN POINT: for lower priority updates!! if there is multiple ongoing transitions, the state will be updated only when all the transitions are done

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value); //immediate update (high priority)
		//lower state update
		startTransition(async () => {
			//automatically set the isPending true
			const result = await fetchUsers(value);
			setUsers(result);
			//setIsPending(false)
		});
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
