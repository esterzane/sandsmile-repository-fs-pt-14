import React, { useRef, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import { Link, useNavigate } from 'react-router-dom'
import { NavBar } from "../component/navbar";
import Image5 from "../../img/image5.jpg";

export const Signup = () => {

  const {store,actions}=useContext(Context)
  
  const [signup, setSignup]=useState(store.formSignup)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');

  const goToLogin=useNavigate()
  const formRef= useRef (null)

  const handleInputForm = (value, name) => {
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setSignup({ ...signup, [name]: value });
    }
   };

   const handleSubmit = async (formSignup) => {
    
    if (formSignup.password.length < 5) {
      setPasswordWarning('Password must be at least 5 characters long.');
      return; 
    }

    for (let key in formSignup) {
     
      if (!formSignup[key]) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }
   
    try {
      if (signup.password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      console.log(formSignup);
      await actions.signupNewUser(formSignup);
      alert(`The user was created successfully`);
      formRef.current.reset();
      setSignup(store.formSignup);
      goToLogin("/login");
    } catch (e) {
      console.log("An error occurred, check it out", e);
    }
   };

  return (
    <div className='signup'>
         <NavBar />
        <div className="hero">
            <img className="hero__image" src={Image5} />
            <div className="signup-page">
              <div className='container signup-form'>
                  <form 
                ref={formRef}
                id='contact-form' className='form-signup'
                onSubmit={(e) => { e.preventDefault(); handleSubmit(signup); }}>
                    <input type="email" id="email" name="email" onChange={(e)=>(handleInputForm(e.target.value, e.target.name))} required placeholder='e-mail'/>
                    <input type="password" id="password" name="password"  onChange={(e)=>(handleInputForm(e.target.value, e.target.name))} required placeholder='password'/>
                    {passwordWarning && <div className="password-warning text-white">{passwordWarning}</div>}
                    <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e)=>(handleInputForm(e.target.value, e.target.name))} required placeholder='confirm password'/>
                    <button type="button" onClick={()=>handleSubmit(signup)}><strong>Sign Up</strong></button>
                </form>  
              </div>
           </div>
        </div> 
    </div>
  )
}