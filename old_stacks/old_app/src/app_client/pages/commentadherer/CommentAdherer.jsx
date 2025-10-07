

import { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Galleria } from 'primereact/galleria';
import './commentadherer.css';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import iconehand from '../../assets/Images/icones/cliquez-sur.png';
import EditorWindowAdh from '../../../dashboard/tools/EditorWindowAdh';
import ErrorPage from '../../../utils/error-page';
import { API_livretpages } from '../../services/api/livretpagesServices';
import MergeImagesToPDF from './MergeImagesToPDF';
import Footer2 from '../../footer/Footer2';

import ButtonAbs from '../homepage/components/ButtonAbs';

function CommentAdherer(props) {

    const [visible, setVisible] = useState(false);
    const [images, setImages] = useState([]);

    const [livretpages, setLivretpages] = useState([]);
    
    useEffect(() => {
        try {
            const getData = async () => {
                setLivretpages(await API_livretpages.get_all());
            };
            getData();
        }
        catch(error){
            console.error(error);
        }
    }, []);

    useEffect(() => {
        try {
            var imagesTemp = [];
            for (let i = 1; i < livretpages.length; i++) {
                imagesTemp.push({
                    itemImageSrc: livretpages[i].img,
                });
            }
            setImages(imagesTemp);
        }
        catch(error) {
            console.error(error);
        }
    }, [livretpages]);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} style={{ width: '100%', display: 'block' }} />;
    };
    
    const indicatorTemplate = (index) => {
        return <div className='btn-index' style={{cursor: 'pointer'}}>{index + 1}</div>
    };

    try {
        return (
            <div className='container-root'>
                <EditorWindowAdh>
                <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />        
                <div className='grid place-items-center card bg-transparent z-10'>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 257" fill="none">
                    <path d="M1999.5 29C2223.5 284.5 2312.5 382.5 2024 153C1725.95 -84.0969 -100.5 487.002 -184 212.502C-207.762 134.386 -405.541 29.802 -184 134.002C406 411.502 1862.69 -127.051 1999.5 29Z" fill="#F74924" fill-opacity="0.33"/>
                    </svg>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                    <path d="M2006 24.5001C2108.97 129.168 2248.83 416.111 1956.5 245C1499.5 -22.5 -159.629 596.5 -239.468 232C-259.52 140.453 -444.877 80.6212 -239.467 213.832C172.5 481 1860.46 -123.444 2006 24.5001Z" fill="#F74924" fill-opacity="0.33"/>
                    </svg>
                    <h2 className='titlepage relative md:text-7xl text-3xl'>
                        Livret de la CPTS des Mauges
                    </h2>
                    <div class="container w-[200px] h-[270px] md:w-[400px] md:h-[550px] z-10" onClick={() => setVisible(true)}>
                        <div class="book w-[200px] h-[270px] md:w-[400px] md:h-[550px]">
                            <div class="front w-[200px] h-[270px] md:w-[400px] md:h-[550px]">
                                <div class="cover w-[200px] h-[270px] md:w-[400px] md:h-[550px]">
                                    {
                                        images.length > 0 ? (
                                            <img src={livretpages[0].img} alt="" className="md:w-[97%] w-[95%]"/>
                                        ) :
                                        (
                                            null
                                        )
                                    }
                                </div>
                            </div>
                            <div class="left-side md:h-[550px] h-[270px]">
                                <h2 className='md:w-[500px] w-[200px]'>
                                    <span>CPTS des Mauges</span>
                                    <span>2024</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className='grid place-items-center mt-[50px]'>
                        <img src={iconehand} width="50px" />
                        <p className='comicsansms'>Cliquez sur le livret pour l'ouvrir</p>
                        <ButtonAbs selected={'redirectAdh'} />
                    </div>

                    {
                        images !== null ? (
                            <Dialog visible={visible} onHide={() => setVisible(false)} >
                                <div className=''>
                                    <MergeImagesToPDF />
                                    <Galleria
                                        value={images}
                                        style={{ maxWidth: '640px' }}
                                        showThumbnails={false}
                                        showIndicators
                                        changeItemOnIndicatorHover
                                        showIndicatorsOnItem
                                        indicatorsPosition="bottom"
                                        item={itemTemplate}
                                        indicator={indicatorTemplate}
                                    />
                                </div>
                            </Dialog>
                        ) : 
                        (
                            null
                        )
                    }
                </div>
                <Footer2 />
                </EditorWindowAdh>
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default CommentAdherer;