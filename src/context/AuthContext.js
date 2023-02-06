import {createContext, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged
} from 'firebase/auth';
import {auth} from '../backend/firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const logout = () => {
        return signOut(auth);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);

    }
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            console.log(user);
            setUser(currentUser);
        })
        return () => {
            unsub();
        };
    }, []);

    return (
        <UserContext.Provider value={{createUser, user, logout, signIn}}>
            {children}
        </UserContext.Provider>
    )
};




export const UserAuth = () => {
    return useContext(UserContext)
}