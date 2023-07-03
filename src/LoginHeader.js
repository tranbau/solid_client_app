import { login } from "@inrupt/solid-client-authn-browser";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/Slice/userSlice";

export function LoginHeader({ session }) {
  const dispatch = useDispatch();
  const loginCallback = useCallback(() => {
    const oidcIssuer = prompt(
      "Enter your Solid OIDC Issuer (Example: https://solidcommunity.net)",
      "https://solidcommunity.net"
    );
    if (oidcIssuer) {
      login({
        oidcIssuer,
        redirectUrl: window.location.href,
        clientName: "LDO Tutorial",
      });
    } else {
      alert("Please provide an issuer.");
    }
  }, []);

  if (session?.isLoggedIn) {
    dispatch(
      updateUser({
        session,
      })
    );
    return <p>Logged in as {session.webId}</p>;
  } else {
    return <div> 
      <button onClick={loginCallback}>Log into a Solid Pod</button>
      </div>;
  }
}
