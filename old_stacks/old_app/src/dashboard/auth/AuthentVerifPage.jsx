import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import logo from '../../app_client/assets/Images/logoDetoure.png'
import './authentverifpage.css';
import { API_authent } from '../services/api/authServices';
import { ls, ss } from '../../utils/store';

function AuthentVerifPage () {

    const[loginError, setLoginError] = useState(false);

    async function handleLogIn() {
        if(await API_authent.login(username, password)){
            window.top.location.href= '/dashboard';
        }
        else {
            setLoginError(true);
        }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="w-screen h-screen grid place-content-center">
            <div style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-600), var(--primary-900))' }} className='card grid place-items-center'>
                <img src={logo} width="100px" height="100px" />
                <div className="card flex justify-content-center" style={{backgroundColor: "transparent"}}>
                    <FloatLabel>
                        <InputText inputId="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label className='text-white' htmlFor="username">Mot de passe</label>
                    </FloatLabel>
                </div>
                <div className="card flex justify-content-center" style={{backgroundColor: "transparent"}}>
                    <FloatLabel>
                        <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} />
                        <label className='text-white' htmlFor="password">Mot de passe</label>
                    </FloatLabel>
                </div>
                <div className='btn-login' onClick={handleLogIn}>
                    <p>Se Connecter</p>
                </div>
                <div className='btn-login mt-3' onClick={() => window.top.location.href= '/'}>
                    <p>Retourner sur le site</p>
                </div>
            </div>
            <Dialog visible={loginError} onHide={() => setLoginError(false)}>
                <p>Identifiants incorrect</p>
            </Dialog>
        </div>
    )
}

export default AuthentVerifPage;