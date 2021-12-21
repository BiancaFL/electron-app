import { Button } from '../Button';
import { Container } from './styles';
import { useState, useEffect } from 'react';
import logo from '../../../assets/roadmap.jpeg';
import dateFormat from 'dateformat';

export function GenerateDRE() {
    const [configs, setConfigs] = useState([]);
    const [configType, setConfigType] = useState("");

    useEffect(() => {
        const configs = JSON.parse(localStorage.getItem("configs")) || [];
        setConfigs(configs);
    },[])

    async function handleUpload(){
        if (!configType) return;

        const dialogConfig = {
            title: 'Selecione um arquivo de DRE',
            buttonLabel: 'Selecionar DRE',
            properties: ['openFile']
        };
       
        const result = await window.Main.openDialog('showOpenDialog', dialogConfig);
        if (!result) return;

        const file = result[0];
        const buffer = await window.Main.uploadDRE(configType, file);

        const data = new Blob([buffer]);
        const tempURL = window.URL.createObjectURL(data);
        const tempLink = document.createElement('a');
        tempLink.href = tempURL;
        tempLink.setAttribute('download', `Base DRE - ${configType} - ${dateFormat(new Date(), "dd_mm_yyyy")}.xlsx`);
        tempLink.style.display = 'none';
        tempLink.click();
    }

    function handleChange(event){
        if (event.target.value) setConfigType(event.target.value);
    }

    return (
        <Container>
            <div id="logo"><img src= {logo} alt="roadmap logo"/></div>
            <div>
                <p>Modelo:</p>
            </div>
            <select onChange={handleChange} defaultValue="">
                <option value="" disabled>Escolha um modelo de DE/PARA</option>
                { 
                    configs.map(config => {
                        return (<option key={config.type}>{config.type}</option>)
                    })
                }
            </select>
            <Button onClick={async () => {await handleUpload()}}>Gerar DRE</ Button>
        </Container>
    )
}
 


