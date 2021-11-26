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
            loading: false
        }
    );

    const [theme, setTheme] = useState(
       {
           darkMode: true
       }
    );

    const actions = (action) => {
        const {type, payload} = action;
        // console.log('actions');
        // console.log(payload);
        switch(type){
            case 'setState':
                return setState(payload);
            case 'setTheme':
                return setTheme(payload);
            default:
                return state;
        }
    }

    return {state, theme, actions};
}

export default useGlobalState;