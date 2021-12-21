import { Button } from '../Button';
import { Container} from './styles';
import { ConfigItem } from '../ConfigItem';
import { useState, useEffect } from 'react';
import logo from '../../../assets/roadmap.jpeg'

export function Config() {
    const [configItems, setConfigItems] = useState([]);

    useEffect(() => {
        const configs = JSON.parse(localStorage.getItem("configs")) || [];
        setConfigItems(configs);
    },[])

    async function handleDelete (item) {
        await window.Main.deleteConfig(item);
        const newState = configItems.filter(el => {return (el.type != item)});
        setConfigItems(newState);   
    }

    async function handleDownload (item) {
        const buffer = await window.Main.downloadConfig(item);

        const data = new Blob([buffer]);
        const tempURL = window.URL.createObjectURL(data);
        const tempLink = document.createElement('a');
        tempLink.href = tempURL;
        tempLink.style.display = 'none';
        tempLink.setAttribute('download', `${item}.xlsx`);
        tempLink.click();
    }

    async function handleUpload(){
        const dialogConfig = {
            title: 'Selecione um arquivo de configuração',
            buttonLabel: 'Selecionar',
            properties: ['openFile']
        };
       
        const result = await window.Main.openDialog('showOpenDialog', dialogConfig);
        const file = result[0];
    
        await (async () => {
            const response = await window.Main.uploadConfig(file); 
        })();

        const configs = JSON.parse(localStorage.getItem("configs")) || [];
        setConfigItems(configs);
    }

    return (
        <Container>
            <div><img src= {logo} alt="roadmap logo"/></div>
            <div><Button onClick={async () => {await handleUpload()}}>Adicionar</Button></div>
            <ul>
                {configItems.map(el => {
                    return (
                        <ConfigItem 
                            key={el.type} 
                            name={el.type} 
                            handleDelete={async () => {await handleDelete(el.type)}} 
                            handleDownload={async () => {await handleDownload(el.type)}}
                        />)
                })}
            </ul>
        </Container>
    )
}
 


