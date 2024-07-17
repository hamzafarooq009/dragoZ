// components/SignUp.js
import { useState } from 'react';
import { supabase } from '../../supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the confirmation link!');
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img
          src="goku.png" // Make sure this path is correct
          alt="Goku"
          className="absolute top-[-250px] left-1/2 transform -translate-x-1/2 w-50 h-50"
        />

        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
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
            Sign Up
          </button>
        </form>
    </div>
  );
};

export default SignUp;  