import {initializeApp} from 'firebase/app';
import {getAuth,
SignInWithRedirect,
signInWithPopup,
GoogleAuthProvider,
signInWithRedirect,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,onAuthStateChanged} from 'firebase/auth';


import {
getFirestore,
doc,
getDoc,
setDoc,
collection,
writeBatch,
query,
getDocs
 
}from 'firebase/firestore'

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxRNwVr14DcPbLsy8kJsaV_qePooWRmkQ",
  authDomain: "crwn-clothing-db-35617.firebaseapp.com",
  projectId: "crwn-clothing-db-35617",
  storageBucket: "crwn-clothing-db-35617.appspot.com",
  messagingSenderId: "504450862380",
  appId: "1:504450862380:web:6239e7406f736e90e23089"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider=new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth=getAuth();


export const signInWithGooglePopup=()=>signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,googleProvider);



export const db= getFirestore();

//////DATA HANDLING OF FIREBASE


export const addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
  const collectionRef=collection(db,collectionKey);
  const batch=writeBatch(db);
  objectsToAdd.forEach((object)=>{
    const docRef=doc(collectionRef,object.title.toLowerCase());
    batch.set(docRef,object);
  });

   await batch.commit();
  console.log('done');
  
}


export const getCategoriesAndDocumnet=async ()=>{

 const collectionRef=collection(db,'categories');
 const q=query(collectionRef);

 const querySnapshot=await getDocs(q);
 const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
const {title,items} =docSnapshot.data();
acc[title.toLowerCase()]=items;
return acc;


 },{});
 return categoryMap;


}


















export const createUserDocumentFromAuth=async (userAuth)=>{

 const userDocRef=doc(db,'users',userAuth.uid);
 console.log(userDocRef);

 const usersnapshot=await getDoc(userDocRef);//tells us about the certain instance exits or not

if(!usersnapshot.exists())
{
  const {displayName,email}=userAuth;
  const createdAt=new Date();

 try{
  await setDoc(userDocRef,{
    displayName,
    email,
    createdAt
  });

 }catch(error){
  console.log('error creating the user',error.message);
 }

}



//if userdata doesnt exist
//create /set the document with the data from userAuth in my collection


//if userdata doesnt exist
//




 console.log(usersnapshot);
 return userDocRef;



}


export const createAuthUserWithEmailAndPassword=async(email,password)=>{
  
  if(!email||!password) return ;
 const {user}=await createUserWithEmailAndPassword(auth,email,password);
 return user;

}

export const signInAuthUserWithEmailAndPassword=async(email,password)=>{
  
  if(!email||!password) return ;
 const {user}=await signInWithEmailAndPassword(auth,email,password);
 return user;

}


export const signOutUser=async ()=>{
  return await signOut(auth);

}

export const onAuthStateChangedListener=(callback)=> onAuthStateChanged(auth,callback);

