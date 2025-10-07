import { useState, useEffect, useRef } from 'react';
import './organigrame.css';
import ErrorPage from '../../../utils/error-page';
import EditorTagBCA from '../../../dashboard/tools/EditorTagBCA';


function Organigrame (props) {

    const testRef = useRef(null);
    const [loaded, setLoaded] = useState(false);;

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        try {
            if (loaded){
                var test = testRef.current;
                test.addEventListener('mouseover', (e) => {
                    test.classList.add('z-10');
                });
                test.addEventListener('mouseout', (e) => {
                    test.classList.remove('z-0');
                });
            }
        }
        catch(error){
            console.log(error);
        }
    }, [loaded])
    
    try {
        return (
            <div ref={testRef} className='h-[100px] grid grid-rows-2'>
                <EditorTagBCA id={props.src.orga_id}>
                    <div class="boxorgab">
                        <div className='grid grid-cols-2'>
                            <img className='imgorganigrame' src={props.src.img} ></img>
                            <div className='nameoutbox'>
                                <p>{props.src.role}</p>
                                <p>{props.src.description}</p>
                            </div>
                            <div className='nameoutbox nameoutboxlabel'>
                                {props.src.name}
                            </div>
                        </div>
                    </div>
                </EditorTagBCA>
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default Organigrame;