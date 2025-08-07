import LoginForm from "../components/signInForm/LoginForm";
/**
 * The login page, containing a sign in form.
 *
 * @returns A `main` element with a sign in form.
 */
export default function Login() {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
    </main>
  );
}
