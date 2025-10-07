import { useState, useEffect, useRef } from 'react';
import './design003.css';

function Design003(props) {

    const [design003W, setDesign003W] = useState(null);

    useEffect(() => {
        setDesign003W(window.innerWidth - 10);
    }, [])

    return (
        <div className='homepagedesign003 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" width={design003W} style={{marginTop: '1000px'}} height="1359" viewBox="0 0 1920 1359" fill="none">
            <g filter="url(#filter0_i_1_4070)">
                <path d="M495 1007C998.5 -1162 703.5 790.503 2172.5 1187C1739.23 1187 -470 1539.5 -253.5 1234.5C-297.5 1194.5 -183.791 1152.58 -146.5 1038C-91.4996 868.998 432.237 1277.38 495 1007Z" fill="#F2EE2C" fill-opacity="0.33"/>
            </g>
            <defs>
                <filter id="filter0_i_1_4070" x="-268.389" y="0.630859" width="2440.89" height="1362.12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_4070"/>
                </filter>
            </defs>
            </svg>
        </div>
    )
}

export default Design003;