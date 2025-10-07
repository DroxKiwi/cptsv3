
import './cardsproject.css';
import mo from '../../../assets/Images/background_circle/missionoptionnelles.png';
import par from '../../../assets/Images/background_circle/parcours.png'
import crise from '../../../assets/Images/background_circle/crisesanitaire.png'
import sp from '../../../assets/Images/background_circle/prevention.png'
import as from '../../../assets/Images/background_circle/accesauxsoins.png'
import { ls, ss } from '../../../../utils/store';

function CardProject(props) {

    function redirectWithAnchor(i) {
        switch(i){
            case '1':
                ss.setFormated('anchorPrj', 'aus');
                break;
            case '2':
                ss.setFormated('anchorPrj', 'cs');
                break;
            case '3':
                ss.setFormated('anchorPrj', 'pre');
                break;
            case '4':
                ss.setFormated('anchorPrj', 'par');
                break;
            case '5':
                ss.setFormated('anchorPrj', 'mo');
                break;
            default:
                ss.setFormated('anchorPrj', '');
                break;
        }
        window.location.replace(process.env.REACT_APP_BASE_APP_URI + '/projetdesante');
    }

    if (window.innerWidth < 768){
        return (
            <div className='grid grid-cols-1 place-items-center'>
                <div className="cardprj1mobile cardprj grid place-items-center" onClick={() => redirectWithAnchor('1')}>
                    <img src={as} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCardmobile'>Accès aux soins</p>
                    </div>
                </div>
                <div className="cardprj2mobile cardprj grid place-items-center" onClick={() => redirectWithAnchor('2')}>
                    <img src={crise} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCardmobile'>Crise sanitaire</p>
                    </div>
                </div>
                <div className="cardprj4mobile cardprj grid place-items-center" onClick={() => redirectWithAnchor('3')}>
                    <img src={sp} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCardmobile'>Prévention</p>
                    </div>
                </div>
                <div className="cardprj3mobile cardprj grid place-items-center" onClick={() => redirectWithAnchor('4')}>
                    <img src={par} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCardmobile'>Parcours</p>
                    </div>
                </div>
                <div className="cardprj5mobile cardprj grid place-items-center" onClick={() => redirectWithAnchor('5')}>
                    <img src={mo} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCardmobile'>Missions optionnelles</p>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='grid grid-cols-5'>
                <div className="cardprj1 cardprj grid place-items-center" onClick={() => redirectWithAnchor('0')}>
                    <img src={as} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCard'>Accès aux soins</p>
                    </div>
                </div>
                <div className="cardprj2 cardprj grid place-items-center" onClick={() => redirectWithAnchor('0')}>
                    <img src={crise} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCard'>Crise sanitaire</p>
                    </div>
                </div>
                <div className="cardprj3 cardprj grid place-items-center" onClick={() => redirectWithAnchor('0')}>
                    <img src={sp} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCard'>Prévention</p>
                    </div>
                </div>
                <div className="cardprj4 cardprj grid place-items-center" onClick={() => redirectWithAnchor('0')}>
                    <img src={par} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCard'>Parcours</p>
                    </div>
                </div>
                <div className="cardprj5 cardprj grid place-items-center" onClick={() => redirectWithAnchor('0')}>
                    <img src={mo} className='icMid' width='100px'></img>
                    <div className='cardprjbottom grid place-items-center'>
                        <p className='textCard'>Missions optionnelles</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardProject;