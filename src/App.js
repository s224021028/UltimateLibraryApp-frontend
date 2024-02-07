import React, { useState } from "react";
import { useStore } from "../src/store/store";
import Header from "./components/header/header";
import CenteredTabs from "./components/tabs/tabs";
import LoginScreen from "./components/loginScreen/loginScreen";
import Notification from "./components/notification/notification";

function App() {
  const userId = useStore((state) => state.userId);
  const updateUserId = useStore((state) => state.updateUserId);
  const [isLogin, setIsLogin] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const handleCloseNotification = () => {
    setOpenNotif(false);
  };

  const [msg, setMsg] = useState(null);

  const handleMessage = (newMsg) => {
    setMsg(newMsg);
  };

  return (
    <div className="App">
      {userId && (
        <Notification
          handleCloseNotification={handleCloseNotification}
          message={msg}
        />
      )}
      {!userId ? <LoginScreen handleMessage={handleMessage} /> : <Header />}
    </div>
  );
}

export default App;
