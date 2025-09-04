import AccountHeader from "../components/accountHeader/AccountHeader";
import ProfileCards from "../components/profileCards/ProfileCards";
/**
 * The user profile page, containing a hero section with a welcome message and
 * an edit button, and a features section with a list of accounts.
 *
 * @returns A `main` element containing a hero section and a features section.
 */
export default function Profile() {
  return (
    <main className="main bg-dark">
      <AccountHeader name="Tony Jarvis" />
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <ProfileCards
          Title="Argent Bank Checking (x8349)"
          Amount="$2,082.79"
          Description="Available Balance"
        />
      </section>
      <section className="account">
        <ProfileCards
          Title="Argent Bank Savings (x6712)"
          Amount="$10,928.42"
          Description="Available Balance"
        />
      </section>
      <section className="account">
        <ProfileCards
          Title="Argent Bank Credit Card (x8349)"
          Amount="$184.30"
          Description="Current Balance"
        />
      </section>
    </main>
  );
}
