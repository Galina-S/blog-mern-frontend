import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }, 
  } = useForm({
     defaultValues: {
      fullName: "New User",
      email: 'user@gmail.com',
      password: '1234'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    //console.log(data)
 
    if (!data.payload) {
     return alert("Was not possible to register");
    }
    if ('token' in data.payload) {
     window.localStorage.setItem('token', data.payload.token);
    }
   };
 
   if (isAuth) {
     return <Navigate to='/' />
   } 

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create Account
      </Typography>

      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}> 
        <TextField 
        error = {Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message }
        { ...register('fullName', {required: 'Enter your Fullname'})}
        className={styles.field} 
        label="fullName" 
        fullWidth />
        
        <TextField 
        error = {Boolean(errors.email?.message)}
        helperText={errors.email?.message }
        type = "email"
        { ...register('email', {required: 'Enter your Email'})}
        className={styles.field} 
        label="E-Mail" 
        fullWidth 
        />
        <TextField 
          error = {Boolean(errors.password?.message)}
          helperText={errors.password?.message }
          type = "password"
          { ...register('password', {required: 'Enter your Email'})}
          className={styles.field} label="password" fullWidth />
        <Button disabled = {!isValid} type="submit" size="large" variant="contained" fullWidth>
           Register
        </Button>
      </form>
    </Paper>
  );
};
