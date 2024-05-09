import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase/config";
import SignUp from "./pages/SignUp";

enum NotificationType {
  "Notification-1",
  "Notification-2",
  "Notification-3",
}

const App = () => {
  const handleNotificationBtnClick = async (
    notificationType: NotificationType
  ) => {
    try {
      //add notification in firestore
      const docRef = await addDoc(collection(db, "notifications"), {
        userId: auth.currentUser?.uid,
        type: NotificationType[notificationType],
        isRead: false,
      });
      console.log("Document written with ID: ", docRef.id);
  
      // Request permission for showing notification
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission not granted.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-outline"
        onClick={() =>
          handleNotificationBtnClick(NotificationType["Notification-1"])
        }
      >
        Notification 1
      </button>
      <button
        className="btn btn-outline"
        onClick={() =>
          handleNotificationBtnClick(NotificationType["Notification-2"])
        }
      >
        Notification 2
      </button>
      <button
        className="btn btn-outline"
        onClick={() =>
          handleNotificationBtnClick(NotificationType["Notification-3"])
        }
      >
        Notification 3
      </button>
      {!auth.currentUser?.uid && <SignUp />}
    </div>
  );
};

export default App;
