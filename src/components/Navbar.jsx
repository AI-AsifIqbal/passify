import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className='bg-slate-800 text-white'>
            <div className="lg:px-40 flex justify-between items-center px-4 py-5 h-15">
                {/* LOGO */}
                <div className="font-bold text-2xl">
                    <span className='text-green-500'>&lt;</span>
                    <span>Passify</span>
                    <span className='text-green-500'>/&gt;</span>
                </div>

                <div className='flex gap-4 items-center'>
                    {user && (
                        <>
                            <span className="text-sm font-semibold hidden sm:block">
                                {user.email}
                            </span>
                            <button
                                onClick={logout}
                                className='text-white bg-red-600 hover:bg-red-500 rounded-full px-4 py-1 ring-white ring-1 text-sm font-bold'
                            >
                                Logout
                            </button>
                        </>
                    )}
                    <a href="https://github.com/AI-AsifIqbal/passify" target='_blank' className='text-white bg-green-700 rounded-full flex justify-between items-center ring-white ring-1 hidden sm:flex'>
                        <img className='invert w-8 p-1' src="/icons/github.svg" alt="github logo" />
                        <span className='font-bold pr-3 pl-1 text-sm'>GitHub</span>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar