import { useState, useEffect, useRef } from 'react';
import { API_global } from '../../../services/api/globalServices';

import './numberband.css';
import ErrorPage from '../../../../utils/error-page';

function NumberBand(props) {

    const [number1, setNumber1] = useState(0);
    const [maxNumber1, setMaxNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [maxNumber2, setMaxNumber2] = useState(0);
    const [number3, setNumber3] = useState(0);
    const [maxNumber3, setMaxNumber3] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const globalData = await API_global.get_all();
                setMaxNumber1(globalData[0].chiffrepsl);
                setMaxNumber2(globalData[0].chiffrecom);
                setMaxNumber3(globalData[0].chiffrehab);
            }
            catch(error){
                console.error(error);
            }
        }
        getData();
    }, []);

    async function startAnimation1 () {
        try {
            var speed = 0.1;
            for (let i = 0; i <= maxNumber1; i++){
                if (i > maxNumber1-11){
                    speed = 100;
                }
                setNumber1(i);
                console.log(maxNumber1);
                if (i < maxNumber1-100){
                    i = i + 10;
                }
                await new Promise(r => setTimeout(r, speed));
            }
        }
        catch (error){
            console.error(error);
        }
    };

    async function startAnimation2() {
        try {
            var speed = 100;
            for (let i = 0; i <= maxNumber2; i++){
                setNumber2(i);
                await new Promise(r => setTimeout(r, speed));
            }
        }
        catch(error){
            console.error(error);
        }
    };

    async function startAnimation3() {
        try {
            var speed = 0.00005;
            for (let i = 0; i <= maxNumber3; i++){
                if (i > maxNumber3-11){
                    speed = 100;
                }
                setNumber3(i);
                if (i < maxNumber3-100){
                    i = i + 100;
                }
                await new Promise(r => setTimeout(r, speed));
            }
        }
        catch(error){
            console.error(error);
        }
    };

    const elementRef = useRef(null); // Référence de l'élément à observer
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
        try {
            const observer = new IntersectionObserver(
                ([entry]) => {
                // Détecte si l'élément est visible
                    setIsVisible(entry.isIntersecting);
                    if (entry.isIntersecting) {
                        startAnimation1();
                        startAnimation2();
                        startAnimation3();
                        // Placez ici l'action que vous souhaitez déclencher
                    }
                },
                { threshold: 0.5 } // 50% de l'élément doit être visible
            );
        
            if (elementRef.current) {
                observer.observe(elementRef.current); // Observer l'élément
            }
        
            return () => {
                if (elementRef.current) {
                observer.unobserve(elementRef.current); // Nettoyage à la fin
                }
            };
        }
        catch(error){
            console.error(error);
        }
    }, [maxNumber1]);


    try {
        return (
            <div className='grid place-items-center relative' ref={elementRef}>
                <div className="w-[90%] numberband grid grid-cols-1 numberbandborder md:grid-cols-3">
                    <div className='col-span-1 grid place-items-center'>
                        <h2 id="numbersanimated" className='numbers'>{number1}</h2>
                        <h3 className='numberstitle'>Professionnels</h3>
                    </div>
                    <div className='col-span-1 grid place-items-center'>
                        <h2 className='numbers'>{number2}</h2>
                        <h3 className='numberstitle'>Communes</h3>
                    </div>
                    <div className='col-span-1 grid place-items-center'>
                        <h2 className='numbers'>{number3}</h2>
                        <h3 className='numberstitle'>Habitants</h3>
                    </div>
                </div>
            </div>
        )
    }
    catch (error){
        return <ErrorPage error={error} />;
    }
}

export default NumberBand;