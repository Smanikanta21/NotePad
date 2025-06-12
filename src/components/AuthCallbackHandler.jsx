import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../server/supabase';

const AuthCallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/home'); // ✅ go to home if session exists
      } else {
        navigate('/login'); // 🔴 fallback
      }
    });
  }, [navigate]);

  return <p className="text-center mt-20">Signing you in...</p>;
};

export default AuthCallbackHandler;