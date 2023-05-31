import { useState,} from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';
import Button from "../button/button.component";


import { FormInput } from "../form-input/form-input.component";
// import { UserContext } from "../../context/user.context";

const defaultFormFields = {

  email: "",
  password: "", 

};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;


  // const {setCurrentUser}=useContext(UserContext);


  const resetformFields = () => {
    setFormFields(defaultFormFields);
  };


  const signInWithGoogle=async()=>{
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      const user=await signInAuthUserWithEmailAndPassword(email,password);
      console.log(user);
      // setCurrentUser(user);
      resetformFields();

      
    }
    catch(err){
      
      if(err.code==="auth/wrong-password")
      {
        alert("wrong password!");

      }
      else if(err.code==="auth/user-not-found")
      {
        alert("no user associated with this email");

      }
      console.log(err);
    }
   


  }

   
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }; 

  return (
    <div className='sign-up-container'>
      <h2>Already have an account? </h2>
      <span>Sign in with your email and password </span>
     
      <form onSubmit={handleSubmit} method="POST">
       
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        
        <div className="buttons-container">
        
     <Button type="submit"> SIGN IN</Button>
     <Button type='button' onClick={signInWithGoogle} buttonType="google">Google sign in </Button>
     </div>
      </form>
    </div>
  );
};
