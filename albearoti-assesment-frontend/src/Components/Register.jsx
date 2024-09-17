import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../redux/actions/user';
import toast from 'react-hot-toast';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    const { message, error } = useSelector(state => state.user);

    const handleRegister = async (e) => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
        } else {
            e.preventDefault();
            setErrorMessage('');
            await dispatch(register({ firstName, lastName, email, password }));
        }
    };

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
                <h1 className="text-white text-3xl font-semibold mb-6 text-center">Register</h1>

                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                    className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 mb-4 text-blue-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                <Link to="/login" className="text-blue-300 hover:underline">Already have an account? <span className='text-blue-400' >Login</span> </Link>

                <button
                    className="w-full mt-2 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;
