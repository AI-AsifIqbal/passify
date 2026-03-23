import React from 'react';
import { toast } from 'react-toastify';

const PasswordTable = ({ passwords, editPassword, deletePassword, editingId }) => {
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="passwords">
            <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
            {passwords.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-10 bg-green-50 rounded-xl border border-dashed border-green-300">
                    <p className="text-gray-500 font-medium">No passwords saved yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Add your first password above to get started!</p>
                </div>
            ) : (
                <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-green-200 bg-white">
                    <table className="table-auto w-full min-w-150 rounded-md overflow-hidden mb-0">
                        <thead className='bg-teal-700 text-white'>
                            <tr>
                                <th className='py-3 font-semibold'>Site</th>
                                <th className='py-3 font-semibold'>Username</th>
                                <th className='py-3 font-semibold'>Password</th>
                                <th className='py-3 font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwords.map((item) => (
                                <tr key={item._id} className={`${editingId === item._id ? "bg-amber-100" : "bg-white"} border-b border-green-100 hover:bg-green-50 transition-colors`}>
                                    <td className='py-3 px-4 text-center'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <a href={item.site} target='_blank' rel="noreferrer" className="text-blue-600 hover:underline max-w-[150px] truncate">{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-3 px-4 text-center'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <span className="max-w-[150px] truncate">{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-3 px-4 text-center'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <span>{"•".repeat(8)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    {editingId === item._id ? (
                                        <td className="py-3 px-4 font-semibold text-red-600 text-center animate-pulse">Editing...</td>
                                    ) : (
                                        <td className='py-3 px-4 text-center nowrap'>
                                            <div className="flex justify-center flex-nowrap shrink-0">
                                                <span className='cursor-pointer mx-1 inline-flex shrink-0' onClick={() => editPassword(item)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1 inline-flex shrink-0' onClick={() => deletePassword(item._id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PasswordTable;
