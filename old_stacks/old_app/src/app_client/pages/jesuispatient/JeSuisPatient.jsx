
import { useState, useEffect, useRef } from 'react';
import "../jesuispatient/jesuispatient.css";
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { API_patds } from '../../services/api/patdsServices';
import EditorTagPatd from '../../../dashboard/tools/EditorTagPatd';
import EditorWindowPatd from '../../../dashboard/tools/EditorWindowPatd';
import Header from '../../header/Header';
import './jesuispatient.css';
import Footer from '../../footer/Footer';
import ErrorPage from '../../../utils/error-page';
import Footer2 from '../../footer/Footer2';


import { ls, ss } from '../../../utils/store';

function JeSuisProfessionnel (props) {

    useEffect(() => {
        ss.set('window', 'jesuispatient');
    }, []);

    const [docHeight, setDocHeight] = useState(null);
    const [docWidth, setDocWidth] = useState(null);
    const [data, setData] = useState(null);
    const [detailPatdVisible, setDetailPatdVisible] = useState(false);
    const [patfs, setPatfs] = useState([]);

    useEffect(() => {
        try {
            const getData = async () => {
                try {
                    setData(await API_patds.get_all());
                }
                catch(error){
                    console.error(error);
                }
            }
            getData();   
        }
        catch(error){
            console.error(error);
        }
    }, []);
      
    useEffect(() => {
        setDocHeight(window.innerHeight);
        setDocWidth(window.innerWidth - 10);
    }, [window.innerHeight]);

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
            return <ErrorPage error={error} />
        }
    };

    async function handleOpenPatd(patf_ids){
        try {
            setDetailPatdVisible(true);
            var patfsTemp = [];
            if (patf_ids !== ""){
                var tabpatf_ids = patf_ids.split(',');
                for (let i = 0; i < tabpatf_ids.length; i++){
                    patfsTemp.push(await API_patds.get_by_id_patf(tabpatf_ids[i]));
                }
            }
            setPatfs(patfsTemp);
        }
        catch(error){
            console.error(error);
        }
    };

    // Gestion ouverture des patfs

    const [visiblePatf, setVisiblePatf] = useState(false);
    const [selectedPatf, setSelectedPatf] = useState(null);

    async function handlevisiblePatf(p) {
        setSelectedPatf(p);
        setVisiblePatf(true);
    };

    try {
        return (
            <div className='container-root'>
                <EditorWindowPatd>
                <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
                <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                <path d="M2003.5 42.5C2290 335.5 2322.89 291.534 1968 119C1588.5 -65.5 -77 549 -160.5 274.5C-184.262 196.384 -249 -79.0003 -57 23.4997C518.171 330.558 1858.41 -105.884 2003.5 42.5Z" fill="#8DC943" fill-opacity="0.33"/>
                </svg>
                <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                <path d="M1999.5 28.4999C2286 321.5 2324.39 307.534 1969.5 135C1590 -49.5 -63.9998 515 -147.5 240.5C-171.262 162.385 -254.5 -15.4999 -62.5 87.0001C512.671 394.058 1854.41 -119.884 1999.5 28.4999Z" fill="#8DC943" fill-opacity="0.33"/>
                </svg>
                <div className='grid place-items-center card bg-transparent'>
                    <h2 className='titlepage relative md:text-7xl text-3xl'>
                        Informez vous à l'aide de nos documents
                    </h2>
                    <div className='grid place-items-center'>
    
    
                        { 
                            data !== null ? (
                                <div className='z-10'>
                                    <div className='grid md:grid-cols-5'>
                                        {
                                            data.map((d) => (
                                                <EditorTagPatd dataObject={d} id={d.patd_id} type="prod" setDetailPatdVisible={setDetailPatdVisible}>
                                                    <Card onClick={() => handleOpenPatd(d.patf_ids)} title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(d)} className="m-10 cursor-pointer bg-sky-200">
                                                        <p></p>
                                                        <i className="pi pi-folder-open" style={{ color: 'slateblue' }}></i>
                                                    </Card>
                                                </EditorTagPatd>
                                            ))
                                        }
                                    </div>
                                </div>
                            ) :
                            (
                                null
                            )
                        }
                    </div>
                </div>
                <Dialog className='md:h-[90dvh] md:after:w-[80dvw]' visible={detailPatdVisible} onHide={() => setDetailPatdVisible(false)}>
                    <div className='grid md:grid-cols-6 gap-10'>
                        {
                            patfs.map((d) => (
                                <Card onClick={() => handlevisiblePatf(d)} title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={header(d)} className="md:w-25rem cursor-pointer">
                                    <p></p>
                                </Card>
                            ))
                        }
                    </div>
                </Dialog>
    
                <Dialog className='md:h-[80dvh] md:w-[70dvw]' visible={visiblePatf} onHide={() => setVisiblePatf(false)}>
                    {
                        selectedPatf !== null ? (
                            <Card title={selectedPatf.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} subTitle={selectedPatf.subtitle.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(selectedPatf)} className="m-10 h-[10%]">
                                <div>
                                    {
                                        selectedPatf.description.split("&lt;iframe")[1] !== undefined ? (
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: selectedPatf.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>").split("&lt;iframe")[0] + selectedPatf.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>").split("iframe&gt;")[1] }}></div>
                                                <iframe width="560" height="315" src={selectedPatf.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").split("iframe")[1].split('src="')[1].split('" title="')[0]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                            </div>
                                        ) :
                                        (
                                            <div dangerouslySetInnerHTML={{ __html: selectedPatf.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>") }}></div>
                                        )
                                    }
                                </div>
                            </Card>
                        ) :
                        (
                            null
                        )
                    }
                </Dialog>
                </EditorWindowPatd>
                <Footer2 />
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default JeSuisProfessionnel;