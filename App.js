import 'react-native-gesture-handler';
import React, {useState, useMemo, useEffect, useContext} from 'react';
import {Button, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './components/SignIn';
import Log from './components/Log';
import SheetSelection from './components/SheetSelection';
import GoogleSignInPage from './components/GoogleSignInPage';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {AuthContext} from './services/AuthContext';
import {GoogleDriveApi} from './services/GoogleDriveApi';
import useGlobalState from './store/useGlobalState';


const Stack = createStackNavigator();

const App: () => Node = () => {

  //const [state, setState] = useState({user: null, driveApi: null});

  // // store signin/signout for entire app to access
  // const authContext = useMemo(() => ({
  //   // signIn: async () => {
  //   //   try{
  //   //     await GoogleSignin.hasPlayServices();
  //   //     await GoogleSignin.signIn()
  //   //     .then(data => {
  //   //         console.log('useMemo signIn');
  //   //         setState({user: data.user, driveApi: new GoogleDriveApi()});
  //   //         console.log({state});
  //   //     });
  //   //   }
  //   //   catch (error) {
  //   //     if(error.code === statusCodes.SIGN_IN_CANCELLED){
  //   //         Alert('sign in cancelled');
  //   //     } else if (error.code === statusCodes.IN_PROGRESS){
  //   //         Alert('sign in in progress already');
  //   //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
  //   //         Alert('play services not available or outdated');
  //   //     } else {
  //   //         Alert('some other error happened');
  //   //     }
  //   //   }
  //   // },
  //   signOut: () => {
  //     console.log('before')
  //     console.log({state});
  //     setState({user: 1, driveApi: null});
  //     console.log('after')
  //     console.log({state});
  //   },
  //   // google drive api
  //   getFolder: (id) => {
  //     console.log('get folder');
  //     console.log({state});
  //     //state.driveApi.getFolder(user);
  //   }
  // }));
  
  


const globalState = useGlobalState();

  return (
     <AuthContext.Provider value={globalState}>
      <StatusBar barStyle="dark-content" hidden/>
      <NavigationContainer>
      {globalState.state.user !== null ? (
        <Stack.Navigator
          initialRouteName='SheetSelection'
          screenOptions={{
            headerStyle:{
              backgroundColor: '#000'
            } 
          }}
        >
        <Stack.Screen
          name='Log'
          component={Log}
        />
        <Stack.Screen
          name='SheetSelection'
          component={SheetSelection}
        />
      </Stack.Navigator>
      ) : 
          <GoogleSignInPage/>
      } 
      </NavigationContainer>
    </AuthContext.Provider> 
  );
};
 export default App;