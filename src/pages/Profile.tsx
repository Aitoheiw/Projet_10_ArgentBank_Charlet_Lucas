import { useSelector } from "react-redux";
import { selectUser, selectAuthLoading } from "../redux/authSlice";
import AccountHeader from "../components/accountHeader/AccountHeader.jsx";
import ProfileCards from "../components/profileCards/ProfileCards";

const cards = [
  {
    Title: "Argent Bank Checking (x8349)",
    Amount: "$2,082.79",
    Description: "Available Balance",
  },
  {
    Title: "Argent Bank Savings (x6712)",
    Amount: "$10,928.42",
    Description: "Available Balance",
  },
  {
    Title: "Argent Bank Credit Card (x8349)",
    Amount: "$184.30",
    Description: "Current Balance",
  },
];

/**
 * The user profile page, containing a hero section with a welcome message and
 * an edit button, and a features section with a list of accounts.
 *
 * @returns A `main` element containing a hero section and a features section.
 */
export default function Profile() {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  if (loading && !user) return <p>Chargement du profil…</p>;
  if (!user) return <p>Profil indisponible.</p>;
  return (
    <main className="main bg-dark">
      <AccountHeader name={user.userName} />
      <h2 className="sr-only">Accounts</h2>
      {cards.map((card) => (
        <ProfileCards
          key={card.Title}
          Title={card.Title}
          Amount={card.Amount}
          Description={card.Description}
        />
      ))}
    </main>
  );
}
