"use client";
import { AddUserForm } from "../components/AddUserForm";
import { SuspenseUserList } from "../components/SuspenseUserList";
import { UserList } from "../components/UserList";

export const UsersPage = () => {
	return (
		<div
			style={{
				display: "grid",
				gap: "2rem",
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<hr />
			<UserList />
			<AddUserForm />
			<SuspenseUserList />
		</div>
	);
};
