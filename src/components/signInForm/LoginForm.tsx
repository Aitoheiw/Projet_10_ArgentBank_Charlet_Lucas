import { useState } from "react";
/**
 * A React component for a login form.
 *
 * @returns A form with email, password and remember me fields, and a sign in button.
 */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <form>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      
      <button type="submit" className="sign-in-button">
        Sign-In
      </button>
    </form>
  );
}
