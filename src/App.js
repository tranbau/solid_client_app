import React, { useEffect, useState } from "react";
import { handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
import Home from "./Layout/Home";
import LoginHeader from "./Components/LoginHeader";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/Slice/userSlice";
function App() {
  const dispatch = useDispatch();
  const [sessionInfo, setSessionInfo] = useState({});
  const [login, setLogin] = useState(false)
  useEffect(() => {
    handleIncomingRedirect().then((sessionInfo) => {
      setSessionInfo(sessionInfo);
      if (sessionInfo?.isLoggedIn){
        dispatch(updateUser({ webId: sessionInfo.webId }));
        setLogin(true)
      }
        
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App" style={{ fontSize: 24 }}>
      <h2>Solid LDO Tutorial</h2>
      <LoginHeader sessionInfo={sessionInfo}></LoginHeader>
     {login && <Home/>}
    </div>
  );
}

export default App;
