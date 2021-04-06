
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';




function Login() {

  const [newUser,setNewUser] = useState(false);
  
  const [user, setUsers] = useState({
    isSignedIn : false,
    name : '',
    email: '',
    password: '',
    photo: '',
    error: ''
  });

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }
  

  const signOut =() =>{
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }
  
  const handleResponse =(res, redirect)=> {
    setUsers(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from)
    }
  }




  const handleBlur = (e) =>{
    const values = e.target.value;
    const name = e.target.name;
    console.log(name, values);


    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    let isFieldValid = true;
    if(name === 'email'){
      const isFieldValid = regexEmail.test(values);
      console.log(isFieldValid);
    }

    if(name === 'password'){
      const isFieldValid = values.length> 6 && /[0-9]/.test(values);
      console.log(isFieldValid);
    }

    if (isFieldValid) {
      const newUserInfo = {...user};
      console.log(newUserInfo);
      newUserInfo[e.target.name] = e.target.value;
      setUsers(newUserInfo);
      
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    e.preventDefault();
  }


  return (
    <div style={{textAlign : 'center'}}>
      {
        user.isSignedIn ? <button onClick ={signOut}>Sign Out</button> 
                        : <button onClick ={googleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
                            <h1>Welcome, {user.name}</h1>
                            <h3>Your Email {user.email}</h3>
                            <img src={user.photo} alt=""/>
                          </div>
      }

      <p>User Name : {user.name}</p>
      <p>User Email : {user.email}</p>
      <p>User Password : {user.password}</p>
      
      <input type="checkbox" name="newUser" onChange={()=> setNewUser(!newUser)} id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form action="" onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter your name" id=""/>}
        <br/>
        <input type="text" name="email" id="" onBlur={handleBlur} required placeholder="Enter your email address"/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} required placeholder="Enter your password" id=""/>
        <br/>
        <button type="submit">{newUser ? 'Sign Up' : 'Sign In'}</button>
      </form>

      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success &&  <p style={{color: 'green'}}>User {newUser ? 'created' : 'logged'} In successfully</p>
      }
    </div>
  );
}

export default Login;
