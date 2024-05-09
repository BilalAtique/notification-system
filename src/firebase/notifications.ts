import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, messaging } from "./config";
import { getToken } from "firebase/messaging";
import { NotificationType } from "../CONST";

export const markNotificationsAsRead = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, {
      isRead: true,
    });
  } catch (error) {
    //implment error handling
    console.error(error);
  }
};

export const addNotification = async (notificationType: number) => {
  try {
    //Get device token
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_MESSAGING_TOKEN,
    });
    //add notification in firestore
    const docRef = await addDoc(collection(db, "notifications"), {
      deviceToken: token,
      type: NotificationType[notificationType],
      isRead: false,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    //implement error handling
    console.error(error);
  }
};
