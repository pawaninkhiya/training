import { createContext, useState } from "react";

//user type
type AuthUserType = {
  name: string;
  email: string;
};

// children type
type AuthContextProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: AuthUserType | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>;
};
// step 1
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<AuthUserType | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider