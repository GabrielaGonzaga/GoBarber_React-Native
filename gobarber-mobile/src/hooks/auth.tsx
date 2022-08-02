import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from "react";
import { AsyncStorage } from 'react-native';
import api from "../services/api";
import axios from 'axios';
interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

interface SignInCredencials {
    email: string;
    password: string;
}

interface AuthState {
    user: User;
    token: string;
}

interface AuthContextData {
user: User;
loading: boolean;
signIn(credencials: SignInCredencials): Promise<void>;
signOut(): void;
updateUser(user: User): Promise<void>;
}
  
  const AuthContext = createContext<AuthContextData>({} as AuthContextData);
  
  export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function loadStoragedData(): Promise<void> {
        const [token, user] = await AsyncStorage.multiGet([
          "@GoBarber:token",
          "@GoBarber:user",
        ]);
  
        if (token[1] && user[1]) {
            axios.defaults.headers.common['Authorization'] =  `Bearer ${token[1]}`;
            setData({ token: token[1], user: JSON.parse(user[1]) });
        }
  
        setLoading(false);
      }
  
      loadStoragedData();
    }, []);
  
    const signIn = useCallback(async ({ email, password }) => {
      const response = await api.post("sessions", {
        email,
        password,
      });
  
      const { user, token } = response.data;
  
      await AsyncStorage.multiSet([
        ["@GoBarber:token", token],
        ["@GoBarber:user", JSON.stringify(user)],
      ]);
  
      axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('token')}`;
  
      setData({
        user,
        token,
      });
    }, []);
  
    const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(["@GoBarber:token", "@GoBarber:user"]);
  
      setData({} as AuthState);
    }, []);
  
    const updateUser = useCallback(
      async (user: User) => {
        await AsyncStorage.setItem("@GoBarber:user", JSON.stringify(user));
  
        setData({
          token: data.token,
          user,
        });
      },
      [setData, data.token],
    );
  
    return (
      <AuthContext.Provider
        value={{ user: data.user, loading, signIn, signOut, updateUser }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
  
    return context;
  }