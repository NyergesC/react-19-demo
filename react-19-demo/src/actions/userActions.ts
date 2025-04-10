export type User = {
	id: number;
	name: string;
	email: string;
};

const mockUsers: User[] = [
	{ id: 1, name: "Jane Doe", email: "jane@example.com" },
	{ id: 2, name: "John Smith", email: "john@example.com" },
	{ id: 3, name: "Alice Johnson", email: "alice@example.com" },
	{ id: 4, name: "Bob Williams", email: "bob@example.com" },
	{ id: 5, name: "Charlie Adams", email: "charlie@example.com" },
	{ id: 6, name: "Eva Brown", email: "eva@example.com" },
	{ id: 7, name: "Daniel Green", email: "daniel@example.com" },
	{ id: 8, name: "Fiona White", email: "fiona@example.com" },
];

// Simulated delay
function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchUsers(search: string): Promise<User[]> {
	await delay(800); // simulate slow response
	if (Math.random() < 0.1) throw new Error("Random fetch error");
	return mockUsers.filter((user) =>
		user.name.toLowerCase().includes(search.toLowerCase()),
	);
}

// actions/fetchFailingUsers.ts

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function fetchFailingUsers(): Promise<any> {
	await new Promise((res) => setTimeout(res, 500));
	throw new Error("Simulated fetch error!");
}

("use server");

// Mock database
let users = [
	{ id: 1, name: "Jane Doe", email: "jane@example.com" },
	{ id: 2, name: "John Smith", email: "john@example.com" },
];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createUser(_prevState: any, formData: FormData) {
	await delay(500);

	const name = formData.get("name")?.toString().trim();
	const email = formData.get("email")?.toString().trim();

	if (!name || !email) {
		return { success: false, error: "Name and email are required." };
	}

	if (Math.random() < 0.2) {
		return { success: false, error: "Server error. Try again." };
	}

	const newUser = {
		id: users.length + 1,
		name,
		email,
	};

	users = [newUser, ...users];

	return { success: true, error: null };
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function deliverMessage(message: any) {
	await new Promise((res) => setTimeout(res, 1000));
	return message;
}
