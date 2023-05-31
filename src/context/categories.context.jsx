import { createContext,useState } from "react";

// import {SHOP_DATA}  from '../shop-data.js';

import {useEffect} from 'react';

import { getCategoriesAndDocumnet } from "../utils/firebase/firebase.utils.js";


export const CategoriesContext=createContext({
    categoriesMap:{},

});


export const CategoriesProvider=({children})=>
{  
    const [categoriesMap,setCategoriesMap]=useState({});
      useEffect(()=>{
       
       const getCategooriesMap=async ()=>{
           const categoryMap=await getCategoriesAndDocumnet();
           console.log(categoryMap);
           setCategoriesMap(categoryMap);

       }

         getCategooriesMap();
         
      },[]);
    const value={categoriesMap};

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}