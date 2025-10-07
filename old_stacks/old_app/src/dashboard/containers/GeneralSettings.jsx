

import { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';

import { API_globalsDash } from '../services/api/global/globalServicesDash';
import { API_coassosDash } from '../services/api/coassos/coassosServicesDash';
import { imageConverter } from '../../utils/imageConverter';
import { FileUpload } from 'primereact/fileupload';
import ErrorPage from '../../utils/error-page';

function GeneralSettings () {

    const toast = useRef(null);
    const pan1 = useRef(null);
    const pan2 = useRef(null);
    const pan3 = useRef(null);

    const [tel, setTel] = useState('');
    const [mail, setMail] = useState('');
    const [adr, setAdr] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setLinkedIn] = useState('');
    const [chiffrepsl, setChiffrepsl] = useState(null);
    const [chiffrecom, setChiffrecom] = useState(null);
    const [chiffrehab, setChiffrehab] = useState(null);
    const [hommepageprjstext, setHommepageprjstext] = useState('');
    const [quisommesnousmaintext, setQuisommesnousmaintext] = useState('');
    const [adhererurl, setAdhererurl] = useState('');
    const [global_id, setGlobal_id] = useState(null);
    const [coassos, setCoassos] = useState([]);
    const [visibleCoassosEdit, setVisibleCoassosEdit] = useState(false);
    const [selectedCoassosEdit, setSelectedCoassosEdit] = useState(null);
    const [imgCoassos, setImgCoassos] = useState(null);
    const [totalSize, setTotalSize] = useState(0);
    const [coassosRedirecturl, setCoassosRedirecturl] = useState('');

    const showValid = () => {
        toast.current.show({ severity: "success", summary: "Sauvegarde réussie", detail: "Les informations sont modifiées avec succès", life: 3000 });
    };

    const showError = () => {
        toast.current.show({ severity: "success", summary: "Sauvegarde impossible", detail: "Un problème est survenu veuillez contacter le support", life: 3000 });
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await API_globalsDash.get_all();
                setGlobal_id(data[0].globaldata_id)
                setTel(data[0].tel);
                setMail(data[0].mail);
                setAdr(data[0].adr);
                setPostalcode(data[0].postalcode);
                setFacebook(data[0].facebook);
                setLinkedIn(data[0].linkedin);
                setChiffrepsl(data[0].chiffrepsl);
                setChiffrecom(data[0].chiffrecom);
                setChiffrehab(data[0].chiffrehab);
                setHommepageprjstext(data[0].hommepageprjstext.replaceAll('_GD_', '"').replaceAll("_GS_", "'"));
                setQuisommesnousmaintext(data[0].quisommesnousmaintext.replaceAll('_GD_', '"').replaceAll("_GS_", "'"));
                setCoassos(await API_coassosDash.get_all());
            } 
            catch (error) {
                console.log(error);
            }
        }
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function onlyNumbers(val) {
        try {
            return /^[0-9]+$/.test(val);
        }
        catch(error) {
            console.error(error);
        }
    };

    function handleSetTel (val) {
        try {
            if (onlyNumbers(val)) {
                setTel(val);
            }
            if (val.length == 0 ){
                setTel('');
            }
        }
        catch(error) {
            console.error(error);
        }
    };

    function handleSetPostalCode (val) {
        try {
            if (onlyNumbers(val)) {
                setPostalcode(val);
            }
            if (val.length == 0 ){
                setPostalcode('');
            }
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleUpdate() {
        try {
            API_globalsDash.update_global(global_id, tel, adr, postalcode, facebook, linkedin, chiffrepsl, chiffrecom, chiffrehab, hommepageprjstext, quisommesnousmaintext, mail, adhererurl);
            showValid();
        }
        catch(error){
            console.error(error);
            showError();
        }
    };

    async function handleAddCoassos() {
        try {
            await API_coassosDash.create_coassos();
            showValid();
            window.location.reload();
        }
        catch(error){
            console.error(error);
            showError();
        }
    };

    function handleVisibleCoassosEdit(c){
        try {
            setImgCoassos(null);
            setSelectedCoassosEdit(c);
            setVisibleCoassosEdit(true);
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleUpdateArticle(){
        try {
            const dataUrl = await imageConverter.customBase64UploaderCanvas(document.getElementById("imgToDownload"));
            await upload(dataUrl);
        } 
        catch (error) {
            console.error(error);
        }
    };

    async function upload(base64){
        try {
            const postData = async () => {
                await API_coassosDash.update_coassos(selectedCoassosEdit.coassos_id, base64, coassosRedirecturl);
                window.location.reload();
            }
            postData();
        }
        catch(error){
            console.error(error);
        }
    };

    const emptyTemplate = () => {
        try {
            setImgCoassos(null);
            return (
                <div className="flex align-items-center flex-column">
                    <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                    <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                        Déposer une image ici
                    </span>
                </div>
            );
        }
        catch(error){
            console.error(error);
            return <ErrorPage error={error} />
        }
    };
    
    const onTemplateSelect = (e) => {
        try {
            let _totalSize = totalSize;
            let files = e.files;
            setImgCoassos(e.files[e.files.length - 1].objectURL);
    
    
            Object.keys(files).forEach((key) => {
                _totalSize += files[key].size || 0;
            });
    
            setTotalSize(_totalSize);
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleDeleteCoassos(id){
        try {
            await API_coassosDash.remove_coassos(id);
            showValid();
            window.location.reload();
        }
        catch(error){
            console.error(error);
            showError();
        }
    };

    // État pour suivre quel panel est ouvert
    const [activePanel, setActivePanel] = useState(null);

    // Fonction pour basculer l'état d'un panel
    const togglePanel = (panelId) => {
        setActivePanel((prev) => (prev === panelId ? null : panelId));
    };

    try {
        return (
            <div>
                <Toast ref={toast} />
                <Panel 
                collapsed={activePanel !== 1}
                onToggle={() => togglePanel(1)}
                ref={pan1} header="Informations générales" toggleable>
                    <Button severity='success' label='Sauvegarder' onClick={handleUpdate} ></Button>
                    <div className='grid grid-cols-4 col-start-1 col-end-5 gap-10'>
                        <div>
                            <p>Numéro de téléphone</p>
                            <InputText value={tel} onChange={(e) => handleSetTel(e.target.value)} />
                        </div>
                        <div>
                            <p>Adresse mail</p>
                            <InputText value={mail} onChange={(e) => setMail(e.target.value)} />
                        </div>
                        <div>
                            <p>Adresse</p>
                            <InputText value={adr} onChange={(e) => setAdr(e.target.value)} />
                        </div>
                        <div>
                            <p>Code postal</p>
                            <InputText value={postalcode} onChange={(e) => handleSetPostalCode(e.target.value)} />
                        </div>
                        <div>
                            <p>Lien facebook</p>
                            <InputText value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                        </div>
                        <div>
                            <p>Lien linkedin</p>
                            <InputText value={linkedin} onChange={(e) => setLinkedIn(e.target.value)} />
                        </div>
                        <div>
                            <p>Lien adhérer</p>
                            <InputText value={adhererurl} onChange={(e) => setAdhererurl(e.target.value)} />
                        </div>
                        <div>
                            <p>Nombre de communes</p>
                            <InputNumber value={chiffrecom} onValueChange={(e) => setChiffrecom(e.value)} useGrouping={false} />
                        </div>
                        <div>
                            <p>Nombre d'habitants</p>
                            <InputNumber value={chiffrehab} onValueChange={(e) => setChiffrehab(e.value)} useGrouping={false} />
                        </div>
                        <div>
                            <p>Nombre de professionnel de santé</p>
                            <InputNumber value={chiffrepsl} onValueChange={(e) => setChiffrepsl(e.value)} useGrouping={false} />
                        </div>
                    </div>
                </Panel>
                <Panel 
                collapsed={activePanel !== 2}
                onToggle={() => togglePanel(2)}
                ref={pan2} header="Textes" toggleable>
                    <Button severity='success' label='Sauvegarder' onClick={handleUpdate} ></Button>
                    <div className='grid grid-cols-2'>
                        <div>
                            <p>Texte de la page d'accueil</p>
                            <InputTextarea value={hommepageprjstext} onChange={(e) => setHommepageprjstext(e.target.value)} rows={10} cols={60} />
                        </div>
                        <div>
                            <p>Texte de la page "qui sommes nous"</p>
                            <InputTextarea value={quisommesnousmaintext} onChange={(e) => setQuisommesnousmaintext(e.target.value)} rows={10} cols={60} />
                        </div>
                    </div>
                </Panel>
                <Panel
                collapsed={activePanel !== 3}
                onToggle={() => togglePanel(3)}
                header="Coassociés" toggleable>
                    <Button label='Ajouter' severity='success' onClick={handleAddCoassos} />
                    <div className='grid grid-cols-4 gap-10 col-start-2 col-end-5'>
                        {
                            coassos.map((c) => (
                                <div className='is-editable' onClick={() => handleVisibleCoassosEdit(c)}>
                                    <img src={c.img} />
                                </div>
                            ))
                        }
                    </div>
                    <Dialog header='Editer' visible={visibleCoassosEdit} onHide={() => setVisibleCoassosEdit(false)}>
                        {
                            selectedCoassosEdit !== null ? (
                                <div>
                                    <p>{selectedCoassosEdit.coassos_id}</p>
                                    {
                                        imgCoassos !== null ? (
                                            <img className='grid place-items-center' id="imgToDownload" src={imgCoassos} />
                                        ) :
                                        (
                                            <img className='grid place-items-center' id="imgToDownload" src={selectedCoassosEdit.img} />
                                        )
                                    }
                                    {
                                        coassosRedirecturl !== '' ? (
                                            <InputText value={coassosRedirecturl} onChange={(e) => setCoassosRedirecturl(e.target.value)} />
                                        ) :
                                        (
                                            <InputText value={selectedCoassosEdit.redirect_url} onChange={(e) => setCoassosRedirecturl(e.target.value)} />
                                        )
                                    }
                                    <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                                    <Button label='Modifier' severity='success' onClick={handleUpdateArticle}></Button>
                                    <Button label='Supprimer' severity='danger' onClick={() => handleDeleteCoassos(selectedCoassosEdit.coassos_id)} />
                                </div>
                            ) : 
                            (
                                null
                            )
                        }
                    </Dialog>
                </Panel>
            </div>
        )
    }
    catch(error){
        console.error(error);
        return <ErrorPage error={error} />
    }
}

export default GeneralSettings;