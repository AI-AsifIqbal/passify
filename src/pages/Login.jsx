import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                login(data);
                toast.success('Logged in successfully!');
                navigate('/');
            } else {
                toast.error(data.error || 'Login failed');
            }
        } catch (err) {
            toast.error('Network error. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} theme="light" />
            <div className="flex justify-center items-center min-h-[80vh] px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-green-200">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        <span className="text-green-500">&lt;</span>Login<span className="text-green-500">/&gt;</span>
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="rounded-full border border-green-500 w-full p-4 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="rounded-full border border-green-500 w-full p-4 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-full font-bold border border-green-900 mt-2">
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-6 text-sm text-gray-600">
                        Don't have an account? <Link to="/register" className="text-green-700 font-bold hover:underline">Register here</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
