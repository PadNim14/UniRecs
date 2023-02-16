import React, { useEffect, useState } from 'react';

const UseFirebaseAuth = (firebase) => {

    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const unListen = firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                    ? setAuthUser(authUser)
                    : setAuthUser(null);
            },
        )
        return () => {
            unListen();
        }
    }, []);

    return authUser;

}

export default UseFirebaseAuth;