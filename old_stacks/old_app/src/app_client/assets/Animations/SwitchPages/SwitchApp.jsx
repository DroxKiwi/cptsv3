
import './SwitchApp.css';
import { Button } from 'primereact/button';



function SwitchApp (props) {

    function test (e) {
        e.preventDefault();
        const reavel = document.querySelector('.revealer');
        reavel.classList.add('active');
        setTimeout(() => {
            reavel.classList.remove('active');
        }, 1000);
    }

    return (
        <div>
            <Button label="test" onClick={test}/>
            <div class="revealer">
            </div>
            {props.child}
        </div>

    )
}

export default SwitchApp;