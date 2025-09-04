type AccountHeaderProps = {
  name: string;
};

/**
 * A React component for the account header.
 *
 * @param {string} name The name of the user.
 * @returns A component with a header containing the user's name and an edit button.
 */
export default function AccountHeader({ name }: AccountHeaderProps) {
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {name}!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}
