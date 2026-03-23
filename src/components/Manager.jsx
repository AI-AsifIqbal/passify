import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import PasswordForm from './PasswordForm';
import PasswordTable from './PasswordTable';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [passwordArray, setPasswordArray] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const { user } = useContext(AuthContext);

    const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
    });

    const getPasswords = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/passwords`, {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const data = await res.json();
                setPasswordArray(data);
            } else {
                toast.error('Failed to fetch passwords');
            }
        } catch (err) {
            toast.error('Network error fetching passwords');
        }
    };

    useEffect(() => {
        if (user) {
            getPasswords();
        }
    }, [user]);

    const savePassword = async (form) => {
        try {
            if (editingItem) {
                const res = await fetch(`${apiUrl}/api/passwords/${editingItem._id}`, {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(form)
                });

                if (res.ok) {
                    setPasswordArray(passwordArray.map(item =>
                        item._id === editingItem._id ? { ...item, ...form } : item
                    ));
                    setEditingItem(null);
                    toast.success('Password updated successfully!');
                } else {
                    toast.error('Error updating password');
                }
            } else {
                const res = await fetch(`${apiUrl}/api/passwords`, {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(form)
                });

                if (res.ok) {
                    const data = await res.json();
                    setPasswordArray([...passwordArray, { ...form, _id: data.result._id }]);
                    toast.success('Password saved successfully!');
                } else {
                    toast.error('Error saving password');
                }
            }
        } catch (err) {
            toast.error('Network error');
        }
    };

    const deletePassword = async (_id) => {
        const confirmDelete = window.confirm("Do you want to delete this password?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${apiUrl}/api/passwords/${_id}`, {
                method: "DELETE",
                headers: getAuthHeaders()
            });

            if (res.ok) {
                setPasswordArray(passwordArray.filter(item => item._id !== _id));
                toast.success('Password deleted successfully!');
            } else {
                toast.error('Error deleting password');
            }
        } catch (err) {
            toast.error('Network error');
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} theme="light" />
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-10 min-h-[80vh]">
                <h1 className='text-3xl lg:text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Passify</span>
                    <span className='text-green-500'>/&gt;</span>
                </h1>
                <p className='text-green-900 text-sm sm:text-lg text-center mt-2'>
                    Your Secure Vault
                </p>

                <PasswordForm
                    savePassword={savePassword}
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                />

                <div className="mt-8">
                    <PasswordTable
                        passwords={passwordArray}
                        editPassword={setEditingItem}
                        deletePassword={deletePassword}
                        editingId={editingItem?._id}
                    />
                </div>
            </div>
        </>
    );
};

export default Manager;
