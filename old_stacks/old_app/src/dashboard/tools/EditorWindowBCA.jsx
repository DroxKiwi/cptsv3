
import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


import ErrorComponent from './ErrorComponent';
import { API_orgasDash } from '../services/api/orgas/orgasServicesDash';

function EditorWindowBCA (props) {

    // Gestion d'erreur à l'écran
    const toast = useRef(null);
    const triggerError = (error) => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: error.message, sticky: true });
    };
    // Gestion d'erreur à l'écran

    const showAdd = () => {
        toast.current.show({ severity: 'success', summary: 'Succès !', detail: 'Evenement ajouté' });
    };

    const showError = () => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: "Une erreur est survenue" });
    };

    async function handleAddOrga() {
        try {
            await API_orgasDash.create_orga();
            showAdd();
            window.location.reload();
        }
        catch(error){
            showError();
            triggerError(error);
            console.error(error);
        }
    };
    
    function isDashboardViewerUrl(url) {
        const regex = /.*\/dashboard\/viewer$/;
        return regex.test(url);
    };
    
    try {
        return (
            <div>
                {
                    isDashboardViewerUrl(window.top.location.href) ? (
                        <div>
                            <Button className='m-5 z-10' label='Ajouter' severity='info' onClick={handleAddOrga} />
                            <Toast ref={toast}></Toast> 
                            {props.children}
                        </div>
                    ) :
                    (
                        <>
                            {props.children}
                        </>
                    )
                }
            </div>
        )
    }
    catch(error){
        triggerError(error);
        console.error(error);
        return <ErrorComponent error={error} />
    }
}

export default EditorWindowBCA;