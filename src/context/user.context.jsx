
import {createContext,useState,useEffect} from 'react';

import { onAuthStateChangedListener,createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';


//as the actual value you want to access
export const UserContext=createContext({
   
    currentUser:null,
    setCurrentUser:()=>null


})



export const UserProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    


    useEffect(()=>{
     const unsubscribe= onAuthStateChangedListener(async (user)=>{
        console.log(user);
        if(user)
        {
            const userDocRef=await createUserDocumentFromAuth(user);
        }

         setCurrentUser(user);
      })
      return unsubscribe;
    },[])

    const value={currentUser,setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}