import type { User } from "../app/users/user";

/**
 * Fabrique un utilisateur de test. Les champs non fournis prennent une valeur
 * par défaut : un test ne déclare que la donnée qui compte pour son assertion.
 */
export function userStub(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: "Ada Lovelace",
    email: "ada@example.com",
    age: 36,
    avatarUrl: "https://example.test/ada.png",
    color: "#0b1c2a",
    state: "London",
    ...overrides,
  };
}
