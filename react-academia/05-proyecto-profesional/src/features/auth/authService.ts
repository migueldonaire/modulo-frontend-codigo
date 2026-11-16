export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "student"; // solo uno de estos dos textos
};

type StoredUser = User & { password: string }; // Usuario + password

// Login FALSO. Con una API de verdad sería un POST /auth/login que devuelve un JWT
export async function login(
  email: string,
  password: string,
): Promise<{ token: string; user: User }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(email)}`,
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  const users: StoredUser[] = await response.json();
  const found = users.find((u) => u.password === password);
  if (!found) {
    throw new Error("Email o contraseña incorrectos.");
  }
  // Sacamos la contraseña y nos quedamos con el resto
  const { password: _password, ...user } = found;
  return { token: `token-fake-${user.id}`, user };
}
