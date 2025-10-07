import { useState, useEffect, useRef } from 'react';
//import pdsServ from "../services/projetdesante.json";
import pdsServ from "../../services/projetdesante.json";
import "./projetdesantebeta.css";

import Rollup1 from '../../assets/Images/rollups/rollup1.png';
import Rollupimg1rounded from '../../assets/Images/rollups/rollupimg1rounded.png';
import Rollup2 from '../../assets/Images/rollups/rollup2.png';
import Rollupimg2rounded from '../../assets/Images/rollups/rollupimg2rounded.png';
import Rollup3 from '../../assets/Images/rollups/rollup3.png';
import Rollupimg3rounded from '../../assets/Images/rollups/rollupimg3rounded.png';
import Rollup4 from '../../assets/Images/rollups/rollup4.png';
import Rollupimg4rounded from '../../assets/Images/rollups/rollupimg4rounded.png';
import Rollup5 from '../../assets/Images/rollups/rollup5.png';
import Rollupimg5rounded from '../../assets/Images/rollups/rollupimg5rounded.png';
import Rollup6 from '../../assets/Images/rollups/rollup6.png';
import Rollupimg6rounded from '../../assets/Images/rollups/rollupimg6rounded.png';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import Footer2 from '../../footer/Footer2';
import ErrorPage from '../../../utils/error-page';

import { ls, ss } from '../../../utils/store';

function ProjetDeSante (props) {
    
    useEffect(() => {
        ss.set('window', 'projetdesante');
    }, []);
  
    const [docHeight, setDocHeight] = useState(null);
    const [docWidth, setDocWidth] = useState(null);
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const [rollupSelection, setRollupSelection] = useState([]);
  
    useEffect(() => {
        setDocHeight(window.innerHeight + 500);
        setDocWidth(window.innerWidth - 10);
        setLoaded(true);
    }, [window.innerHeight]);

    useEffect(() => {
        var anchorPrj = ss.getFormated('anchorPrj');
        if (document.getElementById(anchorPrj) !== null){
            document.getElementById(anchorPrj).scrollIntoView();
        }
    }, [loaded]);

    useEffect(() => {
        setData(pdsServ);
        setRollupSelection([
            {
                base: Rollup1,
                img: Rollupimg1rounded,
                color: pdsServ.accordion[0].bgcolor
            },
            {
                base: Rollup2,
                img: Rollupimg2rounded,
                color: pdsServ.accordion[1].bgcolor
            },
            {
                base: Rollup3,
                img: Rollupimg3rounded,
                color: pdsServ.accordion[2].bgcolor 
            },
            {
                base: Rollup4,
                img: Rollupimg4rounded,
                color: pdsServ.accordion[3].bgcolor 
            },
            {
                base: Rollup5,
                img: Rollupimg5rounded,
                color: pdsServ.accordion[4].bgcolor 
            },
            {
                base: Rollup6,
                img: Rollupimg6rounded,
                color: pdsServ.accordion[5].bgcolor 
            }
        ]);
    }, []);

    const RenderItems = (props) => {
        try {
            return (
                <div className='w-full overflow-x-hidden'>
                    {
                        props.open === "true" ? (
                            <div className='rollup-lvl-0 active' id='firstel'>
                                <div className='rollup-lvl-0-0 absolute'>
                                    <img src={rollupSelection[props.it].base} className='rollup-lvl-0-0-item' width="300px" />
                                    <img src={rollupSelection[props.it].img} className='rollup-lvl-0-0-image absolute' width="80px" />
                                </div>
                                <div className={'rollup-lvl-0-1 absolute z-' + props.z}>
                                    <div className='rollup-lvl-0-1-item grid place-items-center w-full' style={{backgroundColor: rollupSelection[props.it].color}}>
                                        <div>
                                            {
                                                data.accordion.map((ia, i) => (
                                                    <div className='accru-lvl-0'>
                                                    {
                                                        i === props.it ? (
                                                            <div>
                                                                <span className='titleiacontent'>{ia.content}</span>
                                                                <div className='grid grid-cols-3 gridstartcolpjs'>
                                                                {
                                                                    ia.items.map((ib) => (
                                                                        <div class="cardpjs" style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                            <div className='contentaccordion' style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                                <p className='subtitleaccordion'>{ib.content}</p>
                                                                                <div style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                                    {
                                                                                        ib.items.map((ic) => (
                                                                                            <div className=''>
                                                                                                    <p className='md:text-base'>{ic.content}</p>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
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
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <div className='rollup-lvl-0 ' id={"notfirst-" + props.it}>
                                <div className='rollup-lvl-0-0 absolute'>
                                    <img src={rollupSelection[props.it].base} className='rollup-lvl-0-0-item' width="300px" />
                                    <img src={rollupSelection[props.it].img} className='rollup-lvl-0-0-image absolute' width="80px" />
                                </div>
                                <div className={'rollup-lvl-0-1 absolute z-' + props.z}>
                                    <div className='rollup-lvl-0-1-item grid place-items-center w-full' style={{backgroundColor: rollupSelection[props.it].color}}>
                                        <div>
                                            {
                                                data.accordion.map((ia, i) => (
                                                    <div className='accru-lvl-0'>
                                                    {
                                                        i === props.it ? (
                                                            <div>
                                                                <span className='titleiacontent'>{ia.content}</span>
                                                                <div className='grid grid-cols-3 gridstartcolpjs'>
                                                                {
                                                                    ia.items.map((ib) => (
                                                                        <div class="cardpjs" style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                            <div className='contentaccordion' style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                                <p className='subtitleaccordion'>{ib.content}</p>
                                                                                <div style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                                    {
                                                                                        ib.items.map((ic) => (
                                                                                            <div className=''>
                                                                                                    <p>{ic.content}</p>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
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
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            )
        }
        catch(error){
            return <ErrorPage error={error} />
        }
    };

    const RenderItemsMobile = (props) => {
        try {
            return (
                <div className='w-full overflow-x-hidden'>
                    <div className='rollup-lvl-0'>
                        <div className=''>
                            <img src={rollupSelection[props.it].base} className='rollup-lvl-0-0-item' width="300px" />
                        </div>
                        <div className={'z-' + props.z}>
                            <div className='grid place-items-center w-full rollup-lvl-0-0-content' style={{backgroundColor: rollupSelection[props.it].color}}>
                                <div>
                                    {
                                        data.accordion.map((ia, i) => (
                                            <div className=''>
                                            {
                                                i === props.it ? (
                                                    <div className='px-5 py-10'>
                                                        <p className='titleiacontent'>{ia.content}</p>
                                                        <div className=''>
                                                        {
                                                            ia.items.map((ib) => (
                                                                <div class="" style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                    <div className='contentaccordion' style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                        <p className='subtitleaccordion'>{ib.content}</p>
                                                                        <div style={{backgroundColor: ia.bgcolor, color: ia.color}}>
                                                                            {
                                                                                ib.items.map((ic) => (
                                                                                    <div className=''>
                                                                                            <p className='contentmobile'>{ic.content}</p>
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        catch(error){
            return <ErrorPage error={error} />
        }
    };

    useEffect(() => {
        try {
            const el = document.getElementById('firstel');

            for (let i = 1; i <= 5; i++){
                var elTemp = document.getElementById('notfirst-'+i);
                // Ajouter des écouteurs pour le survol
                elTemp.addEventListener('mouseenter', () => {
                    el.classList.remove('active'); // Ajouter la classe si le parent ou ses enfants sont survolés
                });
    
                elTemp.addEventListener('mouseleave', () => {
                    el.classList.add('active'); // Retirer la classe si la souris quitte le parent et ses enfants
                });
            }
        }
        catch(error){
            console.error(error);
        }
    }, [loaded]);

    try {
        if (window.innerWidth < 768){
            return (
                <div className='container-root'>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="274" viewBox="0 -70 1920 274" fill="none">
                    <path d="M1969.5 147.685C1997.68 176.5 2000 291.828 1969.5 270.5C1623.69 28.6873 55.3823 294.383 -147.5 91.5C-182 57 -105 -16.3691 -66.4998 4.18471C508.669 311.247 1824.41 -0.699097 1969.5 147.685Z" fill="#008CDD" fill-opacity="0.33"/>
                    </svg>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="487" viewBox="0 -70 1920 487" fill="none">
                    <path d="M2043.5 250C2050.57 289.677 2159.61 523.723 2129.1 502.396C1783.29 260.583 129.382 401.883 -73.4998 199C-108 164.5 -201.194 -137 -40.5 76C275.988 495.505 2010 62.0003 2043.5 250Z" fill="#008CDD" fill-opacity="0.33"/>
                    </svg>
                    <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
                    <div className='grid place-items-center card bg-transparent'>
                        <h2 className='text-3xl titlepage relative'>
                            Nos Projets / Missions
                        </h2>
                    </div>
                    <div className='grid grid-cols-1 gap-6 relative'>
                        <RenderItemsMobile it={0} z={0} />
                        <RenderItemsMobile it={1} z={1} />
                        <RenderItemsMobile it={2} z={2} />
                        <RenderItemsMobile it={3} z={3} />
                        <RenderItemsMobile it={4} z={4} />
                        <RenderItemsMobile it={5} z={5} />
                    </div>
                    <Footer2 />
                </div>
            )
        }
        else {
            return (
                <div className='container-root'>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="274" viewBox="0 -70 1920 274" fill="none">
                    <path d="M1969.5 147.685C1997.68 176.5 2000 291.828 1969.5 270.5C1623.69 28.6873 55.3823 294.383 -147.5 91.5C-182 57 -105 -16.3691 -66.4998 4.18471C508.669 311.247 1824.41 -0.699097 1969.5 147.685Z" fill="#008CDD" fill-opacity="0.33"/>
                    </svg>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="487" viewBox="0 -70 1920 487" fill="none">
                    <path d="M2043.5 250C2050.57 289.677 2159.61 523.723 2129.1 502.396C1783.29 260.583 129.382 401.883 -73.4998 199C-108 164.5 -201.194 -137 -40.5 76C275.988 495.505 2010 62.0003 2043.5 250Z" fill="#008CDD" fill-opacity="0.33"/>
                    </svg>
                    <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
                    <div className='grid place-items-center card bg-transparent'>
                        <h2 className='md:text-7xl titlepage relative'>
                            Nos Projets / Missions
                        </h2>
                    </div>
                    <div className='place-items-start'>
                        {
                            data !== null ? (
                                <div className='card bg-transparent flex flex-col-reverse'>
                                    <div className='card bg-transparent'>
                                        <p className='maintext'>
                                            {data.mainText}
                                        </p>
                                    </div>
                                    <div className='card bg-transparent my-10'>
                                        <RenderItems it={5} z='90' />
                                    </div>
                                    <div id='mo' className='card bg-transparent my-10'>
                                        <RenderItems it={4} z='90' />
                                    </div>
                                    <div id='par' className=' card bg-transparent my-10'>
                                        <RenderItems it={3} z='90' />
                                    </div>
                                    <div id='pre' className=' card bg-transparent my-10'>
                                        <RenderItems it={2} z='90' />
                                    </div>
                                    <div id='cs' className=' card bg-transparent my-10'>
                                        <RenderItems it={1} z='90' />
                                    </div>
                                    <div id='aus' className=' card bg-transparent my-10'>
                                        <RenderItems it={0} z='100' open="true" />
                                    </div>
                                </div>
                            ) : 
                            (
                                null
                            )
                        }
                    </div>
                    <Footer2 />
                </div>
            )
        }
    }
    catch(error){
        return <ErrorPage error={error} />
    };
}

export default ProjetDeSante;