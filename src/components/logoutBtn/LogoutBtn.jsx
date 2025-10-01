import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

/**
 * A React component for a logout button.
 *
 * When the button is clicked, it dispatches a logout action to the Redux store
 * and navigates to the "/login" page.
 * @returns A `button` element with the text "Logout".
 * @example
 * <LogoutButton />
 */
export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return <a onClick={onLogout}>Logout</a>;
}
