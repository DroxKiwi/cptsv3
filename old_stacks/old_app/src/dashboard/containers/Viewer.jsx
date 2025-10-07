import { useState, useEffect, useRef } from 'react';
import { ls, ss } from '../../utils/store';
import Root from '../../routes/root';

import './viewer.css';
import { Button } from 'primereact/button';

function HomePage(props) {

  useEffect(() => {
    console.log(props.urlViewer);
  }, [props.urlViewer]);

  return (
      <div className="h-full w-full overflow-y-hidden">
        <iframe src={process.env.REACT_APP_BASE_APP_URI + props.urlViewer} className='h-full w-full' >
          
        </iframe>
      </div>
  );
}


export default HomePage;
