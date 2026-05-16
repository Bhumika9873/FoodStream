import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import Home from '../pages/general/Home';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import Landing from '../pages/general/Landing';

const AppRoutes = () => {
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
            <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-food" element={<CreateFood />} />
            <Route path="/food-partner/:id" element={<Profile />} />
          </Routes>
        </Router>
    )
}

export default AppRoutes