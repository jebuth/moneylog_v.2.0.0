import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './components/SignIn';
import Log from './components/Log';
import SheetSelection from './components/SheetSelection';

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" hidden/>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SheetSelection'
        screenOptions={{
          headerMode: 'screen',
        }}
      >
        <Stack.Screen
          name='SignIn'
          component={SignIn}
        />

        <Stack.Screen
          name='Log'
          component={Log}
        />

        <Stack.Screen
          name='SheetSelection'
          component={SheetSelection}
        />

      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};
 export default App;