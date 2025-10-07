
import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from "primereact/inputswitch";
import { Card } from 'primereact/card';
import { FileUpload } from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { API_tagsDash } from '../services/api/tags/tagsServicesDash';
import { Dropdown } from 'primereact/dropdown';
import { API_actualitesDash } from '../services/api/articles/actualitesServicesDash';

function AddArticle () {
    
    const [nameArticle, setNameArticle] = useState(null);
    const [imgArticle, setImgArticle] = useState(null);
    const [tagArticle, setTagArticle] = useState(null);
    const [actifArticle, setActifArticle] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const [tags, setTags] = useState([]);

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
    }

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

    async function handleUpload(){
        try {
            customBase64UploaderCanvas(
                (dataUrl) => {
                    console.log(dataUrl);
                    upload(dataUrl);
                }
            );
        }
        catch(error){
            console.error(error);
        }
    };

    async function upload(base64){
        try {
            const postData = async () => {
                await API_actualitesDash.create_article(nameArticle, base64, tagArticle, actifArticle); 
            }
            postData();
            showAdd();
            setNameArticle(null);
            setImgArticle(null);
            setTagArticle(null);
        }
        catch(error){
            console.error(error);
        }
    };

    const showAdd = () => {
        toast.current.show({ severity: 'success', summary: 'Succès !', detail: 'Article ajouté' });
    };

    const customBase64UploaderCanvas = async (callback) => {
        try {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var dataURL;
            var imageFromTag = document.getElementById('imgToDownload');
            ctx.drawImage(imageFromTag, 0, 0);
            //createImageBitmap(this).then(imageBitmap=>{ctx.drawImage(imageBitmap,0,0)});
            canvas.toBlob(function() {        // get content as JPEG blob
                // here the image is a blob
            }, "image/png", 0.75);
            dataURL = canvas.toDataURL();
            callback(dataURL);
        }
        catch(error){
            console.error(error);
        }
    };

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

    const headerArticleEdit = () => {
        try {
            if (imgArticle !== null){
                return <img id="imgToDownload" className='w-[500px] h-[300px]' alt="Card" src={imgArticle} /> 
            }
            else {
                return <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
            }
        }
        catch(error){
            console.error(error);
        }
    };

    const nameArticleEdit = (
        <InputText className='w-full' placeholder="Choisir un nom d'article" value={nameArticle} onChange={(e) => setNameArticle(e.target.value)} />
    );

    return (
        <div className='grid place-items-center'>
            <div className='card grid-cols-3'>
                <div>
                    <Card title={nameArticleEdit} header={headerArticleEdit} className="m-10 h-[10%]">
                        <Dropdown value={tagArticle} onChange={(e) => setTagArticle(e.value)} options={tags} optionLabel="name" 
                            placeholder="Choisir un Tag" className="w-full md:w-14rem" itemTemplate={templateTag} valueTemplate={templateTag} />
                    </Card>
                </div>

                <div>
                    <Toast ref={toast}></Toast>
                    <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                </div>
                <p>Rendre l'article actif ?</p>
                <InputSwitch checked={actifArticle} onChange={(e) => setActifArticle(e.value)} />
                <Button label='Ajouter' severity='success' onClick={handleUpload}></Button>
            </div>
        </div>
    )
}

export default AddArticle;