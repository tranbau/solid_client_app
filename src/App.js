import React, { useEffect, useState } from "react";
import { handleIncomingRedirect } from "@inrupt/solid-client-authn-browser";
import { LoginHeader } from "./LoginHeader";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/Slice/userSlice";
import Home from "./Layout/Home";

function App() {
  const dispatch = useDispatch();
  const [session, setSession] = useState({});
  const [login, setLogin] = useState(false);
  useEffect(() => {
    handleIncomingRedirect().then((session) => {
      setSession(session);
      if (session?.isLoggedIn) {
        dispatch(updateUser({ session }));
        setLogin(true);
      }
    });
  }, []);

  return (
    <div className="App" style={{ fontSize: 24 }}>
      <h2>Solid LDO Tutorial</h2>
      <LoginHeader session={session}></LoginHeader>
      {login && <Home />}
    </div>
  );
}

export default App;
