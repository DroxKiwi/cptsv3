
import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';



function ErrorToast(props){

    // Gestion d'erreur à l'écran
    const toast = useRef(null);
    const triggerError = (error) => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: error.message, sticky: true });
    };
    // Gestion d'erreur à l'écran

    useEffect(() => {
        triggerError(props.error);
    }, [])

    return (
        <Toast ref={toast} />
    );

}

export default ErrorToast;