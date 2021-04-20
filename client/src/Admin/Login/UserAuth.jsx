import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getUser } from './login.api';

const UserAuth = (props) => {
  const { children } = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUser()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(function (response) {
        setRedirect(true);
      });
  }, []);

  if (redirect) history.push('/');

  return authenticated ? <div>{children}</div> : <div>...</div>;
};

UserAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserAuth;
