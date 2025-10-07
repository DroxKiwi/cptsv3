
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

import { API_prodsDash } from '../services/api/prod/prodsServicesDash';

function EditorTagProd (props) {

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [allProfs, setAllProfs] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            setAllProfs(await API_prodsDash.get_all_prof());
        }
        getData();
    }, []);

    const header = () => {
        if (props.type === 'prod'){
            return (
                <div>
                    Modification dossier professionnel
                </div>
            )
        }
    };

    // Gestion article ------------------------------------------------------------------------------------------
    const [nameProd, setNameProd] = useState(null);
    const [imgProd, setImgProd] = useState(null);
    const [actifProd, setActifProd] = useState(false);
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);

    const onTemplateSelect = (e) => {
        try {
            let _totalSize = totalSize;
            let files = e.files;
            console.log(e.files);
            setImgProd(e.files[e.files.length - 1].objectURL);
    
    
            Object.keys(files).forEach((key) => {
                _totalSize += files[key].size || 0;
            });
    
            setTotalSize(_totalSize);
        }
        catch(error){
            console.error(error);
        }
    };

    async function handleUpdateProd(){
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
                await API_prodsDash.update_prod(selected.prod_id, target, nameProd, base64, actifProd);
                window.location.reload();
            }
            postData();
        }
        catch(error){
            console.error(error);
        }
    };

    const headerProdEdit = () => {
        try {
            if (selected !== null) {
                if (selected.img === 'null'){
                    return <img id="imgToDownload" alt="Card" src={defaultImg} />
                }
                else {
                    return <img id="imgToDownload" alt="Card" src={imgProd} />
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

    const nameProdEdit = (
        <InputText value={nameProd} onChange={(e) => setNameProd(e.target.value)} />
    )

    const emptyTemplate = () => {
        try {
            setImgProd(null);
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
                setSelected(await API_prodsDash.get_by_id(props.id));
            }
            getData();
            props.setDetailProdVisible(false);
        }
        catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            if (selected !== null){
                setNameProd(selected.name);
                setImgProd(selected.img);
                setActifProd(selected.actif);
                setVisible(true);
            }
        }
        catch(error){
            console.error(error);
        }
    }, [selected]);

    // Suppression d'un article

    async function handleRemoveProd(id){
        try{
            await API_prodsDash.remove_prod(id);
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
                var profsTemp = [];
                if (selected !== null){
                    if (selected.prof_ids.length > 0){
                        var tabProf_ids = selected.prof_ids.split(',');
                        for (let i = 0; i < tabProf_ids.length; i++){
                            profsTemp.push(await API_prodsDash.get_by_id_prof(tabProf_ids[i]));
                        }
                    }
                }
                var tempSource = [];
                var tempTarget = [];
                for (let i = 0; i < allProfs.length; i++){
                    var isInSource = false;
                    for (let j = 0; j < profsTemp.length; j++){
                        if (allProfs[i].prof_id === profsTemp[j].prof_id){
                            tempTarget.push(allProfs[i]);
                            isInSource = true;
                        }
                    }
                    if (!isInSource){
                        tempSource.push(allProfs[i]);
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
                    <span className="font-bold">{item.prof_id} - {item.name}</span>
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
                            <Button label='Supprimer le dossier' severity='danger' onClick={() => handleRemoveProd(props.id)}></Button>
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
                                        <Card title={nameProdEdit} header={headerProdEdit} className="m-10 h-[10%] bg-sky-200">
    
                                        </Card>
                                    </div>
    
                                    <div>
                                        <Toast ref={toast}></Toast>
                                        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                                    </div>
    
                                    <PickList className='mt-5' dataKey="prof_id" source={source} target={target} onChange={onChange} itemTemplate={itemTemplate} breakpoint="1280px"
                                        sourceHeader="Disponible" targetHeader="Affilié" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }} />
    
                                    <p>Rendre le dossier actif ?</p>
                                    <InputSwitch checked={actifProd} onChange={(e) => setActifProd(e.value)} />
    
                                    <Button label='Modifier' severity='success' onClick={handleUpdateProd}></Button>
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
        return <ErrorComponent error={error} />
    }
}

export default EditorTagProd;