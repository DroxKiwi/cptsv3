

import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

function ErrorComponent (props) {

    const toast = useRef(null);
    const triggerError = () => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: props.error.message, sticky: true });
    };

    useEffect(() => {
        triggerError(props.error);
    }, []);

    return (
        <div>
            <Toast ref={toast} />
            <p>Error : {props.error.message}</p>
            <h1>Oops ! <span className='errorOops'>Une erreur s'est produite.</span></h1>
        </div>
    )
}

export default ErrorComponent;