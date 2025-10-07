
import './recapcards.css';


function RecapCards(props) {
    
    return (
        <div>
            <div className='recapcards rc1 grid place-items-center'>
                <h2 className='recapcardstitle'>
                    Qui sommes nous ?
                </h2>
                <p>
                    Retrouvez nos missions, notre territoire et notre équipe.
                </p>
                <div className='recapcardsbtn rcb1 grid place-items-center' onClick={() => props.setChildW('presentation')}>
                    <p className='recapcardsbtntext'>
                        L'équipe
                    </p>
                </div>
            </div>
            <div className='recapcards rc2 grid place-items-center'>
                <h2 className='recapcardstitle'>
                    Vous êtes patient ?
                </h2>
                <p>
                    Retrouvez ce que la CPTS fait pour vous !
                </p>
                <div className='recapcardsbtn rcb2 grid place-items-center' onClick={() => props.setChildW('projetdesante')}>
                    <p className='recapcardsbtntext'>
                        Nos protocoles
                    </p>
                </div>
            </div>
            <div className='recapcards rc3 grid place-items-center'>
                <h2 className='recapcardstitle'>
                    A la une
                </h2>
                <p>
                    Retrouvez l’actualité de la CPTS et des partenaires santé du territoire.
                </p>
                <div className='recapcardsbtn rcb3 grid place-items-center' onClick={() => props.setChildW('nosactualites')}>
                    <p className='recapcardsbtntext'>
                        Nos actualités
                    </p>
                </div>
            </div>
            <div className='recapcards rc4 grid place-items-center'>
                <h2 className='recapcardstitle'>
                    Vous êtes professionnel ?
                </h2>
                <p>
                    Retrouvez les annonces et informations, pour vous, professionnels de santé
                </p>
                <div className='recapcardsbtn rcb4 grid place-items-center' onClick={() => props.setChildW('jesuisprofessionnel')}>
                    <p className='recapcardsbtntext'>
                        Nos protocoles
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RecapCards;