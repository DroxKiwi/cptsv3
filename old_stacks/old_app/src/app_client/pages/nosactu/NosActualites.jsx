
import { useState, useEffect, useRef } from 'react';
import "./nosactualites.css";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Header from '../../header/Header';
import { API_actualites } from '../../services/api/actualitesServices';
import { Tag } from 'primereact/tag';

import EditorTagArticle from '../../../dashboard/tools/EditorTagArticle';
import EditorWindowArticle from '../../../dashboard/tools/EditorWindowArticle';

import { ls, ss } from '../../../utils/store';
import { Dialog } from 'primereact/dialog';

import ErrorPage from '../../../utils/error-page';
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';

import Footer from '../../footer/Footer';
import Footer2 from '../../footer/Footer2';

import { dateConverterToFrench } from '../../../utils/dateConverterToFrench';

function NosActualite (props) {

    useEffect(() => {
        ss.set('window', 'actu');
    }, []);
  
    const [docHeight, setDocHeight] = useState(null);
    const [docWidth, setDocWidth] = useState(null);
    const [allTags, setAllTags] = useState([]);
    const [data, setData] = useState([]);
    const [detailArticleVisible, setDetailArticleVisible] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [selectedTagSearch, setSelectedTagSearch] = useState(null);

    const filters = [
        { name: 'Par tags', value: 'bytag' },
        { name: 'Par date + récente', value: 'bydatedesc' },
        { name: 'Par date + anciennce', value: 'bydateasc' },
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
                    setData(await API_actualites.get_all());
                    var allTagsTemp = await API_actualites.get_all_tags();
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
                    var sortedArr = JSON.parse(JSON.stringify(data.sort((a, b) => b.article_id - a.article_id)));
                    setData(sortedArr);
                    break;
                case 'bydateasc':
                    var sortedArr = JSON.parse(JSON.stringify(data.sort((a, b) => a.article_id - b.article_id)));
                    setData(sortedArr);
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
            setDetailArticleVisible(true);
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

    try {
        return (
            <div className='container-root'>
                <EditorWindowArticle>
                <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
                <div className='grid place-items-center card bg-transparent'>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                    <path d="M2003.5 42.5C2290 335.5 2322.89 291.534 1968 119C1588.5 -65.5 -77 549 -160.5 274.5C-184.262 196.384 -249 -79.0003 -57 23.4997C518.171 330.558 1858.41 -105.884 2003.5 42.5Z" fill="#8DC943" fill-opacity="0.33"/>
                    </svg>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                    <path d="M1999.5 28.4999C2286 321.5 2324.39 307.534 1969.5 135C1590 -49.5 -63.9998 515 -147.5 240.5C-171.262 162.385 -254.5 -15.4999 -62.5 87.0001C512.671 394.058 1854.41 -119.884 1999.5 28.4999Z" fill="#8DC943" fill-opacity="0.33"/>
                    </svg>
                    <h2 className='titlepage relative md:text-7xl text-3xl'>
                        L'actualité de la CPTS
                    </h2>
                    <div className='grid md:grid-cols-3 gap-4 place-items-center z-10'>
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
                                                                                <EditorTagArticle dataObject={d} id={d.article_id} type="article" setDetailArticleVisible={setDetailArticleVisible}>
                                                                                    <div className='cursor-pointer' onClick={() => handleOpenArticle(d)}>
                                                                                        <Card title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(d)} className="m-10 cardactu">
                                                                                            <RenderTag tagid={d.tagid}/>
                                                                                            <p>Publié : {dateConverterToFrench.dateConverter(d.tectimeinsert.split("T")[0])} à {d.tectimeinsert.split("T")[1]}</p>
                                                                                        </Card>
                                                                                    </div>
                                                                                </EditorTagArticle>
                                                                            ) : 
                                                                            (
                                                                                null
                                                                            )
                                                                        }
                                                                    </>
                                                                ) :
                                                                (
                                                                    <EditorTagArticle dataObject={d} id={d.article_id} type="article" setDetailArticleVisible={setDetailArticleVisible}>
                                                                        <div className='cursor-pointer' onClick={() => handleOpenArticle(d)}>
                                                                            <Card title={d.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={() => header(d)} className="m-10 cardactu">
                                                                                <RenderTag tagid={d.tagid}/>
                                                                                <p>Publié : {dateConverterToFrench.dateConverter(d.tectimeinsert.split("T")[0])} à {d.tectimeinsert.split("T")[1]}</p>
                                                                            </Card>
                                                                        </div>
                                                                    </EditorTagArticle>
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
                <Dialog className='md:h-[80dvh] md:w-[60dvw]' visible={detailArticleVisible} onHide={() => setDetailArticleVisible(false)}>
                    {
                        selectedDetail !== null ? (
                            <Card title={selectedDetail.name.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} subTitle={selectedDetail.subtitle.replaceAll('_GD_', '"').replaceAll("_GS_", "'")} header={headerDetail} className="md:w-25rem">
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
                </EditorWindowArticle>
                <Footer2 />
            </div>
        )
    }
    catch(error){
        console.error(error);
        return <ErrorPage error={error} />
    }
}

export default NosActualite;