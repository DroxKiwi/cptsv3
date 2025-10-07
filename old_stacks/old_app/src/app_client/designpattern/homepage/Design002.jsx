import { useState, useEffect, useRef } from 'react';
import './design002.css';

function Design002(props) {

    const [design002W, setDesign002W] = useState(null);

    useEffect(() => {
        setDesign002W(window.innerWidth - 10);
    }, [])

    return (
        <div className='homepagedesign002 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" width={design002W} style={{marginTop: '200px'}} height="2067" viewBox="0 0 1920 2067" fill="none">
            <g filter="url(#filter0_i_1_4059)">
                <path d="M1973.2 1709.92C1629.2 2347.92 -81.2969 1227.42 -391.297 2066.92C-655.297 1673.92 -111.633 193.948 -26.2195 47.6114C-7.23749 -233.022 -157.296 795.921 495.704 1330.92C1059.2 1619.92 2286.96 1128.02 1973.2 1709.92Z" fill="#0E6DB8" fill-opacity="0.33"/>
            </g>
            <defs>
                <filter id="filter0_i_1_4059" x="-463" y="0" width="2486.72" height="2070.92" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_4059"/>
                </filter>
            </defs>
            </svg>
        </div>
    )
}

export default Design002;