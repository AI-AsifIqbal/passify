import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const PasswordForm = ({ savePassword, editingItem, setEditingItem }) => {
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (editingItem) {
            setForm(editingItem);
        } else {
            setForm({ site: "", username: "", password: "" });
        }
    }, [editingItem]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.site || !form.username || !form.password) {
            toast.error('All fields are required');
            return;
        }
        savePassword(form);
        setForm({ site: "", username: "", password: "" });
    };

    const handleCancel = () => {
        setEditingItem(null);
        setForm({ site: "", username: "", password: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-6 items-center mt-6">
            <input
                value={form.site}
                onChange={handleChange}
                placeholder='Enter website URL'
                className='rounded-full border bg-white border-green-500 w-full p-4 py-2'
                type="text"
                name="site"
                required
            />

            <div className="flex flex-col md:flex-row w-full gap-4">
                <input
                    value={form.username}
                    onChange={handleChange}
                    placeholder='Enter Username'
                    className='rounded-full border bg-white border-green-500 w-full p-4 py-2'
                    type="text"
                    name="username"
                    required
                />

                <div className="relative w-full">
                    <input
                        value={form.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter Password'
                        className='rounded-full border bg-white border-green-500 w-full p-4 py-2'
                        name="password"
                        required
                    />
                    <span
                        className='absolute right-4 top-[10px] cursor-pointer text-sm text-gray-500 hover:text-green-700 font-bold'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
            </div>

            <div className="flex gap-4 w-full sm:w-auto">
                <button type="submit" className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 sm:px-10 py-2 w-full sm:w-fit font-bold border border-green-900'>
                    {editingItem ? 'Update' : <div className='flex justify-center items-center gap-2 text-xl'>
                        <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save
                    </div>}
                </button>
                {editingItem && (
                    <button type="button" onClick={handleCancel} className='flex justify-center items-center gap-2 bg-red-400 hover:bg-red-300 rounded-full px-6 sm:px-10 py-2 w-full sm:w-fit font-bold border border-red-900'>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default PasswordForm;
