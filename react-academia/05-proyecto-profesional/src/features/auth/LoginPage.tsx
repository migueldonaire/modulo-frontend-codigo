import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { loggedIn } from "./authSlice";
import { login } from "./authService";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from: string = location.state?.from ?? "/"; // la página de la que venías

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const result = await login(email, password);
      dispatch(loggedIn(result)); // guarda la sesión en el store
      navigate(from, { replace: true }); // replace: "atrás" no vuelve al login
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Entrar</h1>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
      />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button type="submit" disabled={sending}>
        {sending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
