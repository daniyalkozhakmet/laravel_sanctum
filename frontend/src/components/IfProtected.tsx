import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../feature/auth/function";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
export function IfProtected({ children }: Props) {
  const token: string | false = getToken("access");
  if (token) {
    return <Navigate to={`/home`} replace />;
  }
  return children;
}
