import SignUp from "./pages/SignUp";

enum NotificationType {
  "Notification-1",
  "Notification-2",
  "Notification-3",
}

const App = () => {
  
  const handleNotificationBtnClick = (notificationType: NotificationType) => {
    console.log(NotificationType[notificationType]);
  }

  return (
    <div>
      <button className="btn btn-outline" onClick={() => handleNotificationBtnClick(NotificationType["Notification-1"])}>Notification 1</button>
      <button className="btn btn-outline" onClick={() => handleNotificationBtnClick(NotificationType["Notification-2"])}>Notification 2</button>
      <button className="btn btn-outline" onClick={() => handleNotificationBtnClick(NotificationType["Notification-3"])}>Notification 3</button>
      <SignUp />
    </div>
  );
};

export default App;
