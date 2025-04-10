// actions/getUsers.ts

import { fetchUsers } from "./actions/userActions";

// Simple in-memory cache (demo célra)
const cache = new Map<string, Promise<ReturnType<typeof fetchUsers>>>();

export function getUsersPromise(
	search: string,
): Promise<ReturnType<typeof fetchUsers>> {
	if (!cache.has(search)) {
		cache.set(search, fetchUsers(search));
	}
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	return cache.get(search)!;
}
