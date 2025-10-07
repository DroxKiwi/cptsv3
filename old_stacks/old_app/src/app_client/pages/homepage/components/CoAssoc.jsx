
import { useState, useEffect, useRef } from 'react';
import './coassoc.css';
import { Carousel } from 'primereact/carousel';
import ErrorPage from '../../../../utils/error-page';
import { API_coassos } from '../../../services/api/coassosServices';

function CoAssoc (props) {

    const [coassoc, setCoassoc] = useState([]);
    const [tabImgCoassos, setTabImgCoassos] = useState([]);

    useEffect(() => {
        try{
            const getData = async () => {
                setCoassoc(await API_coassos.get_all());
            };
            getData();
        }
        catch(error){
            console.error(error);
        }
    }, []);

    useEffect(() => {
        var tabTemp = [];
        for (let i = 0; i < coassoc.length; i++) {
            tabTemp.push(coassoc[i].img);
        }
        setTabImgCoassos(tabTemp);
    }, [coassoc])

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        },
    ];

    
    const coassocTemplate = (coassoc) => {
        return (
            <div className='grid place-items-center imgcoassos'>
                <img src={coassoc}/>
            </div>
        );
    };

    try {
        return (
            <div className='z-10 relative'>
                {
                    tabImgCoassos !== null ? (
                        <div>
                            <h2 className='title-coassoc grid place-items-center'>Nos partenaires</h2>
                            <div className="">
                                <Carousel circular autoplayInterval={5000} value={tabImgCoassos} numVisible={1} numScroll={1} 
                                    responsiveOptions={responsiveOptions} itemTemplate={coassocTemplate} />
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default CoAssoc;