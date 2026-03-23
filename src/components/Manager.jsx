/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const eyeRef = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [editId, setEditId] = useState(null)

    const showPassword = () => {
        if (eyeRef.current.src.includes("/icons/eyecross.png")) {
            eyeRef.current.src = "/icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            eyeRef.current.src = "/icons/eyecross.png"
            passwordRef.current.type = "password"
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);

        toast('Copied to clipboard!');
    }

    const getPasswords = async () => {
        try {
            const res = await fetch("http://localhost:3000/");
            const data = await res.json();
            setPasswordArray(data);
        } catch (err) {
            toast('Error fetching passwords');
            console.error(err);
        }
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const savePassword = async () => {
        if (!form.site || !form.username || !form.password) {
            toast('Error: All fields are required');
            return;
        }

        try {
            if (editId) {
                await fetch(`http://localhost:3000/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });

                setPasswordArray(passwordArray.map(item =>
                    item._id === editId ? { ...item, ...form } : item
                ))

                setEditId(null)

                toast('Password updated successfully!');
            }
            else {
                const res = await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });

                const data = await res.json();

                setPasswordArray([
                    ...passwordArray,
                    { ...form, _id: data.result.insertedId }
                ]);

                toast('Password saved successfully!');
            }

            setform({ site: "", username: "", password: "" });

        } catch (err) {
            toast('Error saving password');
            console.error(err);
        }
    }

    const editPassword = (_id) => {
        const selected = passwordArray.find(item => item._id === _id)
        setform(selected)
        setEditId(_id)   // 🔥 mark as editing
    }

    const deletePassword = async (_id) => {
        const confirmDelete = confirm("Do you want to delete?");
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:3000/${_id}`, {
                method: "DELETE"
            });

            setPasswordArray(passwordArray.filter(item => item._id !== _id));

            toast('Password deleted successfully!');

        } catch (err) {
            toast('Error deleting password');
            console.error(err);
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-20 py-6 sm:py-10 min-h-[80vh]">
                <h1 className='text-3xl lg:text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Passify</span>
                    <span className='text-green-500'>/&gt;</span>
                </h1>
                <p className='text-green-900 text-sm sm:text-lg text-center'>
                    Your own Password Manager
                </p>

                {/* FORM */}
                <div className="flex flex-col p-4 gap-6 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter website URL'
                        className='rounded-full border border-green-500 w-full p-4 py-1'
                        type="text"
                        name="site"
                    />

                    <div className="flex flex-col md:flex-row w-full gap-4">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter Username'
                            className='rounded-full border border-green-500 w-full p-4 py-1'
                            type="text"
                            name="username"
                        />

                        <div className="relative">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                                placeholder='Enter Password'
                                className='rounded-full border border-green-500 w-full p-4 py-1'
                                name="password"
                            />
                            <span className='absolute right-0.75 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={eyeRef} className='p-1' width={26} src="icons/eyecross.png" alt="eye" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-6 sm:px-8 py-1.5 w-full sm:w-fit border border-green-900 text-sm sm:text-base'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save
                    </button>
                </div>

                {/* TABLE */}
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0
                        ? <div>No passwords to show</div>
                        : <div className="w-full overflow-x-auto rounded-lg">
                            <table className="table-auto w-full min-w-150 rounded-lg mb-10">
                                <thead className='bg-teal-700 text-white'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody className='bg-green-100'>
                                    {passwordArray.map((item) => {
                                        return <tr key={item._id} className={editId === item._id ? "bg-amber-100" : ""}>
                                            <td className='p-2 border border-white text-center'>
                                                <div className='flex items-center justify-center'>
                                                    <a href={item.site} target='_blank'>{item.site}</a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='p-2 border border-white text-center'>
                                                <div className='flex items-center justify-center '>
                                                    <span>{item.username}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='p-2 border border-white text-center'>
                                                <div className='flex items-center justify-center '>
                                                    <span>{"•".repeat(4)}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            {editId === item._id
                                                ? <div className="font-semibold text-red-800 p-2 text-center">Editing...</div>
                                                : <td className='justify-center py-2 border border-white text-center nowrap'>
                                                    <span className='cursor-pointer mx-1' onClick={() => editPassword(item._id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer mx-1' onClick={() => deletePassword(item._id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </td>}
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
