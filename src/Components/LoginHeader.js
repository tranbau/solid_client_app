import { login} from "@inrupt/solid-client-authn-browser";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/Slice/userSlice";
function LoginHeader({ sessionInfo }) {
    const dispatch = useDispatch()
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

    if (sessionInfo?.isLoggedIn) {
      dispatch(updateUser({webId: sessionInfo.webId}))
      return (
        <p>Logged in as {sessionInfo.webId}</p>
      )
    } else {
      return (
        <button onClick={loginCallback}>Log into a Solid Pod</button>
      )
    }
}

export default LoginHeader;
