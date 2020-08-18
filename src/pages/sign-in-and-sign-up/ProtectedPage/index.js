import React from "react";
import GameSDSH from "./components/GameSDSH";
import { auth } from "./firebase/firebase.util";

function ProtectedPage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // The method onAuthStateChanged sets up a subscription by adding an observer for the user's sign-in state.
    // You only need to subscribe once when the component mounts and call unsubscribe when the component unmounts
    // to prevent the observer from running and causing memory leaks.
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // unscribe at will unmount to avoid memory leak
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return <GameSDSH currentUser={currentUser} />;
}

export default ProtectedPage;
