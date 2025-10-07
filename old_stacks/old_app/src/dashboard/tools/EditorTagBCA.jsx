
import { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import './editortag.css';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Editor } from "primereact/editor";
import defaultImg from '../assets/Images/defaultimg.png';
import { imageConverter } from '../../utils/imageConverter';

import ErrorComponent from './ErrorComponent';

import { API_orgasDash } from '../services/api/orgas/orgasServicesDash';

function EditorTagBCA (props) {

    // Gestion d'erreur à l'écran

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    const header = () => {
        if (props.type === 'event'){
            return (
                <div>
                    Modification Evenement
                </div>
            )
        }
    };

    // Gestion event ------------------------------------------------------------------------------------------
    const [nameOrga, setNameOrga] = useState(null);
    const [imgOrga, setImgOrga] = useState(null);
    const [roleOrga, setRoleOrga] = useState(null);
    const [descriptionOrga, setdescriptionOrga] = useState(null);
    const [totalSize, setTotalSize] = useState(0);

    const onTemplateSelect = (e) => {
        try {
            console.log(e);
            let _totalSize = totalSize;
            let files = e.files;
            setImgOrga(e.files[e.files.length - 1].objectURL);
    
    
            Object.keys(files).forEach((key) => {
                _totalSize += files[key].size || 0;
            });
    
            setTotalSize(_totalSize);
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleUpdateOrga() {
        try {
            const dataUrl = await imageConverter.customBase64UploaderCanvas(document.getElementById("imgToDownload"));
            await upload(dataUrl);
        } 
        catch (error) {
            console.error(error);
        }
    }
        
    async function upload(base64) {
        try {
            await API_orgasDash.update_orga(
                selected.orga_id,
                nameOrga,
                base64,
                roleOrga,
                descriptionOrga
            );
            window.location.reload();
            // Mets à jour ton état local ici au lieu de recharger toute la page
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    const headerOrgaEdit = () => {
        try {
            if (selected !== null) {
                if (selected.img === 'null'){
                    return <img id="imgToDownload" alt="Card" src={defaultImg} />
                }
                else {
                    return <img id="imgToDownload" alt="Card" className='object-cover' src={imgOrga} />
                }
            }
            else {
                return <img id="imgToDownload" alt="Card" src={defaultImg} />
            }
        }
        catch(error){
            console.error(error);
        }
    };

    const nameOrgaEdit = (
        <>
            {
                nameOrga !== null && nameOrga !== undefined ? (
                    <InputText value={nameOrga.replaceAll('_GD_', '"').replaceAll('_GS_', "'")} onChange={(e) => setNameOrga(e.target.value)} />
                ) :
                (
                    null
                )
            }
        </>
    )

    const emptyTemplate = () => {
        try {
            setImgOrga(null);
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

    function handleSetVisible(){
        try {
            const getData = async () => {
                setSelected(await API_orgasDash.get_by_id(props.id));
            }
            getData();
        }
        catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            if (selected !== null){
                setNameOrga(selected.name);
                setImgOrga(selected.img);
                setRoleOrga(selected.role);
                setdescriptionOrga(selected.description);
                setVisible(true);
            }
        }
        catch(error){
            console.error(error);
        }
    }, [selected]);

    // Suppression d'un event

    async function handleRemoveOrga(id){
        try{
            await API_orgasDash.remove_orga(id);
            window.location.reload();
        }
        catch(error){
            console.error(error);
        }
    };

    // Gestion date
    
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
                            <p className='id-editable'>{props.id}</p>
                            <Button label='Supprimer' severity='danger' onClick={() => handleRemoveOrga(props.id)}></Button>
                            <div className='is-editable' onClick={() => handleSetVisible()}>
                                {props.children}
                            </div>
                        </div>
                    ) :
                    (
                        <>
                            {props.children}
                        </>
                    )
                }
    
                <Dialog maximizable header={header} visible={visible} onHide={() => setVisible(false)}>
                    {
                        selected !== null ? (
                            <div className='card'>
                                <div className='card grid-cols-3'>
                                    <div>
                                        <Card title={nameOrgaEdit} header={headerOrgaEdit} className="m-10 h-[10%]">
                                            <InputText value={roleOrga} onChange={(e) => setRoleOrga(e.target.value)} />
                                            {
                                                descriptionOrga !== null || descriptionOrga !== undefined ? (
                                                    <div>
                                                        <Editor value={descriptionOrga.replaceAll('_GD_', '"').replaceAll('_GS_', "'")} onTextChange={(e) => setdescriptionOrga(e.htmlValue)} style={{ height: '320px' }} />
                                                    </div>
                                                ) :
                                                (
                                                    <div>
                                                        <Editor value={descriptionOrga} onTextChange={(e) => setdescriptionOrga(e.htmlValue)} style={{ height: '320px' }} /> 
                                                    </div>
                                                )
                                            }
                                        </Card>
                                    </div>
    
                                    <div>
                                        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                                    </div>
                                    <Button className='mt-10' label='Modifier' severity='success' onClick={handleUpdateOrga}></Button>
                                </div>
                            </div>
                        ) : 
                        (
                            null
                        )
                    }
                </Dialog>
            </div>
        )
    }
    catch(error){
        console.error(error);
        return <ErrorComponent error={error} />
    }
}

export default EditorTagBCA;