import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import styles from "./Login.module.scss";
 
export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    setError, 
    formState: { errors, isValid }, 
  } = useForm({
    defaultValues: {
      email: 'user@gmail.com',
      password: '1234'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {   //object with email and password
   const data = await dispatch(fetchAuth(values));
   //console.log(dispatch(fetchAuth(values)));
   //console.log(data);
   //console.log(values);

   if (!data.payload) {
    return alert("Was not possible to authorize");
   }
   if ('token' in data.payload) {
    window.localStorage.setItem('token', data.payload.token);
   }
  };

//console.log(errors, isValid);
  if (isAuth) {
    return <Navigate to='/' />
  }
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Log into your account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}> 
      <TextField
        className={styles.field}
        label="E-Mail"
        error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message }
        type = "email"
        { ...register('email', {required: 'Enter your Email'})}
        fullWidth
      />
      <TextField 
      className={styles.field} 
      label="Password" 
      error = {Boolean(errors.password?.message)}
      helperText={errors.password?.message }
      { ...register('password', {required: 'Enter your Password'})}
      fullWidth />

      <Button disabled = {!isValid}  type ="submit" size="large" variant="contained" fullWidth>
        Log in
      </Button>
      </form>
    </Paper>
  );
};
