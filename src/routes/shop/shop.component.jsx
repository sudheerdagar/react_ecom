import {Routes,Route} from 'react-router-dom';

import './shop.styles.scss';
import Category from '../category/category.component';

import CategoriesPreview from '../../components/categories-preview/categories-preview.component';



const Shop = () => {
 
  return (
    <Routes>

     <Route index={true} element={<CategoriesPreview/>}/>
     <Route path=':category' element={<Category/>}/>
    </Routes>
   
  )
};

export default Shop;
