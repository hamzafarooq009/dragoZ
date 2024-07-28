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
        <header className="flex flex-col items-center bg-[#1C1C1C] text-white">
            <div className="px-4 lg:px-6 h-14 w-full flex items-center justify-between">
                <img src="/dbzlogo.png" alt="Logo" className="h-20 w-45 cursor-pointer" onClick={handleLogoClick} />
                <div className="hidden lg:flex gap-4 sm:gap-6">
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
                            <button
                                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                                onClick={handleSignIn}
                            >
                                Sign(in/up)
                            </button>
                        </>
                    )}
                </div>
            </div>
            {!user && (
                <div className="bg-[#2C2C2C] text-white py-2 w-full text-center text-lg font-medium">
                    Sign(in/up) to checkout exciting features
                </div>
            )}
        </header>
    );
};

export default Header;