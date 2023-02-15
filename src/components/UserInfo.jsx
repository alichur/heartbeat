import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

const UserInfo = () => {
  const { token, tokenData } = useContext(AuthContext);
  return (
    <>
      <h4>Access Token</h4>
      <pre>{token ? token : "no token found"}</pre>
      <h4>User Information from JWT</h4>
      <pre>{JSON.stringify(tokenData, null, 2)}</pre>
    </>
  );
};
export default UserInfo;
