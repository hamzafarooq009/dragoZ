// components/Login.js
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const { user, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            alert(error.message);
        } else {
            alert('Logged in successfully!');
            router.push('/');
        }
    };

    return (
        <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <img
          src="/goku.png" // Make sure this path is correct
          alt="Goku"
          className="absolute top-[-250px] left-1/2 transform -translate-x-1/2 w-50 h-50"
        />
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
                Log In
            </button>
        </form>
        </div>
    );
};

export default Login;