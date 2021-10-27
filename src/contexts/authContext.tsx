import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as logOut,
  User,
} from '@firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';

type AuthContextType = {
  signInWithGoogle: () => void;
  signOut: () => void;
  currentUser: User;
  isAuthLoading: boolean;
};

const AuthContext = createContext<AuthContextType>(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      localStorage.setItem('accessToken', credential.accessToken);
      localStorage.setItem('uid', user.uid);
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  }

  async function signOut() {
    try {
      await logOut(auth);
    } catch (error) {}
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User) => {
      setIsAuthLoading(true);
      if (user) {
        localStorage.setItem('uid', user.uid);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        localStorage.removeItem('uid');
        localStorage.removeItem('accessToken');
      }
      setIsAuthLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const value = {
    signInWithGoogle,
    signOut,
    currentUser,
    isAuthLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used inside of an AuthProvider');
  }
  return context;
};
