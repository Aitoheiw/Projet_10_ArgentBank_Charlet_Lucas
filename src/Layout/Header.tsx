import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/authSlice";
import LogoutButton from "../components/logoutBtn/LogoutBtn.jsx";
import { selectUser } from "../redux/authSlice";

/**
 * The navigation bar at the top of every page.
 *
 * @returns A `nav` element containing the logo and a "Sign In" link.
 */
export default function Header() {
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="../../img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div className="main-nav-item">
        {isAuth ? (
          <a href="/profile">
            <i className="fa fa-user-circle"></i> {user?.firstName}
          </a>
        ) : null}
        {isAuth ? (
          <LogoutButton />
        ) : (
          <a href="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </a>
        )}
      </div>
    </nav>
  );
}
<i className="fa fa-user-circle"></i>;
