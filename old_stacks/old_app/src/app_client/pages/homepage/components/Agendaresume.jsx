
import { useState, useEffect, useRef } from 'react';
import './agendaresume.css';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { API_events } from '../../../services/api/eventsServices';
import { Tag } from 'primereact/tag';
import ErrorPage from '../../../../utils/error-page';

function Agendaresume () {

    const [data, setData] = useState(null);
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        try {
            const getData = async () => {
                try {
                    setData(await API_events.get_all());
                    var allTagsTemp = await API_events.get_all_tags();
                    allTagsTemp.push({ name: 'Aucun', tag_id: null });
                    setAllTags(allTagsTemp);
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

    const RenderTag = (props) => {
        try {
            if (allTags.length > 0){
                for (let i = 0; i < allTags.length; i++) {
                    if (allTags[i].tag_id === props.tagid) {
                        return (
                            <Tag value={allTags[i].name} style={{backgroundColor: '#' + allTags[i].color}} />
                        )
                    }
                }
            }
            else {
                return (
                    null
                )
            }
        }
        catch(error){
            console.error(error);
        }
    };

    const header = (d) => {
        try {
            if (d.img !== null && d.img !== undefined && d.img !== "null"){
                return (
                    <img alt="Card" src={d.img} />
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
        }
    };

    const actuTemplate = (d) => {
        return (
            <Card title={d.title} subTitle={d.subtitle} header={() => header(d)} className="m-10 cardagenda">
                <RenderTag tagid={d.tagid}/>
                <p>Débute le {d.startdate.split("T")[0]}</p>
                <p>Se termine le {d.enddate.split("T")[0]}</p>
            </Card>
        )
    };

    const responsiveOptions = [
        {
            breakpoint: '1468px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1100px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    try {
        return (
            <div className=''>
                {
                    data !== null ? (
                        <div>
                            <div className='grid place-items-center'>
                                <h2 className='title-acturesume'>Nos évenements</h2>
                            </div>
                            <Carousel value={data} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                                autoplayInterval={3000} itemTemplate={actuTemplate} />
                        </div>
                    ) :
                    (
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

export default Agendaresume;