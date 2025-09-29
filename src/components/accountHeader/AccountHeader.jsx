import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserName,
  selectUser,
  selectUpdatingUsername,
  selectUpdateUsernameError,
} from "../../redux/authSlice";

export default function AccountHeader({ name }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const updating = useSelector(selectUpdatingUsername);
  const updateError = useSelector(selectUpdateUsernameError);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName ?? name);
  const [localError, setLocalError] = useState("");

  // Resync quand Redux change (ex: après login ou update)
  useEffect(() => {
    if (user?.userName) {
      setUserName(user.userName);
    }
  }, [user?.userName]);

  const onCancel = () => {
    setUserName(user?.userName ?? name);
    setLocalError("");
    setIsEditing(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const trimmed = userName.trim();

    if (trimmed.length < 3) {
      setLocalError("Le nom d’utilisateur doit faire au moins 3 caractères.");
      return;
    }

    if (trimmed === user?.userName) {
      setIsEditing(false);
      return;
    }

    setLocalError("");
    try {
      await dispatch(updateUserName({ userName: trimmed })).unwrap();
      setIsEditing(false);
    } catch {
      // l’erreur API est déjà gérée via Redux (updateError)
    }
  };

  if (!user) {
    // fallback si pas encore de user chargé
    return (
      <div className="header">
        <h1>
          Welcome back
          <br />
          {name}!
        </h1>
      </div>
    );
  }

  return (
    <div className="header">
      {!isEditing ? (
        <>
          <h1>
            Welcome back
            <br />
            {user.userName || user.firstName || name}!
          </h1>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        </>
      ) : (
        <form className="edit-form" onSubmit={onSubmit}>
          <h2>Edit user info</h2>

          <label>
            User name:
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter a new username"
              autoFocus
            />
          </label>

          <label>
            First name:
            <input type="text" value={user.firstName || ""} disabled />
          </label>

          <label>
            Last name:
            <input type="text" value={user.lastName || ""} disabled />
          </label>

          {localError && <p className="error">{localError}</p>}
          {updateError && <p className="error">{updateError}</p>}

          <div className="actions">
            <button type="submit" disabled={updating} className="btn">
              {updating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={updating}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
