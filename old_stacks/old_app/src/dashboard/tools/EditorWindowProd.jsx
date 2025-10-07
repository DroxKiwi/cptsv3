
import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { API_prodsDash } from '../services/api/prod/prodsServicesDash';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Editor } from 'primereact/editor';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import defaultImg from '../assets/Images/defaultimg.png';
import { InputSwitch } from 'primereact/inputswitch';
import { imageConverter } from '../../utils/imageConverter';
import ErrorComponent from './ErrorComponent';

function EditorWindowProd (props) {

    async function handleAddProd() {
        try{
            await API_prodsDash.create_prod();
            window.location.reload();
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleAddProf(){
        try{
            await API_prodsDash.create_prod_prof();
            window.location.reload();
        }
        catch(error){
            console.error(error);
        }
    };

    // Gestion des profs

    const [allProfs, setAllProfs] = useState([]);
    const [visibleProfEdit, setVisibleProfEdit] = useState(false);

    useEffect(() => {
        try {
            const getData = async () => {
                setAllProfs(await API_prodsDash.get_all_prof());
            }
            getData();
        }
        catch(error){
            console.error(error);
        }
    }, []);

    const header = (d) => {
        try {
            if (d.img !== null && d.img !== undefined && d.img !== "null"){
                return (
                    <img alt="Card" src={d.img} className='object-cover' />
                )
            }
            else {
                return (
                    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
                )
            }
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleDeleteProf (prof_id) {
        try{
            await API_prodsDash.remove_prod_prof(prof_id);
            window.location.reload();
        }
        catch(error){
            console.error(error);
        }
    };

    // Editor
    
    const [nameProf, setNameProf] = useState(null);
    const [subtitleProf, setSubtitleProf] = useState(null);
    const [descriptionProf, setDescriptionProf] = useState(null);
    const [imgProf, setImgProf] = useState(null);
    const [actifProf, setActifProf] = useState(false);
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const [selected, setSelected] = useState(null);

    function handleSetVisible(prof){
        try {
            setSelected(prof);
            setNameProf(prof.name);
            setSubtitleProf(prof.subtitle);
            setDescriptionProf(prof.description);
            setImgProf(prof.img);
            setActifProf(prof.actif);
            setVisibleProfEdit(true);
        }
        catch(error){
            console.error(error);
        }
    };

    const nameProfEdit = (
        <InputText value={nameProf} onChange={(e) => setNameProf(e.target.value)} />
    );

    const headerProfEdit = () => {
        try {
            if (selected !== null) {
                if (selected.img === 'null'){
                    return <img id="imgToDownloadProf" alt="Card" src={defaultImg} />
                }
                else {
                    return <img id="imgToDownloadProf" alt="Card" src={imgProf} className='object-cover' />
                }
            }
            else {
                return <img id="imgToDownloadProf" alt="Card" src={defaultImg} />
            }
        }
        catch(error){
            console.error(error);
        }
    };

    const emptyTemplate = () => {
        try {
            setImgProf(null);
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
        }
    };

    const onTemplateSelect = (e) => {
        try {
            let _totalSize = totalSize;
            let files = e.files;
            setImgProf(e.files[e.files.length - 1].objectURL);
    
    
            Object.keys(files).forEach((key) => {
                _totalSize += files[key].size || 0;
            });
    
            setTotalSize(_totalSize);
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleUpdateProf(){
        try {
            const dataUrl = await imageConverter.customBase64UploaderCanvas(document.getElementById("imgToDownloadProf"));
            await upload(dataUrl);
        } 
        catch (error) {
            console.error(error);
        }
    };

    async function upload(base64){
        try {
            const postData = async () => {
                await API_prodsDash.update_prod_prof(selected.prof_id, nameProf, subtitleProf, descriptionProf, base64, actifProf);
                window.location.reload();
            }
            postData();
        }
        catch(error){
            console.error(error);
        }
    }
    
    function isDashboardViewerUrl(url) {
        const regex = /.*\/dashboard\/viewer$/;
        return regex.test(url);
    };
    
    try {
        return (
            <div>
                {
                    isDashboardViewerUrl(window.top.location.href) ? (
                        <div className='relative'>
                            <Button className='m-5 z-10' label='Créer un dossier' severity='info' onClick={handleAddProd} />
                            <h2 className='text-sky-700 ml-2'>Dossiers existants</h2>
                            {props.children}
                            <Divider />
                            <Button className='m-5 z-10' label='Créer un document' severity='secondary' onClick={handleAddProf} />
                            <h2 className='text-green-700 ml-2'>Documents existants</h2>
                            <div className='grid grid-cols-5 gap-5 mx-5 relative'>
                                {
                                    allProfs.map((prof) => (
                                        <div key={prof.prof_id}>
                                            <p>{prof.prof_id}</p>
                                            <Button className='mb-5' severity='danger' label='Supprimer le document' onClick={() => handleDeleteProf(prof.prof_id)}></Button>
                                            <div className='is-editable mx-5 py-5'>
                                                <Card title={prof.name} header={() => header(prof)} className='cursor-pointer mx-10' onClick={() => handleSetVisible(prof)}>
                                                    <p></p>
                                                    <i className="pi pi-file" style={{ color: 'slateblue' }}></i>
                                                </Card>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <Dialog visible={visibleProfEdit} onHide={() => setVisibleProfEdit(false)}>
                                <Card title={nameProfEdit} header={headerProfEdit} className="m-10 h-[10%]">
                                    <InputText className='w-full card mt-5' value={subtitleProf} onChange={(e) => setSubtitleProf(e.target.value)} placeholder="Sous-titre de l'Prof" />
                                    {/*
                                    <InputTextarea className='w-full card mt-5' value={descriptionProf} onChange={(e) => setDescriptionProf(e.target.value)} rows={10} placeholder="Description de l'Prof" />
                                    */}
                                    {
                                        descriptionProf !== null ? (
                                            <div>
                                                <Editor value={descriptionProf.replaceAll('_GD_', '"').replaceAll('_GS_', "'")} onTextChange={(e) => setDescriptionProf(e.htmlValue)} style={{ height: '320px' }} />
                                            </div>
                                        ) :
                                        (
                                            <div>
                                                <Editor value={descriptionProf} onTextChange={(e) => setDescriptionProf(e.htmlValue)} style={{ height: '320px' }} /> 
                                            </div>
                                        )
                                    }
                                </Card>
    
                                <div>
                                    <Toast ref={toast}></Toast>
                                    <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                                </div>
                                <p>Rendre le document actif ?</p>
                                <InputSwitch checked={actifProf} onChange={(e) => setActifProf(e.value)} />
                                <Button label='Modifier' severity='success' onClick={handleUpdateProf}></Button>
                            </Dialog>
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

export default EditorWindowProd;