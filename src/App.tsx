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
      <button onClick={() => handleNotificationBtnClick(NotificationType["Notification-1"])}>Notification 1</button>
      <button onClick={() => handleNotificationBtnClick(NotificationType["Notification-2"])}>Notification 2</button>
      <button onClick={() => handleNotificationBtnClick(NotificationType["Notification-3"])}>Notification 3</button>
    </div>
  );
};

export default App;
