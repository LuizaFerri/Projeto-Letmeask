import {useState, useEffect } from 'react';
import { firebase } from '../services/firebase';
import { auth } from '../services/firebase'
import {createContext,ReactNode} from 'react';
type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    singInWithGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps = {
      children:ReactNode;
  }

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props:AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

      }

    })
    return () => {
      unsubscribe();
    }
  }, [])

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
}  
  
  
  
  
  return (
        <AuthContext.Provider value={{ user, singInWithGoogle }}>
          {props.children}  
        </AuthContext.Provider>

     );
}