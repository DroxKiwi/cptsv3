
import './infoband.css';
import ErrorPage from '../../../../utils/error-page';

function InfoBand (props) {

    function handleClick(page) {
        window.location.replace(process.env.REACT_APP_BASE_APP_URI + page);
    } 

    try {
        return (
            <div className='mb-10 z-10'>
                <div className="infoband infoband1 px-5 md:w-[50dvw] md:h-[8dvh] w-[95dvw] h-[15dvh] grid place-items-center" onClick={() => handleClick("/jesuispatient")} >
                    <p className='infobandtext'>
                        Vous souhaitez connaître les professionnels de santé à proximité ? 
                    </p>
                </div>
                <div className="infoband infoband2 px-5 md:w-[50dvw] md:h-[8dvh] w-[95dvw] h-[15dvh] grid place-items-center" onClick={() => handleClick("/adherer")}>
                    <p className='infobandtext'>
                        Vous souhaitez adhérer ?
                    </p>
                </div>
                <div className="infoband infoband3 px-5 md:w-[50dvw] md:h-[8dvh] w-[95dvw] h-[15dvh] grid place-items-center" onClick={() => handleClick("/jesuisprofessionnel")}>
                    <p className='infobandtext'>
                        Vous êtes professionnels et souhaitez rejoindre la CPTS ?
                    </p>
                </div>
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error}/>
    }
}

export default InfoBand;