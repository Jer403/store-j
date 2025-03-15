import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { replaceString } from "../utils.ts";

export default function ProtectedRoute() {
  const { logged, loadingLog } = useAuth();
  const location = useLocation();
  const path = replaceString(location.pathname, "/", "-");

  if (loadingLog) return;
  if (!loadingLog && !logged)
    return <Navigate to={`/login?path=${path}`} replace></Navigate>;

  return <Outlet></Outlet>;
}
