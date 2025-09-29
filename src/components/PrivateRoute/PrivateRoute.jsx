import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/authSlice";

/**
 * A higher-order component that checks if the user is authenticated
 * before rendering the provided children components. If the user is not
 * authenticated, it will redirect to the login page.
 * @param {object} props - The props object
 * @param {ReactElement} props.children - The children components to render
 * @returns {ReactElement} The rendered children components, or a redirect to the login page
 */
export default function PrivateRoute({ children }) {
  const isAuth = useSelector(selectIsAuth);
  const hasToken = !!localStorage.getItem("token");
  if (!isAuth && !hasToken) return <Navigate to="/login" replace />;
  return children;
}
