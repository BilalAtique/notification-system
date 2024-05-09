importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCShfqYqMZNktzErmbq2dHj8yFyriJ6IZs",
  authDomain: "notification-system-demo-529.firebaseapp.com",
  projectId: "notification-system-demo-529",
  storageBucket: "notification-system-demo-529.appspot.com",
  messagingSenderId: "943681293711",
  appId: "1:943681293711:web:da9f532c3d67cd7ae84ffa"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
