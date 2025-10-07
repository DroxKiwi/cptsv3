import Root from "../dashboard/AdminDashAddArticle";
import { createContext } from "react";
import Middleware from '../dashboard/auth/Middleware'
import { useState, useEffect } from "react";
import AuthentVerifPage from '../dashboard/auth/AuthentVerifPage';

import { ls, ss } from '../utils/store';

import ErrorLoadPage from '../dashboard/auth/ErrorLoadPage';

export const AuthContext = createContext();

function DashboardAddArticleRoute(props){

    const cookies = props.cookies;

    // J'utilise un middleware pour gérer la valeur du token, ce dernier lorsqu'il est appelé communique avec le back-office et vérifie la cohérence du token.
    // Si le token est eronné l'utilisateur est poussé hors du composant. Inversement s'il est validé l'utilisateur est poussé dedans.
    const userData = Middleware.Execute();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        try {
            setIsAuthenticated(userData);
        }
        catch(error){
            console.error(error);
        }
    }, [userData]);

    // Cette fonction est appelé quand le bouton de connexion est appuyé est qu'elle aboutit. Dans la cas écheant, je force le contenu
    // du composant en cours "Auth" à se charger une fois tout rendu terminé. De cette manière je peux conserver hors contexte la vérification de l'utilisateur.
    const login = () => {
        window.location.reload();
    };

    try {
        return (
            <div className="h-full w-full">
                <AuthContext.Provider value={{ isAuthenticated, login }}>
                { !isAuthenticated ? (
                        <AuthentVerifPage />
                    ) : (
                        <Root />
                    )}
                </AuthContext.Provider>
            </div>
        );
    }
    catch(error){
        return <ErrorLoadPage error={error}/>;
    }
}

export default DashboardAddArticleRoute;