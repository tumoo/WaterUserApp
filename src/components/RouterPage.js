import React from  'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import CustomerList from './admin/CustomerList';
import Medicine from './admin/Medicine';
import Login from './Login';
import MedicineDisplay from './users/MedicineDisplay';
import Registration from './Registration';
import Cart from './users/Cart';
import Dashboard from './users/Dashboard';
import Orders from './users/Orders';
import Profile from './users/Profile';
import Receipt from './users/Receipt';
import SideMenu from './users/SideMenu';
import StoreDisplay from './users/StoresDisplay';
import WaterProductsDisplay from './users/WaterProductsDisplay';
import ShoppingCart from './users/ShoppingCart'
import CheckoutPage from './users/CheckoutPage';
import TrackOrder from './users/TrackOrder';
export default function RouterPage(){
    
    return(
        <Router>
            <Routes>
                <Route exact path='/' element={ <Login /> } />
                <Route path='/registration' element={ <Registration /> } />
                <Route path='/dashboard' element={ <Dashboard /> } />                
                <Route path='/myorders' element={ <Orders /> } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/cart' element={ <ShoppingCart /> } />

                <Route path='/admindashboard' element={ <AdminDashboard /> } />
                <Route path='/adminorders' element={ <AdminOrders /> } />
                <Route path='/customers' element={ <CustomerList /> } />
                <Route path='/medicine' element={ <Medicine /> } />

                <Route path='/products/:storeId' element={ <WaterProductsDisplay /> } />
                <Route path='/stores' element={ <StoreDisplay /> } />

                <Route path='/receipt/:id' element={ <Receipt /> } />
                <Route path='/sidemenu' element={ <SideMenu /> } />
                <Route path='checkoutPage' element={<CheckoutPage/>}/>
                <Route path='/trackOrder' element={<TrackOrder/>}/>
            </Routes>
        </Router>
    )
}