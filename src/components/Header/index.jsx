import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from 'react-redux';


export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
   

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
    dispatch(logout());
    window.localStorage.removeItem('token');
  } 
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create a post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
