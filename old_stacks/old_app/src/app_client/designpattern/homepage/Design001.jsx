import { useState, useEffect, useRef } from 'react';
import './desing001.css';

function Design001(props) {

    const [design001W, setDesign001W] = useState(null);

    useEffect(() => {
        setDesign001W(window.innerWidth - 10);
    }, [])

    return (
        <div id="" className='homepagedesign001 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" width={design001W} height="850" viewBox="0 0 1920 850" fill="none">
            <g filter="url(#filter0_di_1_4066)">
                <path d="M1954.45 359.425C1924.58 433.639 2360.45 917.925 2048.45 831.425C-606.409 95.3795 -124.555 1201.42 -22.0535 24.4247C2.8235 -113.075 72.0705 372.285 257.947 428.925C443.823 485.565 1999.57 247.314 1954.45 359.425Z" fill="#F74924" fill-opacity="0.33" shape-rendering="crispEdges"/>
            </g>
            <defs>
                <filter id="filter0_di_1_4066" x="-126" y="0" width="2291.52" height="849.731" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_4066"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_4066" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1_4066"/>
                </filter>
            </defs>
            </svg>
        </div>
    )
}

export default Design001;