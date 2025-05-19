import { useRoot } from '../../hooks/login/useRoot.ts'
import './LoginScreen.css';

export function LoginScreen() {

    const hangleLoginClick = () => {    
        const { status, loadingMap } = useRoot();
        if (loadingMap || status !== "NAVSYS") return;

        console.log('what now');
        
    }

    return (
        <div className="login-screen">
            <div className="login-content">
                <button className="login-button" onClick={hangleLoginClick}>Login with Steam</button>
            </div>
        </div>
    );
}