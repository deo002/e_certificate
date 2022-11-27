import React, { useContext } from 'react';
import usePersistState from '../hooks/usePersistState';


const AuthContext = React.createContext();
// creating a context and making it available all over the code base
// Now any changes in functionality will require changes just in this page

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = usePersistState('userData', null);

    async function signin(email, password) {
        try {
            const URL = 'http://localhost:5000/user/login';
            const options = {
              method: "POST",
              headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json;charset=UTF-8"
              },
              body: JSON.stringify({
                email,
                password
              })
            };
            const response = await fetch(URL, options);
            const result = await response.json(); 
            if(!result.success) {
                throw new Error(result.msg);
            }
            const data = {
                token: result.token,
                user: result.user
            };   
            console.log(data);
            setCurrentUser(data); 
        } catch(e) {
            console.error(e);
            throw new Error(e.message);
        }
    }

    async function signup(name, email, password) {
        try {
            const URL = 'http://localhost:5000/user/register';
            const options = {
              method: "POST",
              headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json;charset=UTF-8"
              },
              body: JSON.stringify({
                name,
                email,
                password
              })
            };
            const response = await fetch(URL, options);
            const result = await response.json(); 
            if(!result.success) {
                console.log('hi', result);
                throw new Error(result.msg);
            }
            const data = {
                token: result.token,
                user: result.user
            };   
            console.log(data);
            setCurrentUser(data); 
        } catch(e) {
            console.error(e);
            throw new Error(e.message);
        }
    }

    // function to sign out users
    function signout() {
        setCurrentUser(null);
    }

    function getToken() {
        if(currentUser)
            return currentUser.token;
        return null;
    }

    const value = {
        currentUser,
        signin,
        signout,
        getToken,
        signup
    };

    // load the website only after the currentUser has been set
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}