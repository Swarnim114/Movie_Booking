import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { withAdminAuth, withPartnerAuth, withUserAuth } from './components/protectedRoutes2';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import Forget from './pages/Forget';
import Reset from './pages/Reset';
import SingleMovie from './pages/SingleMovie';
import BookShow from './pages/BookShow';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const AdminRoute = withAdminAuth(Admin);
    const PartnerRoute = withPartnerAuth(Partner);
    const UserRoute = withUserAuth(Profile);
    const UserMovieRoute = withUserAuth(SingleMovie);
    const UserBookShowRoute = withUserAuth(BookShow);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                    <Route path="/admin" element={<AdminRoute />} />
                    <Route path="/profile" element={<UserRoute />} />
                    <Route path="/partner" element={<PartnerRoute />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forget" element={<Forget />} />
                    <Route path="/reset" element={<Reset />} />
                    <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie/></ProtectedRoute>} />
                    <Route path="/book-show/:id" element={<ProtectedRoute><BookShow/></ProtectedRoute>} />
                    {/*<Route path="/movie/:id" element={<UserMovieRoute />} />*/}
                    {/*<Route path="/book-show/:id" element={<UserBookShowRoute />} />*/}
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;