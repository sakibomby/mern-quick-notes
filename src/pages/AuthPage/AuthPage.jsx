import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
    const [showSignUp, setShowSignUp] = useState(true);
    
    const handleChange = () => {
        setShowSignUp(form => !form);
    };

    return (
        <main>
            <h1>Auth Page</h1>
           {showSignUp ?  <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} />}
            <button onClick={handleChange}>
            {showSignUp ? 'Login' : 'Sign Up'}
            </button>
        </main>
    );
}