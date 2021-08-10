import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, NavigationHelpersContext, useNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Log from './components/Log';
import SheetSelection from './components/SheetSelection';
import GoogleSignInPage from './components/GoogleSignInPage';
import {AuthContext} from './services/AuthContext';
import useGlobalState from './store/useGlobalState';

const App: () => Node = () => {

  const Stack = createStackNavigator();
  const globalState = useGlobalState();

  return (
     <AuthContext.Provider value={globalState}>
      <StatusBar barStyle="light-content" backgroundColor='white'/>
      <NavigationContainer>
      {globalState.state.user !== null ? (
        <Stack.Navigator
          initialRouteName='Log'
          screenOptions={{
            headerStyle:{
              backgroundColor: '#000',
              shadowColor: 'transparent',
            },
          }}
        >
        <Stack.Screen
          name='Log'
          component={Log}
          options={{
            title:'',
          }}
        />
         
        <Stack.Screen
          name='SheetSelection'
          component={SheetSelection}
          options={{
            title:'',
            headerLeft: () => {}
          }}
          
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