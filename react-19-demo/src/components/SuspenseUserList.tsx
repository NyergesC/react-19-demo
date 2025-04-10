// components/SuspenseUserList.tsx
"use client";

import { use, useState, Suspense } from "react";
import { getUsersPromise } from "../getUsers";

const UserResults = ({ search }: { search: string }) => {
	// use() will suspend this component until the promise resolves
	const users = use(getUsersPromise(search));

	return (
		<ul>
			{users.length === 0 ? (
				<p>No users found.</p>
			) : (
				users.map((user) => (
					<li key={user.id}>
						<strong>{user.name}</strong> — {user.email}
					</li>
				))
			)}
		</ul>
	);
};

export const SuspenseUserList = () => {
	const [search, setSearch] = useState("");

	return (
		<div>
			<h2>Suspense Search</h2>
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search by name..."
				style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
			/>

			<Suspense fallback={<p>Loading users...</p>}>
				<UserResults search={search} />
			</Suspense>
		</div>
	);
};
