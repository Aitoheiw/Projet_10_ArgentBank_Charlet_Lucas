import { use, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, fetchProfile } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * A React component for a sign in form.
 *
 * It contains a form with username and password fields, a "Remember me" checkbox and
 * a "Sign In" button. When the form is submitted, it dispatches a login action
 * to the Redux store and navigates to the "/profile" page if the login is successful.
 * If the login fails, it displays an error message.
 * @returns A `form` element containing the sign in form.
 */
export default function LoginForm() {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  //redux states
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    try {
      // unwrap = succès → payload, échec → throw
      await dispatch(loginUser({ email, password, rememberMe })).unwrap();
      await dispatch(fetchProfile()).unwrap();
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.message ?? "Identifiants invalides";
      setFormError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button type="submit" className="sign-in-button">
        {loading ? "Loading..." : "Sign In"}
      </button>
      {(error || formError) && (
        <div className="error">{formError ?? error}</div>
      )}
    </form>
  );
}
