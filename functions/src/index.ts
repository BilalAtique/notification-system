import * as admin from "firebase-admin";
import { logger } from "firebase-functions/v1";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

if (!admin.apps.length) admin.initializeApp();

exports.sendNotification = onDocumentCreated(
  "notifications/{notificationId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }
    const data = snapshot.data();

    const payload = {
      notification: {
        title: `New Notification of type ${data.type}`,
        body: snapshot.id
      },
    };
    const token = data.deviceToken;
    // Send the notification
    try {
      const response = await admin.messaging().sendToDevice(token, payload);
      logger.info("Notification sent successfully:", response);
    } catch (error) {
      logger.error("Error sending notification:", error);
    }
  }
);
