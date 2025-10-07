import { useEffect } from 'react';


function ErrorLoadPage(props) {

    useEffect(() => {
        console.error(props.error);
    }, [props.error])

    return (
        <div className="grid place-items-center bg-red-100 card">
            Oops ! Une erreur s'est produite pendant le chargement du composant, veuillez contacter le service de développement de l'application.
            <ul className="card bg-red-100">
                <li className="bg-red-100">
                    Message : {props.error.message}
                </li>
            </ul>
        </div>
    )
}

export default ErrorLoadPage;