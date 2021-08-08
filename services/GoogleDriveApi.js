import {GDrive, MimeTypes} from '@robinbobin/react-native-google-drive-api-wrapper';
import {Alert} from 'react-native';

export default class GoogleDriveApi{

    constructor(){
        this.GDrive = new GDrive();
    };
    
    async getFolder(id){
        Alert.alert(`getFolder(${id})`);
    }

}
