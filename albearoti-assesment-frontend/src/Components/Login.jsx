import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/user';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { message, error } = useSelector(state => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            toast.error('Please fill all the fields');
            return;
        }
        await dispatch(login(email, password));

    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, message, error])


    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-900">
            <div className="bg-blue-700 p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-white text-3xl font-semibold mb-6 text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Link to="/register" className="text-blue-300 hover:underline">Don't have an account? <span className='text-blue-400' >Register</span> </Link>
                <button
                    className="w-full mt-2 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
