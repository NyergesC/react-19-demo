import { useFormStatus } from "react-dom";

export function SubmitButton() {
	const { data, pending, method, action } = useFormStatus(); // Automatically tracks form submission status

	console.log({ data, pending, method, action });

	return (
		<button type="submit" disabled={pending}>
			{pending ? "Adding..." : "Add User"}
		</button>
	);
}
