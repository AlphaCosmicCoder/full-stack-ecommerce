import Headers from './components/Headers';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProtectedComponent from './components/ProtectedComponent';
import AuthForm from './components/AuthForm';
import AddProductForm from './components/AddProductForm.jsx';
import Logout from './components/Logout';
import ProductDetails from './components/ProductDetails.jsx';
import EditProductForm from './components/EditProductForm.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedComponent><ProductList /></ProtectedComponent>} />
        <Route path='/login' element={<AuthForm />} />
        <Route path='/cart' element={<ProtectedComponent><Cart /></ProtectedComponent>} />
        <Route path='/add-product' element={<ProtectedComponent><AddProductForm /></ProtectedComponent>} />
        <Route path='/product/edit/:id' element={<ProtectedComponent><EditProductForm /></ProtectedComponent>} />
        <Route path='/product/:id' element={<ProtectedComponent><ProductDetails /></ProtectedComponent>} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
