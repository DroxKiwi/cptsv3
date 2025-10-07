
import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { API_eventsDash } from '../services/api/events/eventsServicesDash';
import { API_tagsDash } from '../services/api/tags/tagsServicesDash';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import ErrorComponent from './ErrorComponent';

function EditorWindowEvent (props) {

    // Gestion d'erreur à l'écran
    const toast = useRef(null);
    const triggerError = (error) => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: error.message, sticky: true });
    };
    // Gestion d'erreur à l'écran

    const [tags, setTags] = useState([]);

    useEffect(() => {
        try {
            const getData = async () => {
                var tagTemp = await API_tagsDash.get_all();
                var result = [];
                for (var i = 0; i < tagTemp.length; i++) {
                    if (tagTemp[i].actif){
                        result.push(tagTemp[i]);
                    }
                }
                setTags(result);
            };
            getData();
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    }, []);

    const showAdd = () => {
        toast.current.show({ severity: 'success', summary: 'Succès !', detail: 'Evenement ajouté' });
    };

    const showError = () => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: "Aucun tags de créé et d'actif !" });
    };

    async function handleAddEvent() {
        try {
            if (tags.length > 0) {
                await API_eventsDash.create_event();
                showAdd();
                window.location.reload();
            }
            else {
                showError();
            }
        }
        catch(error){
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
                            <Button className='m-5 z-10' label='Ajouter' severity='info' onClick={handleAddEvent} />
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

export default EditorWindowEvent;