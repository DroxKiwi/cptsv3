import { useEffect, useRef, useState } from 'react';
import './Header.css';
import { ls, ss } from '../../../utils/store';

import { Button } from 'primereact/button';
import logo from '../../assets/Images/logoreact.png';
import fb from '../../assets/Images/fb.png';
import linkedin from '../../assets/Images/linkedin.png';



function Header (props) {

    const [seed, setSeed] = useState(false);
    
    function handleClickOngle(e){
        console.log(e.target.nodeName);
        var tbh = document.getElementById('tbh');
        for (let i = 0; i < tbh.childNodes.length; i++){
            tbh.childNodes[i].classList.remove('activeh');
            var temp = tbh.childNodes[i].childNodes;
            if (temp[0] !== undefined){
                temp[0].classList.remove('activeh');
            }
        }
        if (e.target.nodeName === 'BUTTON'){
            e.target.classList.add('activeh');
        }
        else if (e.target.nodeName === 'SPAN'){
            e.target.parentNode.classList.add('activeh');
        }
    };

    return (
        <div id="headerDiv">
            <div className='grid grid-cols-12'>
                <div className='grid grid-cols-2 col-start-11 col-end-12'>
                    <div className='iconMediaHeader grid place-items-center ' onClick={() => window.open('#')}>
                        <img src={fb} width={20} />
                    </div>
                    <div className='iconMediaHeader grid place-items-center' onClick={() => window.open('#')}>
                        <img src={linkedin} width={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;