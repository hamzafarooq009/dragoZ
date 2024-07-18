// app/components/Header.js
"use client";

import { useRouter } from 'next/navigation';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const handleSignIn = async () => {
        router.push('/auth');
    };

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <img src="/dbzlogo.png" alt="Logo" className="h-20 w-45" onClick={handleLogoClick}/>
            <div className="flex-1 flex justify-end items-center space-x-4">
                {user ? (
                    <>
                        <div>Welcome, {user?.email}</div>
                        <button
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <div>Sign(in/up) to checkout exciting features</div>
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                            onClick={handleSignIn}
                        >
                            Sign(in/up)
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;