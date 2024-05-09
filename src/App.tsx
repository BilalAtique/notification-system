import { addDoc, collection } from "firebase/firestore";
import { auth, db, messaging } from "./firebase/config";
import SignUp from "./pages/SignUp";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      // Request permission for showing notification
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_MESSAGING_TOKEN,
        });
        //add notification in firestore
        const docRef = await addDoc(collection(db, "notifications"), {
          userId: auth.currentUser?.uid,
          deviceToken: token,
          type: NotificationType[notificationType],
          isRead: false,
        });
        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log("Notification permission not granted.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast.success('🦄 Wow so easy!', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
            });
  });

  return (
    <>
      <ToastContainer />
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
    </>
  );
};

export default App;
