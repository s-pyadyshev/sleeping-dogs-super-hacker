import { auth } from "../../firebase/firebase.util";

const Header = ({ currentUser }: { currentUser: { displayName: string } | null }) => {
  const { displayName } = currentUser || { displayName: '' };

  const handleSignOut = () => {
    auth.signOut();
  };
  return (
    <header>
      Header
      {currentUser ? (
        <div>
          <div>{displayName} (logged)</div>
          <button onClick={handleSignOut}>Logout</button>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
