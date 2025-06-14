import { supabase } from '../server/supabase.js';

export async function SignUpWithEmail(email,password){
    const { data, error } = await supabase.auth.signUp({email, password});
    if (error){
        console.error('Error signing up:', error);
        return { success: false, error: error.message };
    }
    return { success: true, data };
}

export async function SignInWithEmail(email,password){
    const { data, error } = await supabase.auth.signInWithPassword({email, password});
    if (error){
        console.error('Error signing in:', error);
        return { success: false, error: error.message };
    }
    return { success: true, data };
}

export async function googleSignIn(){
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + '/auth/callback'
        }
    });
}

export async function signOut(){
    const { error } = await supabase.auth.signOut();
    if (error){
        console.error('Error signing out:', error);
        return { success: false, error: error.message };
    }
    return { success: true };
}   


export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error fetching session:", error);
    return null;
  }
  return data.session;
}