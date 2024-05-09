import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

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
