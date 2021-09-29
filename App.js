import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer, NavigationHelpersContext, useNavigationContainerRef} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Log from './components/Log';
import SheetSelection from './components/SheetSelection';
import GoogleSignInPage from './components/GoogleSignInPage';

import {AuthContext} from './services/AuthContext'; //
import useGlobalState from './store/useGlobalState';

const App: () => Node = () => {
  // TODO: uninstall createSTackNavigator
  //const Stack = createStackNavigator();
  const globalState = useGlobalState();

  
  

  const Tab = createMaterialTopTabNavigator();
  return (
     <AuthContext.Provider value={globalState}>
       <View style={globalState.theme.darkMode ? styles.statusBar_Dark : styles.statusBar}>
        <SafeAreaView>
          <StatusBar hidden={false} barStyle= {globalState.theme.darkMode ? 'light-content' : 'dark-content'}/>
        </SafeAreaView>
       </View>
      <NavigationContainer>
        {globalState.state.user !== null ? (
          <Tab.Navigator
            tabBar={() => false}
            initialRouteName="Log"
          >
            <Tab.Screen name="Log" component={Log} />
            <Tab.Screen name="SheetSelection" component={SheetSelection} />
          </Tab.Navigator>
        ) : 
          <GoogleSignInPage/>
        }
        
      </NavigationContainer>
    </AuthContext.Provider> 
  );
};

const styles = StyleSheet.create({
  statusBar: {
   backgroundColor: '#F7F7FA'
  },
  statusBar_Dark: {
    //backgroundColor: '#0c0c0c'
    backgroundColor: '#17181c', // dark 4 
   }
});

export default App;