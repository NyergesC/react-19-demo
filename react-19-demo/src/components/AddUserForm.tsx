import { useActionState } from "react";
import { SubmitButton } from "./SubmitButton";

export const AddUserForm = () => {
	// useActionState tracks the result of the form action submission
	// [state, formAction, isPending] = useActionState(actionFn, initialState, permalink?)
	// 3 params: action function which will be called at the submission, initial state of the form, permalink: unique url for dynamic content

	//return with 3 items: current state which initially same with return / result of the action function, isPending

	const [error, submitAction, isPending] = useActionState(
		//this is the action function that runs when the form is submitting (2 params: prevState return value of this function and formData)
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async (_prevState: any, formData: FormData) => {
			const name = formData.get("name")?.toString().trim();
			const email = formData.get("email")?.toString().trim();

			if (!name || !email) {
				return "Name and email are required.";
			}
			// Simulate server delay
			await new Promise((res) => setTimeout(res, 500));

			// POST request
			const res = await fetch("http://localhost:3001/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email }),
			});

			if (!res.ok) return "Server error. Please try again.";

			return null; // return null to indicate success - it becomes the new state
		},
		null, // initial state (error is null)
	);

	return (
		<form
			action={submitAction}
			style={{ display: "grid", gap: "0.5rem", maxWidth: 400 }}
		>
			<h3>Add a New User</h3>

			<input name="name" placeholder="Name" />
			<input name="email" placeholder="Email" type="email" />

			{/* with useActionState: */}
			{/* 			<button type="submit" disabled={pending}>
				{isPending ? "Adding..." : "Add User"}
			</button> */}

			<SubmitButton />

			{error && <p style={{ color: "red" }}>Error: {error}</p>}
			{!error && !isPending && (
				<p style={{ color: "green" }}>User added successfully.</p>
			)}
		</form>
	);
};
