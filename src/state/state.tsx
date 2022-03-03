import { createContext, ReactNode, useContext, useState } from "react";

import { fakeAuthProvider } from "../auth";

interface AuthContextType {
  user: string | null;
  signin: (
    login: string,
    password: string,
    callback: VoidFunction
  ) => Error | void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const signin = (login: string, password: string, callback: VoidFunction) => {
    if (login !== "steve.jobs@example.com" || password !== "password") {
      throw new Error("Invalid email or password");
    }

    return fakeAuthProvider.signin(() => {
      setUser(login);
      callback();
    });
  };

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
