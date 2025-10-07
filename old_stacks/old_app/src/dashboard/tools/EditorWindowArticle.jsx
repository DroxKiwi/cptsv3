
import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { API_actualitesDash } from '../services/api/articles/actualitesServicesDash';
import { API_tagsDash } from '../services/api/tags/tagsServicesDash';
import ErrorComponent from './ErrorComponent';

function EditorWindowArticle (props) {

    const toast = useRef(null);
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
            console.error(error);
        }
    }, []);

    const showAdd = () => {
        toast.current.show({ severity: 'success', summary: 'Succès !', detail: 'Article ajouté' });
    };

    const showError = () => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: "Aucun tags de créé et d'actif !" });
    };

    async function handleAddArticle() {
        if (tags.length > 0) {
            await API_actualitesDash.create_article();
            showAdd();
            window.location.reload();
        }
        else {
            showError();
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
                            <Button className='m-5 z-10' label='Ajouter' severity='info' onClick={handleAddArticle} />
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
        return <ErrorComponent error={error} />
    }
}

export default EditorWindowArticle;