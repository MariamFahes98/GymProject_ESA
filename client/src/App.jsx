import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home.jsx';
import Layout from './components/Dashboard/Layout/layout.jsx';
import Profile from './components/Dashboard/Profile/profile.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ClassTable from './components/Dashboard/Classes/classes2.jsx';
import EditProfile from './components/Dashboard/EditProfile/EditProfile.jsx';
import Product from './components/Dashboard/product/product.jsx';
import EditProduct from './components/Dashboard/product/editProduct.jsx';
import TrainerTable from './components/Trainer/trainerTable.jsx';
import MemberTable from './components/Dashboard/Member/memberTable.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import TrainerDetails from './components/Trainer/trainerDetails.jsx';
import SectionProvider from './context/SectionContext.jsx';



export default function App() {
  return (
    <SectionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/trainer/:id" element={<TrainerDetails />} /> {/* Route for trainer details */}
          
          <Route path="dashboard" element={<ProtectedRoute element={Layout} />}>
            <Route index element={<ProtectedRoute element={Dashboard} />} />
            <Route path='profile' element={<ProtectedRoute element={Profile} />} />
            <Route path='classes' element={<ProtectedRoute element={ClassTable} />} />
            <Route path='editprofile' element={<ProtectedRoute element={EditProfile} />} />
            <Route path='product' element={<ProtectedRoute element={Product} />} />
            <Route path="editproduct/:id" element={<ProtectedRoute element={EditProduct} />} />
            <Route path='trainer' element={<ProtectedRoute element={TrainerTable} />}/>
            <Route path='member' element={<ProtectedRoute element={MemberTable} />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </SectionProvider>
  );
}
