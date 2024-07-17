// app/auth/page.js
"use client";

import { useState } from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {isLogin ? <Login /> : <SignUp />}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-500 hover:underline"
        >
          {isLogin ? 'Need to sign up?' :

            <>
              <p className="mt-4 text-center">
                Already have an account?{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Log in
                </a>
              </p>
            </>
          }
        </button>
      </div>
    </div>
  );
};

export default AuthPage;