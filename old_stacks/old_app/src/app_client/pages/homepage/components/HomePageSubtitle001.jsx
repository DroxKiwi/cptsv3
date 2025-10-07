
import { useEffect, useState } from 'react';
import './homepagesubtitle001.css';
import { API_global } from '../../../services/api/globalServices';


function HomePageSubtitle001 (props) {

    const [globalData, setGlobalData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setGlobalData(await API_global.get_all());
        }
        getData();
    }, []);

    const [elDistanceTop, setElDistanceTop] = useState(null);

    useEffect(() => {
        if (window.innerWidth > 1700){
            setElDistanceTop(props.docHeight - 500);

        }
        else {
            setElDistanceTop(props.docHeight - 400);
        }
    }, [props.docHeight]);

    try {
        if (props.mobile){
            return (
                <div id="" className='grid place-items-center overflow-y-hidden mt-10'>
                </div>
            )
        }
        else {
            return (
                <div id="" className='overflow-y-hidden grid place-items-center'>
                    <h2 className="homepagesubtitle001">
                        Notre projet de santé
                    </h2>
                    <div className='grid place-items-center'>
                        <p className='homepagesubtitle001secondary'>Retrouvez la déclinaison de notre projet de santé en fonction des missions.</p>
                        {
                            globalData !== null ? (
                                <p className='homepagesubtitle001secondarymobile w-[70dvw]'>{globalData[0].hommepageprjstext.replaceAll('_GD_', '"').replaceAll("_GS_", "'")}</p>
                            ) :
                            (
                                null
                            )
                        }
                    </div>
                </div>
            )
        }
    }
    catch(error){
        return (
            null
        )
    }
}

export default HomePageSubtitle001;