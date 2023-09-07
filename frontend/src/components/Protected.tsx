import { Navigate } from "react-router-dom";
import { getToken } from "../feature/auth/function";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
export function Protected({ children }: Props) {
  const token: string | false = getToken("access");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
