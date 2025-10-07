
import { useState, useEffect, useRef } from 'react';
import "./agenda.css";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Header from '../../header/Header';
import { API_events } from '../../services/api/eventsServices';
import { Tag } from 'primereact/tag';

import EditorTagEvent from '../../../dashboard/tools/EditorTagEvent';
import EditorWindowEvent from '../../../dashboard/tools/EditorWindowEvent';

import { ls, ss } from '../../../utils/store';
import { Dialog } from 'primereact/dialog';

import ErrorPage from '../../../utils/error-page';
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';

import { Toast } from 'primereact/toast';

import Footer from '../../footer/Footer';
import Footer2 from '../../footer/Footer2';

import { dateConverterToFrench } from '../../../utils/dateConverterToFrench';

function Agenda (props) {

    // Gestion d'erreur à l'écran

    // Gestion d'erreur à l'écran

    const todayF = new Date();
    const today = todayF.getFullYear() + '-' + (todayF.getMonth()+1) + '-' + todayF.getDate();
    const todayJSf = new Date(today);

    useEffect(() => {
        ss.set('window', 'agenda');
    }, []);
  
    const [docHeight, setDocHeight] = useState(null);
    const [docWidth, setDocWidth] = useState(null);
    const [allTags, setAllTags] = useState([]);
    const [data, setData] = useState([]);
    const [detailEventVisible, setDetailEventVisible] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [selectedTagSearch, setSelectedTagSearch] = useState(null);

    const filters = [
        { name: 'Par tags', value: 'bytag' },
        { name: 'Par date publication + récente', value: 'bydatedesc' },
        { name: 'Par date publication + anciennce', value: 'bydateasc' },
        { name: 'Par date d\'évenement + récente', value: 'bystartdesc'},
        { name: 'Par date d\'évenement + ancienne', value: 'bystartasc'},
        { name: 'Aucun', value: null },
    ]
    const [selectedFilter, setSelectedFilter] = useState(filters[filters.length - 1]);
      
    useEffect(() => {
        try {
            setDocHeight(window.innerHeight - props.headerHeight);
            setDocWidth(window.innerWidth - 10);
        }
        catch(error){
            console.error(error);
        }
    }, [window.innerHeight]);

    useEffect(() => {
        try {
            //setData(nactusServ);
            const getData = async () => {
                try {
                    setData(await API_events.get_all());
                    var allTagsTemp = await API_events.get_all_tags();
                    allTagsTemp.push({ name: 'Aucun', tag_id: null });
                    setAllTags(allTagsTemp);
                }
                catch(error){
                    console.error(error);
                }
            }
            getData();   
        }
        catch(error){
            console.error(error);
        }
    }, []);

    // Trier la recherche
    useEffect(() => {
        try {
            var temp = JSON.parse(JSON.stringify(data));
            var result = [];
            switch (selectedFilter){
                case 'bytag':
                    for (let i = 0; i < allTags.length; i++){
                        for (let j = 0; j < temp.length; j++){
                            if (allTags[i].tag_id === temp[j].tagid){
                                result.push(temp[j]);
                            }
                        }
                    }
                    setData(result);
                    break;
                case 'bydatedesc':
                    var sortedArr = JSON.parse(JSON.stringify(data.sort((a, b) => b.event_id - a.event_id)));
                    setData(sortedArr);
                    break;
                case 'bydateasc':
                    var sortedArr = JSON.parse(JSON.stringify(data.sort((a, b) => a.event_id - b.event_id)));
                    setData(sortedArr);
                    break;
                case 'bystartdesc':
                    var dates = [];
                    for (let i = 0; i < data.length; i++) {
                        dates.push(
                            {
                                dateM: new Date(data[i].startdate),
                                event_id: data[i].event_id
                            }
                        );
                    }
                    var sortedArr = dates.sort((a, b) => b.dateM - a.dateM);
                    var finalArr = [];
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data.length; j++){
                            if (sortedArr[i].event_id === data[j].event_id){
                                finalArr.push(data[j]);
                            }
                        }
                    }
                    setData(finalArr);
                    break;
                case 'bystartasc':
                    var dates = [];
                    for (let i = 0; i < data.length; i++) {
                        dates.push(
                            {
                                dateM: new Date(data[i].startdate),
                                event_id: data[i].event_id
                            }
                        );
                    }
                    var sortedArr = dates.sort((a, b) => a.dateM - b.dateM);
                    var finalArr = [];
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data.length; j++){
                            if (sortedArr[i].event_id === data[j].event_id){
                                finalArr.push(data[j]);
                            }
                        }
                    }
                    setData(finalArr);
                    break;
                case null:
                    break;
                    
            }
        }
        catch(error){
            console.error(error);
        }
    }, [selectedFilter]);

    const header = (d) => {
        try {
            if (d.img !== null && d.img !== undefined && d.img !== "null"){
                return (
                    <img alt="Card" src={d.img} className='object-cover' />
                )
            }
            else {
                return (
                    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
                )
            }
        }
        catch(error){
            console.error(error);
            return <ErrorPage error={error} />
        }
    };

    const RenderTag = (props) => {
        try {
            if (allTags.length > 0){
                for (let i = 0; i < allTags.length; i++) {
                    if (allTags[i].tag_id === props.tagid) {
                        return (
                            <Tag value={allTags[i].name} style={{backgroundColor: '#' + allTags[i].color}} />
                        )
                    }
                }
            }
            else {
                return (
                    null
                )
            }
        }
        catch(error){
            console.error(error);
            return <ErrorPage error={error} />
        }
    };

    function handleOpenArticle(d) {
        try {
            setDetailEventVisible(true);
            setSelectedDetail(d);
        }
        catch(error){
            console.error(error);
            return <ErrorPage error={error} />
        }
    };

    const headerDetail = () => {
        try {
            if (selectedDetail !== null){
                if (selectedDetail.img === 'null'){
                    return <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
                }
                else {
                    return <img alt="Card" src={selectedDetail.img} className='object-cover' />
                }
            }
        }
        catch(error){
            console.error(error);
            return <ErrorPage error={error} />
        }
    };

    const RenderDateEvent = (props) => {
        try {
            if (props.d.startdate === props.d.enddate){
                return (
                    <p>Le {dateConverterToFrench.dateConverter(props.d.startdate.split("T")[0])}</p>
                )
            }
            else {
                return (
                    <p>Du {dateConverterToFrench.dateConverter(props.d.startdate.split("T")[0])} au {dateConverterToFrench.dateConverter(props.d.enddate.split("T")[0])}</p>
                )
            }
        }
        catch(error){
            console.error(error);
            return <ErrorPage error={error} />
        }
    }

    try {
        return (
            <div className='container-root'>
                <EditorWindowEvent>
                    <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
                    <div className='grid place-items-center card bg-transparent'>
                        <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 157" fill="none">
                        <path d="M2005 26.4999C2192 -63.5007 2398.5 106.001 2005 135.5C1625.21 163.971 -92.4998 451.5 -176 177C-199.762 98.8847 -293.541 -50.1995 -71.9997 54.0001C518 331.5 1818 116.501 2005 26.4999Z" fill="#F2EE2C" fill-opacity="0.33"/>
                        </svg>
                        <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                        <path d="M1999.5 173.5C2186.5 83.4994 2363 250.501 1969.5 280C1589.71 308.471 -90.0001 475.501 -173.5 201C-197.262 122.885 -264.541 -74.1996 -43 30C547 307.5 1812.5 263.501 1999.5 173.5Z" fill="#F2EE2C" fill-opacity="0.33"/>
                        </svg>
                        <h2 className='titlepage md:text-7xl text-3xl relative'>
                            L'agenda de la CPTS
                        </h2>
                        <div className='grid md:grid-cols-3 gap-4 place-items-center relative'>
                            <InputText placeholder='Recherche par mots clés' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <Dropdown value={selectedTagSearch} onChange={(e) => setSelectedTagSearch(e.value)} options={allTags} optionLabel="name" 
                                placeholder="Rechercher par tags" checkmark={true} highlightOnSelect={false} />
                            <span className=''>Filtrer votre recherche</span>
                            <Dropdown value={selectedFilter} onChange={(e) => setSelectedFilter(e.value)} options={filters} optionLabel="name" 
                                    placeholder="Filtrer" checkmark={true} highlightOnSelect={false} />
                            <span className='ml-4'>Trier votre recherche</span>
                        </div>
                        { 
                            data !== null ? (
                                <div className='z-10'>
                                    <div className='grid md:grid-cols-4'>
                                        {
                                            data.map((d) => (
                                                <>
                                                    {
                                                        d.name.includes(searchValue) || d.subtitle.includes(searchValue) || d.tectimeinsert.includes(searchValue) ? (
                                                            <>
                                                                {
                                                                    selectedTagSearch !== null ? (
                                                                        <>
                                                                            {
                                                                                selectedTagSearch.tag_id === null || d.tagid === selectedTagSearch.tag_id ? (
                                                                                    <EditorTagEvent dataObject={d} id={d.event_id} type="event" setDetailEventVisible={setDetailEventVisible}>
                                                                                        {
                                                                                            d.actif == true || (todayJSf > (new Date(d.enddate.split("T")[0]))) ? (
                                                                                                <div className='cursor-pointer' onClick={() => handleOpenArticle(d)}>
                                                                                                    <Card title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(d)} className="m-10 cardagenda">
                                                                                                        <div>
                                                                                                            <RenderTag tagid={d.tagid}/>
                                                                                                            <p>Publié : {dateConverterToFrench.dateConverter(d.tectimeinsert.split("T")[0])} à {d.tectimeinsert.split("T")[1]}</p>
                                                                                                            <RenderDateEvent d={d} />
                                                                                                        </div>
                                                                                                    </Card>
                                                                                                </div>
                                                                                            ) :
                                                                                            (
                                                                                                <div className='cursor-pointer' onClick={() => handleOpenArticle(d)}>
                                                                                                    <Card title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(d)} className="m-10 cardagenda">
                                                                                                        <RenderTag tagid={d.tagid}/>
                                                                                                        <p>Publié : {dateConverterToFrench.dateConverter(d.tectimeinsert.split("T")[0])} à {d.tectimeinsert.split("T")[1]}</p>
                                                                                                        <RenderDateEvent d={d} />
                                                                                                    </Card>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    </EditorTagEvent>
                                                                                ) : 
                                                                                (
                                                                                    null
                                                                                )
                                                                            }
                                                                        </>
                                                                    ) :
                                                                    (
                                                                        <EditorTagEvent dataObject={d} id={d.event_id} type="event" setDetailEventVisible={setDetailEventVisible}>
                                                                        {
                                                                            (d.actif == true && (todayJSf < (new Date(d.enddate.split("T")[0])))) ? (
                                                                                <div className='cursor-pointer' onClick={() => handleOpenArticle(d)}>
                                                                                    <Card title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(d)} className="m-10 cardagenda">
                                                                                        <RenderTag tagid={d.tagid}/>
                                                                                        <p>Publié : {dateConverterToFrench.dateConverter(d.tectimeinsert.split("T")[0])} à {d.tectimeinsert.split("T")[1]}</p>
                                                                                        <RenderDateEvent d={d} />
                                                                                    </Card>
                                                                                </div>
                                                                            ) :
                                                                            (
                                                                                <div className='cursor-pointer' onClick={() => handleOpenArticle(d)}>
                                                                                    <Card title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(d)} className="m-10 bg-gray-400 cardagenda">
                                                                                        <RenderTag tagid={d.tagid}/>
                                                                                        <p>Publié : {dateConverterToFrench.dateConverter(d.tectimeinsert.split("T")[0])} à {d.tectimeinsert.split("T")[1]}</p>
                                                                                        <RenderDateEvent d={d} />
                                                                                    </Card>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        </EditorTagEvent>
                                                                    )
                                                                }
                                                            </>
                                                        ) :
                                                        (
                                                            null
                                                        )
                                                    }
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            ) :
                            (
                                null
                            )
                        }
                    </div>
                    <Dialog className='md:h-[80dvh] md:w-[60dvw]' visible={detailEventVisible} onHide={() => setDetailEventVisible(false)}>
                        {
                            selectedDetail !== null ? (
                                <Card title={selectedDetail.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} subTitle={selectedDetail.subtitle.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={headerDetail} className="md:w-25rem">
                                    <p>
                                        <RenderDateEvent d={selectedDetail} />
                                    </p>
                                    <div>
                                        {
                                            selectedDetail.description.split("&lt;iframe")[1] !== undefined ? (
                                                <div>
                                                    <div dangerouslySetInnerHTML={{ __html: selectedDetail.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>").split("&lt;iframe")[0] + selectedDetail.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>").split("iframe&gt;")[1] }}></div>
                                                    <iframe width="560" height="315" src={selectedDetail.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").split("iframe")[1].split('src="')[1].split('" title="')[0]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                                </div>
                                            ) :
                                            (
                                                <div dangerouslySetInnerHTML={{ __html: selectedDetail.description.replaceAll('_GD_', '"').replaceAll("_GS_", "'").replaceAll('/@', "<a target='_blank' href='").replaceAll('@/', "'>lien</a>") }}></div>
                                            )
                                        }
                                    </div>
                                </Card>
                            ) : 
                            (
                                null
                            )
                        }
                    </Dialog>
                </EditorWindowEvent>
                <Footer2 />
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default Agenda;