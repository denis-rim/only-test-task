import { createContext, ReactNode, useContext, useState } from "react";

import { fakeAuthProvider } from "../utils/auth";

interface AuthContextType {
  user: string | null;
  signin: (
    login: string,
    password: string,
    callback: VoidFunction
  ) => Error | void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  // Login function
  const signin = (login: string, password: string, callback: VoidFunction) => {
    if (login !== "steve.jobs@example.com") {
      // Bad practice expose users email, but for the sake of simplicity we'll do it like this
      throw new Error(`Пользователя ${login} не существует`);
    }

    if (password !== "password") {
      throw new Error("Неверный пароль");
    }

    return fakeAuthProvider.signin(() => {
      setUser(login);
      callback();
    });
  };

  // Logout function
  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
