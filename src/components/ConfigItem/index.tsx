import { Button } from '../Button';
import { Container} from './styles';
import { modelos } from '../../data';
import electronDevtoolsInstaller from 'electron-devtools-installer';
import { DownloadButton } from '../DownloadButton';
import { DeleteButton } from '../DeleteButton';

export function ConfigItem(props) {
    const { name, handleDelete, handleDownload } = props;

    return (
        <Container>
            <div>{name}</div>
            <DownloadButton onClick={handleDownload}/>
            <DeleteButton onClick={handleDelete}/>
        </Container>
    )
}
 


