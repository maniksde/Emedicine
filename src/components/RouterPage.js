import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Orders from './users/Orders';
import Dashboard from './users/Dashboard';
import Profile from './users/Profile';
import Cart from './users/Cart';
import MedicineDisplay from './users/MedicineDisplay';

import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import CustomerList from './admin/CustomerList';
import Medicine from './admin/Medicine';


const RouterPage = ()=>{
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/home" element={<Dashboard/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/medicinedisplay" element={<MedicineDisplay />} />

                <Route path="/admindashboard" element={<AdminDashboard/>} />
                <Route path="/adminorders" element={<AdminOrders/>} />
                <Route path="/customers" element={<CustomerList/>} />
                <Route path="/medicine" element={<Medicine/>} />
                
                
            </Routes>
        </Router>
    )
}

export default RouterPage;