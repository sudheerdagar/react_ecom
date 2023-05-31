// import { getRedirectResult } from "firebase/auth";
import { auth,signInWithGooglePopup,createUserDocumentFromAuth,signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import { SignUpForm } from "../../components/sign-up-form/sign-up-form.component";
// import{useEffect} from 'react';
import { SignInForm } from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss';




const Authentication=()=>{
     
    // useEffect(()=>{
    //     const fetch=async()=>{ 
    // const response =await getRedirectResult(auth);
    // console.log(response);

    // if(response)
    // {
    //     const userDocRef=await createUserDocumentFromAuth(response.user);
    // }
    // };

    //     fetch();

    // },[])    
return(
     <div className="authentication-container">
   

    {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
    {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
    <SignInForm/>
    <SignUpForm/>
   
    </div>
)

}

export default Authentication;