import 'react-native-gesture-handler';
import React from 'react';
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
       <View style={styles.statusBar}>
        <SafeAreaView>
          <StatusBar backgroundColor='pink' hidden={false} barStyle='light-content'/>
        </SafeAreaView>
       </View>
      {/* <StatusBar backgroundColor='pink' hidden={false}/> */}
      <NavigationContainer>
        {globalState.state.user !== null ? (
          <Tab.Navigator
            tabBar={() => false}
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
   backgroundColor: '#121212' 
  }

  
});

export default App;