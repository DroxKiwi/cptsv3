
import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { API_livretpagesDash } from '../services/api/livretpages/livretpagesServicesDash';
import { OrderList } from 'primereact/orderlist';
import './editortag.css';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { imageConverter } from '../../utils/imageConverter';
import ErrorComponent from './ErrorComponent';

function EditorWindowAdh (props) {

    const [livretpages, setLivretpages] = useState([]);
    const [livretpages_final, setLivretpages_final] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedLivretpage, setSelectedLivretpage] = useState(null);
    const [imgLivretpage, setImgLivretpage] = useState(null);
    const [totalSize, setTotalSize] = useState(0);

    const toast = useRef(null);
    const triggerError = (error) => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: error.message, sticky: true });
    };
    const showAdd = () => {
        toast.current.show({ severity: 'success', summary: 'Succès !', detail: 'Evenement ajouté' });
    };

    const showError = () => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: "Aucun tags de créé et d'actif !" });
    };

    const itemTemplate = (item) => {
        return (
            <div className="grid grid-cols-1 border-2 border-solid border-gray-300 rounded-md card">
                <img className="w-[20dvw] shadow-2 flex-shrink-0 border-round object-cover" src={item.img} alt={item.name} />
                <span className="font-bold text-900">{item.numero_page}</span>
                <div>
                    <Button label='Modifier' rounded raised text className='text-blue-500' onClick={() => handleEditLivretpage(item)}></Button>
                    <Button label='Supprimer' rounded raised text className='text-red-500' onClick={() => handleDeleteLivretpage(item)}></Button>
                </div>
            </div>
        );
    };

    function handleEditLivretpage(item) {
        setSelectedLivretpage(item);
        setVisible(true);
    };

    async function handleDeleteLivretpage(item) {
        try {
            const livretTemp = livretpages
            .filter(page => page.livret_pages_id !== item.livret_pages_id)
            .map((page, index) => ({
                livret_pages_id: page.livret_pages_id,
                numero_page: index + 1,
                img: page.img
            }));
            await API_livretpagesDash.remove_livretpage(item.livret_pages_id);
            for (let i = 0; i < livretTemp.length; i++) {
                await API_livretpagesDash.update_livretpage(livretTemp[i].livret_pages_id, livretTemp[i].numero_page, livretTemp[i].img);
            }
            window.location.reload();
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    async function handleDeleteAll(){
        try {
            for (let i = 0; i < livretpages_final.length; i++) {
                await API_livretpagesDash.remove_livretpage(livretpages_final[i].livret_pages_id);
            }
            window.location.reload();
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    }

    useEffect(() => {
        try {
            var livretTemp = [];
            for (let i = 0; i < livretpages.length; i++) {
                livretTemp.push(
                    {
                        'livret_pages_id': livretpages[i].livret_pages_id,
                        'numero_page': i+1,
                        'img': livretpages[i].img
                    }
                );
            }
            setLivretpages_final(livretTemp);
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    }, [livretpages]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                try {
                    setLivretpages(await API_livretpagesDash.get_all());
                }
                catch(error){
                    triggerError(error);
                    console.error(error);
                }
            }
            fetchData();
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    }, []);

    async function handleAddLivretpages() {
        try {
            await API_livretpagesDash.create_livretpage();
            showAdd();
            window.location.reload();
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

    async function handleSave() {
        try {
            for (let i = 0; i < livretpages_final.length; i++) {
                await API_livretpagesDash.update_livretpage(livretpages_final[i].livret_pages_id, livretpages_final[i].numero_page, livretpages_final[i].img);
            }
            showAdd();
            window.location.reload();
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    const emptyTemplate = () => {
        try {
            setImgLivretpage(null);
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

    const onTemplateSelect = (e) => {
        try {
            console.log(e);
            let _totalSize = totalSize;
            let files = e.files;
            setImgLivretpage(e.files[e.files.length - 1].objectURL);
    
    
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

    async function handleSaveNewImg() {
        try {
            console.log(selectedLivretpage.livret_pages_id);
            var livretTemp = [];
            for (let i = 0; i < livretpages.length; i++) {
                if (livretpages[i].livret_pages_id === selectedLivretpage.livret_pages_id) {
                    livretTemp.push(
                        {
                            'livret_pages_id': livretpages[i].livret_pages_id,
                            'numero_page': livretpages[i].numero_page,
                            'img': await imageConverter.customBase64UploaderCanvas(document.getElementById('imgToDownload'))
                        }
                    );
                }
                else {
                    livretTemp.push(
                        {
                            'livret_pages_id': livretpages[i].livret_pages_id,
                            'numero_page': livretpages[i].numero_page,
                            'img': livretpages[i].img
                        }
                    );
                }
            }
            setLivretpages_final(livretTemp);
            setLivretpages(livretTemp);
            setImgLivretpage(null);
            setVisible(false);
        }
        catch(error){
            triggerError(error);
            console.error(error);
        }
    };

    const items = document.querySelectorAll('.p-orderlist-item');
    items.forEach((item) => {
        item.scrollIntoView = () => {}; // Désactive scrollIntoView
    });    

    try {
        return (
            <div className=''>
                {
                    isDashboardViewerUrl(window.top.location.href) ? (
                        <div className='grid place-items-center'>
                            <Button className='m-5' label='Ajouter' severity='info' onClick={handleAddLivretpages} />
                            <Button className='m-5' label='Enregistrer' severity='success' onClick={handleSave} />
                            <Toast ref={toast}></Toast> 
                            <div className="card" style={{ overflow: 'hidden' }}>
                                <OrderList className="custom-orderlist" dragdrop dataKey="livret_pages_id" value={livretpages} onChange={(e) => setLivretpages(e.value)} itemTemplate={itemTemplate} header="Pages du livret" filterBy="number_pages"></OrderList>
                            </div>
                            <Button className='m-5' label='Supprimer TOUT' severity='danger' onClick={handleDeleteAll} />
                            <Dialog visible={visible} onHide={() => setVisible(false)} >
                                {
                                    selectedLivretpage !== null && selectedLivretpage !== undefined ? (
                                        <>
                                            {
                                                imgLivretpage !== null ? (
                                                    <img src={imgLivretpage} />
                                                ) : (
                                                    <img src={selectedLivretpage.img} />
                                                )
                                            }
                                        </>
                                    ) : (
                                        null
                                    )
                                }
                                <div>
                                    <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} emptyTemplate={emptyTemplate} onSelect={onTemplateSelect} />
                                </div>
                                <img id="imgToDownload" className='hidden' src={imgLivretpage} />
                                <Button label='Enregistrer' onClick={() => handleSaveNewImg()} />
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

export default EditorWindowAdh;