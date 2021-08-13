import {useState} from 'react';

const useGlobalState = () => {
    const [state, setState] = useState(
        {
            user: null,
            driveApi: null,
            driveFolder: null,
            sheets: [],
            focusedSheet: null,
            total: '',
        }
    );

    const actions = (action) => {
        const {type, payload} = action;
        console.log('actions');
        console.log(payload);
        switch(type){
            case 'setState':
                return setState(payload);
            default:
                return state;
        }
    }

    return {state, actions};
}

export default useGlobalState;