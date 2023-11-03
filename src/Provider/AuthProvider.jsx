
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);



const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect( () => {
        
        const unsubscribe = onAuthStateChanged( auth , currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email : userEmail}
            setUser(currentUser);
            console.log('current User :', currentUser);
            setLoading(false)
            if(currentUser){
                
                axios.post('http://localhost:4000/jwt',loggedUser,{withCredentials:true})
                .then(res =>{
                    console.log('token response',res.data);
                })
            }
            else{
                axios.post('http://localhost:4000/logout',loggedUser,{withCredentials:true})
                .then(res => {
                    console.log(res.data);
                })
            }
        })
        return () => {
            return unsubscribe()
        }
    },[user?.email])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;