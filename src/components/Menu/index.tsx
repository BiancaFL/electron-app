import { Button } from '../Button'
import { Container } from './styles'
import gear from '../../../assets/cog-outline.png'
import file from '../../../assets/text-box-outline.png'
import { useEffect } from 'react';

export function Menu(props) {
    const {handleScreenChange, selectedScreen} = props;

    useEffect(() => {
    }, [selectedScreen]);

    return (
        <Container>
            <Button selected={(selectedScreen === "DRE")} onClick={()=>{handleScreenChange("DRE")}}>
                <img src={file} alt="delete icon"/>
                Gerar DRE
            </Button>
            <Button selected={(selectedScreen === "Config")} onClick={()=>{handleScreenChange("Config")}}>
                <img src={gear} alt="delete icon"/>
                Parametrizar importação
            </Button>
        </Container>
    )
}
 