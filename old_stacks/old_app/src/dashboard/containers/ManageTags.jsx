
import { useState, useEffect, useRef } from 'react';
import './createtags.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { API_tagsDash } from '../services/api/tags/tagsServicesDash';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import { ColorPicker } from 'primereact/colorpicker';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';

function ManageTags () {

    const [tags, setTags] = useState([]);
    const [name, setName] = useState('');
    const [colorHEX, setColorHEX] = useState(null);
    const [actif, setActif] = useState(true);
    const toast = useRef(null);
    const [modfiied, setModfiied] = useState(true);

    const showSucces = () => {
        toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Votre tag à été ajouté avec succès' });
    };

    
    const showError = () => {
        toast.current.show({ severity: 'warn', summary: 'Erreur', detail: 'Une erreur à été rencontré' });
    };

    useEffect(() => {
        const getData = async () => {
            setTags(await API_tagsDash.get_all());
        }
        getData();
    }, []);

    const [visibleCreateTags, setVisibleCreateTags] = useState(false);

    async function handleCreateTags() {
        var answer = await API_tagsDash.create_tag(name, colorHEX, actif);
        setVisibleCreateTags(false);
        if (answer){
            showSucces();
            setTags(await API_tagsDash.get_all());
        }
        else {
            showError();
        }
    };

    const templateTagName = (tag) => {
        return (
            <Tag value={tag.name} style={{backgroundColor: '#' + tag.color}} />
        )
    };

    const templateEnabled = (tag) => {
        if (tag.actif){
            return (
                <i className="pi pi-check" style={{ color: 'green' }}></i>
            )
        }
        else {
            return (
                <i className="pi pi-times" style={{ color: 'red' }}></i>
            )
        }
    };

    const templateColor = (tag) => {
        return (
            <div className='h-[30px] w-[30px] rounded' style={{backgroundColor: "#" + tag.color}}></div>
        )
    }

    // Edition des lignes
    const onRowEditComplete = (e) => {
        let _tags = [...tags];
        let { newData, index } = e;

        _tags[index] = newData;

        setTags(_tags);
        setModfiied(false);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const statusActif = [
        {
            template: "pi-check",
            color: "green",
            value: true
        },
        {
            template: "pi-times",
            color: "red",
            value: false
        }
    ]

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.actif}
                options={statusActif}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Choisir"
                itemTemplate={(option) => {
                    return <i className={"pi " + option.template} style={{ color: option.color }}></i>
                }}
            />
        );
    };

    const colorEditor = (options) => {
        return (
            <ColorPicker format="hex" value={options.value} onChange={(e) => options.editorCallback(e.value)} />
        );
    };

    const allowEdit = (rowData) => {
        return rowData.name !== '';
    };

    async function handleSaveValues(){
        for (let i = 0; i < tags.length; i++) {
            await API_tagsDash.update_tag(tags[i].tag_id, tags[i].name, tags[i].color, tags[i].actif);
        }
        setModfiied(true);
    }

    return (
        <div className='w-full h-full'>
            <Toast ref={toast} />

            <Button raised className='my-5 ml-5' label="Ajouter un tag" severity='info' onClick={() => setVisibleCreateTags(true)}>
            </Button>
            <Dialog className='card' visible={visibleCreateTags} onHide={() => setVisibleCreateTags(false)}>
                <div className='card'>
                    <FloatLabel>
                        <InputText id="nametag" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="nametag">Nom du Tag</label>
                    </FloatLabel>
                </div>
                <div className='card'>
                    <p>Choix de la couleur du Tag</p>
                    <ColorPicker format="hex" value={colorHEX} onChange={(e) => setColorHEX(e.value)} />
                </div>
                <div className='card'>
                    <p>Tag actif ?</p>
                    <InputSwitch checked={actif} onChange={(e) => setActif(e.value)} />
                </div>
                <div className='btn-success-kdds grid place-items-center' onClick={handleCreateTags}>
                    Valider
                </div>
            </Dialog>
            <DataTable 
            emptyMessage="Aucun tags de créé" 
            value={tags} 
            tableStyle={{ minWidth: '50rem' }}
            editMode="row"
            onRowEditComplete={onRowEditComplete}
            >
                <Column field="tag_id" header="id tag"></Column>
                <Column field="name" header="Tag" body={templateTagName} editor={(options) => textEditor(options)}></Column>
                <Column field="color" header="Couleur" body={templateColor} editor={(options) => colorEditor(options)}></Column>
                <Column field="actif" header="Actif" body={templateEnabled} editor={(options) => statusEditor(options)}></Column>
                <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
            <Button disabled={modfiied} className='my-5 ml-5' label='Appliquer' severity='success' raised onClick={handleSaveValues} >
            </Button>
        </div>
    )
}

export default ManageTags;