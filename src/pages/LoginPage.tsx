import { useNavigate } from 'react-router-dom';
import { useBackendReady } from '../hooks/useBackendReady.ts';
import '../styles/LoginPage.css';

export function LoginPage() {
    const navigate = useNavigate();
    const ready = useBackendReady();

     const handleLoginClick = () => {    
         if (!ready) {
            console.log('Loading...')
         } else {
            navigate("/map");
         }
     }

    return (
        <div className="login-page">
            <div className="login-content">
                <button className="login-button" onClick={handleLoginClick}>
                    Login with Steam
                </button>
            </div>
        </div>
    );
}