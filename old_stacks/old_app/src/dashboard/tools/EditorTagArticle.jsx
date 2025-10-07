
import { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import './editortag.css';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from "primereact/inputswitch";
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from "primereact/editor";
import defaultImg from '../assets/Images/defaultimg.png';
import { imageConverter } from '../../utils/imageConverter';
import { API_tagsDash } from '../services/api/tags/tagsServicesDash';
import { API_actualitesDash } from '../services/api/articles/actualitesServicesDash';
import ErrorComponent from './ErrorComponent';

function EditorTagArticle (props) {

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    const header = () => {
        if (props.type === 'article'){
            return (
                <div>
                    Modification Article
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
            console.error(error);
        }
    }, []);

    // Gestion article ------------------------------------------------------------------------------------------
    const [nameArticle, setNameArticle] = useState(null);
    const [subtitleArticle, setSubtitleArticle] = useState(null);
    const [descriptionArticle, setDescriptionArticle] = useState(null);
    const [imgArticle, setImgArticle] = useState(null);
    const [tagArticle, setTagArticle] = useState(null);
    const [actifArticle, setActifArticle] = useState(false);
    const [totalSize, setTotalSize] = useState(0);
    const [tags, setTags] = useState([]);
    const toast = useRef(null);

    const onTemplateSelect = (e) => {
        try {
            let _totalSize = totalSize;
            let files = e.files;
            setImgArticle(e.files[e.files.length - 1].objectURL);
    
    
            Object.keys(files).forEach((key) => {
                _totalSize += files[key].size || 0;
            });
    
            setTotalSize(_totalSize);
        }
        catch(error){
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
                await API_actualitesDash.update_article(selected.article_id, nameArticle, subtitleArticle, descriptionArticle, base64, tagArticle, actifArticle);
                window.location.reload();
            }
            postData();
        }
        catch(error){
            console.error(error);
        }
    };

    const headerArticleEdit = () => {
        try {
            if (selected !== null) {
                if (selected.img === 'null'){
                    return <img id="imgToDownload" alt="Card" src={defaultImg} />
                }
                else {
                    return <img id="imgToDownload" alt="Card" className='object-cover' src={imgArticle} />
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

    const nameArticleEdit = (
        <InputText value={nameArticle} onChange={(e) => setNameArticle(e.target.value)} />
    )

    const emptyTemplate = () => {
        try {
            setImgArticle(null);
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
                setSelected(await API_actualitesDash.get_by_id(props.id));
            }
            getData();
            props.setDetailArticleVisible(false);
        }
        catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            if (selected !== null){
                console.log(selected);
                setNameArticle(selected.name);
                setSubtitleArticle(selected.subtitle);
                setDescriptionArticle(selected.description);
                setImgArticle(selected.img);
                setTagArticle(selected.tag);
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i].tag_id === selected.tagid){
                        setTagArticle(tags[i]);
                    }
                }
                setActifArticle(selected.actif);
                setVisible(true);
            }
        }
        catch(error){
            console.error(error);
        }
    }, [selected]);

    // Suppression d'un article

    async function handleRemoveArticle(id){
        try{
            await API_actualitesDash.remove_article(id);
            window.location.reload();
        }
        catch(error){
            console.error(error);
        }
    };

    function isDashboardViewerUrl(url) {
        const regex = /.*\/dashboard\/viewer$/;
        return regex.test(url);
    };

    // Gestion article ------------------------------------------------------------------------------------------

    try {
        return (
            <div>
                {
                    isDashboardViewerUrl(window.top.location.href) ? (
                        <div>
                            <p className='id-editable'>{props.id}</p>
                            <Button label='Supprimer' severity='danger' onClick={() => handleRemoveArticle(props.id)}></Button>
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
                                        <Card title={nameArticleEdit} header={headerArticleEdit} className="m-10 h-[10%]">
                                            <Dropdown value={tagArticle} onChange={(e) => setTagArticle(e.value)} options={tags} optionLabel="name" 
                                                placeholder="Choisir un Tag" className="w-full md:w-14rem" itemTemplate={templateTag} valueTemplate={templateTag} />
                                            <InputText className='w-full card mt-5' value={subtitleArticle} onChange={(e) => setSubtitleArticle(e.target.value)} placeholder="Sous-titre de l'article" />
                                            {/*
                                            <InputTextarea className='w-full card mt-5' value={descriptionArticle} onChange={(e) => setDescriptionArticle(e.target.value)} rows={10} placeholder="Description de l'article" />
                                            */}
                                            {
                                                descriptionArticle !== null ? (
                                                    <div>
                                                        <Editor value={descriptionArticle.replaceAll('_GD_', '"').replaceAll('_GS_', "'")} onTextChange={(e) => setDescriptionArticle(e.htmlValue)} style={{ height: '320px' }} />
                                                    </div>
                                                ) :
                                                (
                                                    <div>
                                                        <Editor value={descriptionArticle} onTextChange={(e) => setDescriptionArticle(e.htmlValue)} style={{ height: '320px' }} /> 
                                                    </div>
                                                )
                                            }
                                        </Card>
                                    </div>
    
                                    <div>
                                        <Toast ref={toast}></Toast>
                                        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                                    </div>
                                    <p>Rendre l'article actif ?</p>
                                    <InputSwitch checked={actifArticle} onChange={(e) => setActifArticle(e.value)} />
                                    <Button label='Modifier' severity='success' onClick={handleUpdateArticle}></Button>
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

export default EditorTagArticle;