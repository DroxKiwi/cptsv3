
import { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import './editortag.css';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from "primereact/inputswitch";
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { PickList } from 'primereact/picklist';
import defaultImg from '../assets/Images/defaultimg.png';
import { imageConverter } from '../../utils/imageConverter';
import ErrorComponent from './ErrorComponent';

import { API_patdsDash } from '../services/api/patd/patdsServicesDash';

function EditorTagPatd (props) {

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [allPatfs, setAllPatfs] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            setAllPatfs(await API_patdsDash.get_all_patf());
        }
        getData();
    }, []);

    const header = () => {
        if (props.type === 'prod'){
            return (
                <div>
                    Modification dossier patient
                </div>
            )
        }
    };

    // Gestion article ------------------------------------------------------------------------------------------
    const [namePatd, setNamePatd] = useState(null);
    const [imgPatd, setImgPatd] = useState(null);
    const [actifPatd, setActifPatd] = useState(false);
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);

    const onTemplateSelect = (e) => {
        try {
            let _totalSize = totalSize;
            let files = e.files;
            console.log(e.files);
            setImgPatd(e.files[e.files.length - 1].objectURL);
    
    
            Object.keys(files).forEach((key) => {
                _totalSize += files[key].size || 0;
            });
    
            setTotalSize(_totalSize);
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleUpdatePatd(){
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
                await API_patdsDash.update_patd(selected.patd_id, target, namePatd, base64, actifPatd);
                window.location.reload();
            }
            postData();
        }
        catch(error){
            console.error(error);
        }
    }

    const headerPatdEdit = () => {
        try {
            if (selected !== null) {
                if (selected.img === 'null'){
                    return <img id="imgToDownload" alt="Card" src={defaultImg} />
                }
                else {
                    return <img id="imgToDownload" alt="Card" src={imgPatd} className='object-cover' />
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

    const namePatdEdit = (
        <InputText value={namePatd} onChange={(e) => setNamePatd(e.target.value)} />
    )

    const emptyTemplate = () => {
        try {
            setImgPatd(null);
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
                setSelected(await API_patdsDash.get_by_id(props.id));
            }
            getData();
            props.setDetailPatdVisible(false);
        }
        catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            if (selected !== null){
                setNamePatd(selected.name);
                setImgPatd(selected.img);
                setActifPatd(selected.actif);
                setVisible(true);
            }
        }
        catch(error){
            console.error(error);
        }
    }, [selected]);

    // Suppression d'un article

    async function handleRemovePatd(id){
        try{
            console.log(id);
            await API_patdsDash.remove_patd(id);
            window.location.reload();
        }
        catch(error){
            console.error(error);
        }
    };

    // Gestion prod ------------------------------------------------------------------------------------------

    // Gestion prof

    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                var patfsTemp = [];
                if (selected !== null){
                    if (selected.patf_ids.length > 0){
                        var tabpatf_ids = selected.patf_ids.split(',');
                        for (let i = 0; i < tabpatf_ids.length; i++){
                            patfsTemp.push(await API_patdsDash.get_by_id_patf(tabpatf_ids[i]));
                        }
                    }
                }
                var tempSource = [];
                var tempTarget = [];
                for (let i = 0; i < allPatfs.length; i++){
                    var isInSource = false;
                    for (let j = 0; j < patfsTemp.length; j++){
                        if (allPatfs[i].patf_id === patfsTemp[j].patf_id){
                            tempTarget.push(allPatfs[i]);
                            isInSource = true;
                        }
                    }
                    if (!isInSource){
                        tempSource.push(allPatfs[i]);
                    }
                }
                console.log(tempSource);
                console.log(tempTarget);
                setSource(tempSource);
                setTarget(tempTarget);
            }
            catch(error) {
                console.error(error);
            }
        }
        getData();
    }, [selected]);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3 picklist-selectable">
                <img className="w-[150px] flex-shrink-0 border-round" src={item.img} alt={item.name} />
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.patf_id} - {item.name}</span>
                </div>
            </div>
        );
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
                        <div className='mx-5'>
                            <p>{props.id}</p>
                            <Button label='Supprimer le dossier' severity='danger' onClick={() => handleRemovePatd(props.id)}></Button>
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
                                        <Card title={namePatdEdit} header={headerPatdEdit} className="m-10 h-[10%] bg-sky-200">
    
                                        </Card>
                                    </div>
    
                                    <div>
                                        <Toast ref={toast}></Toast>
                                        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                                    </div>
    
                                    <PickList className='mt-5' dataKey="patf_id" source={source} target={target} onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
                                        sourceHeader="Disponible" targetHeader="Affilié" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} />
    
                                    <p>Rendre le dossier actif ?</p>
                                    <InputSwitch checked={actifPatd} onChange={(e) => setActifPatd(e.value)} />
    
                                    <Button label='Modifier' severity='success' onClick={handleUpdatePatd}></Button>
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
    catch(error) {
        return <ErrorComponent error={error} />;
    }
}

export default EditorTagPatd;