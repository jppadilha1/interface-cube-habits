"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { User } from "../core/domain/entities/User";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: userMetada | null;
  isLoggedIn: boolean;
  login: (user: userMetada) => void;
};

type userMetada = Pick<User, "id" | "username">;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userMetada | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  function login(user: userMetada) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
}

type UseAuthHook = () => AuthContextType;

export const useAuth: UseAuthHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return context;
};

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      route.push("/register");
    }
  }, []);

  return children;
}
