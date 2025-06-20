import { useContext } from "react";
import AuthContext from "../contexts/auth/Auth.Context";

export const useAuth = () => useContext(AuthContext);
