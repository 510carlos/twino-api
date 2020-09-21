
import React, { useState, useEffect } from 'react';
import { getUser } from './login.api';
import { useHistory } from "react-router-dom";

const UserAuth = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getUser().then((data) => {
            setAuthenticated(true)
        }).catch(function (response) {
            setRedirect(true)
        });
      }, []);

    if(redirect)
        history.push("/")
      

    return authenticated ? (
        <div>{props.children}</div>
    ) : (
        <div>...</div>
    );
};

export default UserAuth;