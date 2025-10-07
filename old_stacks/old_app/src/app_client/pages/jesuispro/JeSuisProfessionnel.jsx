
import { useState, useEffect, useRef } from 'react';
import "../jesuispatient/jesuispatient.css";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { API_prods } from '../../services/api/prodsServices';
import EditorWindowProd from '../../../dashboard/tools/EditorWindowProd';
import EditorTagProd from '../../../dashboard/tools/EditorTagProd';
import Header from '../../header/Header';
import './jesuisprofessionnel.css';
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
    const [detailProdVisible, setDetailProdVisible] = useState(false);
    const [profs, setProfs] = useState([]);

    useEffect(() => {
        try {
            const getData = async () => {
                try {
                    setData(await API_prods.get_all());
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

    async function handleOpenProd(prof_ids){
        try {
            setDetailProdVisible(true);
            var profsTemp = [];
            if (prof_ids !== ""){
                var tabProf_ids = prof_ids.split(',');
                for (let i = 0; i < tabProf_ids.length; i++){
                    profsTemp.push(await API_prods.get_by_id_prof(tabProf_ids[i]));
                }
            }
            setProfs(profsTemp);
        }
        catch(error){
            console.error(error);
        }
    };

    // Gestion ouverture des profs

    const [visibleProf, setVisibleProf] = useState(false);
    const [selectedProf, setSelectedProf] = useState(null);

    async function handleVisibleProf(p) {
        setSelectedProf(p);
        setVisibleProf(true);
    };

    try {
        return (
            <div className='container-root'>
                <EditorWindowProd>
                <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
                <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="274" viewBox="0 -70 1920 274" fill="none">
                <path d="M1969.5 147.685C1997.68 176.5 2000 291.828 1969.5 270.5C1623.69 28.6873 55.3823 294.383 -147.5 91.5C-182 57 -105 -16.3691 -66.4998 4.18471C508.669 311.247 1824.41 -0.699097 1969.5 147.685Z" fill="#008CDD" fill-opacity="0.33"/>
                </svg>
                <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="487" viewBox="0 -70 1920 487" fill="none">
                <path d="M2043.5 250C2050.57 289.677 2159.61 523.723 2129.1 502.396C1783.29 260.583 129.382 401.883 -73.4998 199C-108 164.5 -201.194 -137 -40.5 76C275.988 495.505 2010 62.0003 2043.5 250Z" fill="#008CDD" fill-opacity="0.33"/>
                </svg>
                    <div className='overflow-x-hidden jsp grid place-items-center card' style={{width: docWidth + 10, height: docHeight - props.headerHeight}}>
                        <h2 className='titlepage relative md:text-7xl text-3xl'>
                            Les outils pour votre pratique
                        </h2>
    
                        { 
                            data !== null ? (
                                <div className='grid md:grid-cols-5 z-10'>
                                    {
                                        data.map((d) => (
                                            <EditorTagProd dataObject={d} id={d.prod_id} type="prod" setDetailProdVisible={setDetailProdVisible}>
                                                <Card onClick={() => handleOpenProd(d.prof_ids)} title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(d)} className="m-10 cursor-pointer bg-sky-200">
                                                    <p></p>
                                                    <i className="pi pi-folder-open" style={{ color: 'slateblue' }}></i>
                                                </Card>
                                            </EditorTagProd>
                                        ))
                                    }
                                </div>
                            ) :
                            (
                                null
                            )
                        }
                    </div>
                    <Dialog className='md:h-[90dvh] md:w-[80dvw]' visible={detailProdVisible} onHide={() => setDetailProdVisible(false)}>
                        <div className='grid md:grid-cols-6 gap-10'>
                            {
                                profs.map((d) => (
                                    <Card onClick={() => handleVisibleProf(d)} title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={header(d)} className="md:w-25rem cursor-pointer">
                                        <p></p>
                                    </Card>
                                ))
                            }
                        </div>
                    </Dialog>
    
                    <Dialog className='md:h-[80dvh] md:w-[70dvw]' visible={visibleProf} onHide={() => setVisibleProf(false)}>
                        {
                            selectedProf !== null ? (
                                <Card title={selectedProf.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} subTitle={selectedProf.subtitle.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(selectedProf)} className="m-10 h-[10%]">
                                    <div>
                                        {
                                            selectedProf.description.split("&lt;iframe")[1] !== undefined ? (
                                                <div>
                                                    <div dangerouslySetInnerHTML={{ __html: selectedProf.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>").split("&lt;iframe")[0] + selectedProf.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>").split("iframe&gt;")[1] }}></div>
                                                    <iframe width="560" height="315" src={selectedProf.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").split("iframe")[1].split('src="')[1].split('" title="')[0]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                                </div>
                                            ) :
                                            (
                                                <div dangerouslySetInnerHTML={{ __html: selectedProf.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>") }}></div>
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
                </EditorWindowProd>
                <Footer2 />
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default JeSuisProfessionnel;