// app/auth/callback.js
"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get('access_token');
      const expires_in = params.get('expires_in');
      const refresh_token = params.get('refresh_token');
      const token_type = params.get('token_type');

      if (access_token && refresh_token) {
        supabase.auth.setSession({
          access_token,
          refresh_token,
          expires_in,
          token_type,
        });
        router.push('/');
      }
    }
  }, [router]);

  return <div>Loading...</div>;
};

export default AuthCallback;