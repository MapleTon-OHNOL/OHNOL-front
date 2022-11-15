import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginState } from "../../states/LoginState";

function AuthProvider() {
  const auth = useRecoilValue(LoginState);

  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default AuthProvider;
