
import { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import './editortag.css';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from "primereact/inputswitch";
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import { Editor } from "primereact/editor";
import defaultImg from '../assets/Images/defaultimg.png';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { imageConverter } from '../../utils/imageConverter';

import ErrorComponent from './ErrorComponent';

import { API_tagsDash } from '../services/api/tags/tagsServicesDash';
import { API_eventsDash } from '../services/api/events/eventsServicesDash';

function EditorTagEvent (props) {

    // Gestion d'erreur à l'écran
    const toast = useRef(null);
    const triggerError = (error) => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: error.message, sticky: true });
    };
    // Gestion d'erreur à l'écran

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [startdate, setStartdate] = useState(null);
    const [enddate, setEnddate] = useState(null);

    const header = () => {
        if (props.type === 'event'){
            return (
                <div>
                    Modification Evenement
                </div>
            )
        }
    };

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

    // Gestion event ------------------------------------------------------------------------------------------
    const [nameEvent, setNameEvent] = useState(null);
    const [subtitleEvent, setSubtitleEvent] = useState(null);
    const [descriptionEvent, setDescriptionEvent] = useState(null);
    const [imgEvent, setImgEvent] = useState(null);
    const [tagEvent, setTagEvent] = useState(null);
    const [actifEvent, setActifEvent] = useState(false);
    const [totalSize, setTotalSize] = useState(0);
    const [tags, setTags] = useState([]);
    const [startdateEvent, setStartdateEvent] = useState(null);
    const [enddateEvent, setEnddateEvent] = useState(null);

    const onTemplateSelect = (e) => {
        try {
            console.log(e);
            let _totalSize = totalSize;
            let files = e.files;
            setImgEvent(e.files[e.files.length - 1].objectURL);
    
    
            Object.keys(files).forEach((key) => {
                _totalSize += files[key].size || 0;
            });
    
            setTotalSize(_totalSize);
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    const templateTag = (tag) => {
        try {
            if (tag !== null) {
                return (
                    <Tag value={tag.name} style={{backgroundColor: '#' + tag.color}} />
                )
            }
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    async function handleUpdateEvent(){
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
                await API_eventsDash.update_event(selected.event_id, nameEvent, subtitleEvent, descriptionEvent, base64, tagEvent, startdateEvent, enddateEvent, actifEvent);
                window.location.reload();
            }
            postData();
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    const headerEventEdit = () => {
        try {
            if (selected !== null) {
                if (selected.img === 'null'){
                    return <img id="imgToDownload" alt="Card" src={defaultImg} />
                }
                else {
                    return <img id="imgToDownload" alt="Card" className='object-cover' src={imgEvent} />
                }
            }
            else {
                return <img id="imgToDownload" alt="Card" src={defaultImg} />
            }
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    const nameEventEdit = (
        <InputText value={nameEvent} onChange={(e) => setNameEvent(e.target.value)} />
    )

    const emptyTemplate = () => {
        try {
            setImgEvent(null);
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
            triggerError(error);
            console.error(error);
        }
    };

    function handleSetVisible(){
        try {
            props.setDetailEventVisible(false);
            const getData = async () => {
                setSelected(await API_eventsDash.get_by_id(props.id));
            }
            getData();
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            if (selected !== null){
                console.log(selected);
                setNameEvent(selected.name);
                setSubtitleEvent(selected.subtitle);
                setDescriptionEvent(selected.description);
                setImgEvent(selected.img);
                setTagEvent(selected.tag);
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i].tag_id === selected.tagid){
                        setTagEvent(tags[i]);
                    }
                }
                setActifEvent(selected.actif);
                setVisible(true);
            }
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    }, [selected]);

    // Suppression d'un event

    async function handleRemoveEvent(id){
        try{
            await API_eventsDash.remove_event(id);
            window.location.reload();
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    // Gestion event ------------------------------------------------------------------------------------------

    // Gestion date

    useEffect(() => {
        var actualDate = new Date();
        setStartdate(actualDate);
        setEnddate(actualDate);
    }, [visible]);

    useEffect(() => {
        try {
            if (startdate !== null){
                var year = startdate.getFullYear();
                var month = startdate.getMonth() + 1;
                var day = startdate.getDate();
                var fullDate = year + '-' + month + '-' + day
                setStartdateEvent(fullDate);
            }
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    }, [startdate]);

    useEffect(() => {
        try {
            if (enddate !== null){
                var year = enddate.getFullYear();
                var month = enddate.getMonth() + 1;
                var day = enddate.getDate();
                var fullDate = year + '-' + month + '-' + day
                setEnddateEvent(fullDate);
            }
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    }, [enddate]);

    useEffect(() => {
        console.log(startdateEvent);
        console.log(enddateEvent);
    }, [startdateEvent]);

    // Gestion date
    
    function isDashboardViewerUrl(url) {
        const regex = /.*\/dashboard\/viewer$/;
        return regex.test(url);
    };

    try {
        return (
            <div>
                <Toast ref={toast}></Toast>
                {
                    isDashboardViewerUrl(window.top.location.href) ? (
                        <div>
                            <p className='id-editable'>{props.id}</p>
                            <Button label='Supprimer' severity='danger' onClick={() => handleRemoveEvent(props.id)}></Button>
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
                                        <Card title={nameEventEdit} header={headerEventEdit} className="m-10 h-[10%]">
                                            <Dropdown value={tagEvent} onChange={(e) => setTagEvent(e.value)} options={tags} optionLabel="name" 
                                                placeholder="Choisir un Tag" className="w-full md:w-14rem" itemTemplate={templateTag} valueTemplate={templateTag} />
                                            <InputText className='w-full card mt-5' value={subtitleEvent} onChange={(e) => setSubtitleEvent(e.target.value)} placeholder="Sous-titre de l'event" />
                                            <Calendar value={startdate} onChange={(e) => setStartdate(e.value)} showIcon dateFormat="dd/mm/yy" />
                                            <Calendar value={enddate} onChange={(e) => setEnddate(e.value)} showIcon dateFormat="dd/mm/yy" />
                                            {/*
                                            <InputTextarea className='w-full card mt-5' value={descriptionEvent} onChange={(e) => setDescriptionEvent(e.target.value)} rows={10} placeholder="Description de l'event" />
                                            */}
                                            {
                                                descriptionEvent !== null ? (
                                                    <div>
                                                        <Editor value={descriptionEvent.replaceAll('_GD_', '"').replaceAll('_GS_', "'")} onTextChange={(e) => setDescriptionEvent(e.htmlValue)} style={{ height: '320px' }} />
                                                    </div>
                                                ) :
                                                (
                                                    <div>
                                                        <Editor value={descriptionEvent} onTextChange={(e) => setDescriptionEvent(e.htmlValue)} style={{ height: '320px' }} /> 
                                                    </div>
                                                )
                                            }
                                        </Card>
                                    </div>
    
                                    <div>
                                        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                                    </div>
                                    <p>Rendre l'event actif ?</p>
                                    <InputSwitch checked={actifEvent} onChange={(e) => setActifEvent(e.value)} />
                                    <Button label='Modifier' severity='success' onClick={handleUpdateEvent}></Button>
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
        triggerError(error);
        console.error(error);
        return <ErrorComponent error={error} />
    }
}

export default EditorTagEvent;