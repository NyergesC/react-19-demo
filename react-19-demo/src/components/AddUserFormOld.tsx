import { useState } from "react";

export const AddUserFormOld = () => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setSuccess(false);
		setIsPending(true);

		const formData = new FormData(e.currentTarget);
		const name = formData.get("name")?.toString().trim();
		const email = formData.get("email")?.toString().trim();

		if (!name || !email) {
			setError("Name and email are required.");
			setIsPending(false);
			return;
		}

		// Simulate delay (mock API call)
		await new Promise((res) => setTimeout(res, 500));

		if (Math.random() < 0.2) {
			setError("Server error. Please try again.");
			setIsPending(false);
			return;
		}

		console.log("User added:", { name, email });
		setSuccess(true);
		setIsPending(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ display: "grid", gap: "0.5rem", maxWidth: 400 }}
		>
			<h3>Add a New User</h3>

			<input name="name" placeholder="Name" required />
			<input name="email" placeholder="Email" type="email" required />

			<button type="submit" disabled={isPending}>
				{isPending ? "Adding..." : "Add User"}
			</button>

			{error && <p style={{ color: "red" }}>Error: {error}</p>}
			{success && !isPending && (
				<p style={{ color: "green" }}>User added successfully.</p>
			)}
		</form>
	);
};
