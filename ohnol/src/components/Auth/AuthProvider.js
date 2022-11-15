import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginState } from "../../states/LoginState";

function AuthProvider() {
  console.log("AuthProvider usestate", LoginState);
  const auth = useRecoilValue(LoginState);
  console.log("AuthProvider auth", auth);
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default AuthProvider;
