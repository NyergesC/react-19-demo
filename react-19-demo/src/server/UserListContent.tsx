import { fetchUsers } from "../actions/userActions";

type Props = { query: string };

export default async function UserListContent({ query }: Props) {
	const users = await fetchUsers(query);

	return (
		<ul>
			{users.length === 0 && <li>No results found.</li>}
			{users.map((user) => (
				<li key={user.id}>
					<strong>{user.name}</strong> — {user.email}
				</li>
			))}
		</ul>
	);
}
