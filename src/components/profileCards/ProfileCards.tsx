type ProfileCardsProps = {
  Title: string;
  Amount: string;
  Description: string;
};

/**
 * A React component for a profile card.
 *
 * @param {{Title: string, Amount: string, Description: string}} props
 * The props for the profile card component.
 * @prop {string} Title
 * The title of the profile card.
 * @prop {string} Amount
 * The amount in the profile card.
 * @prop {string} Description
 * The description of the profile card.
 * @returns {ReactElement}
 * The component for the profile card.
 */

export default function ProfileCards({
  Title,
  Amount,
  Description,
}: ProfileCardsProps) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{Title}</h3>
        <p className="account-amount">{Amount}</p>
        <p className="account-amount-description">{Description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}
