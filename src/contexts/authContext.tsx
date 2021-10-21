import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
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
};

const AuthContext = createContext<AuthContextType>(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/userinfo.email');

    try {
      signInWithRedirect(auth, provider);
      const result = await getRedirectResult(auth);
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('uid', user.uid);
      console.log(result);
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  }

  async function signOut() {
    try {
      await logOut(auth);
      // setCurrentUser(null);
      // localStorage.removeItem('accessToken')
      // localStorage.removeItem('uid')
    } catch (error) {}
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        localStorage.removeItem('uid');
        localStorage.removeItem('accessToken');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const value = { signInWithGoogle, signOut, currentUser };
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
