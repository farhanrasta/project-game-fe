import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import PopUpModal from './src/components/PopUpModal';
import GameScreen from './src/screens/GameScreen';
import Leaderboard  from './src/screens/Leaderboard';
import Welcome from './src/screens/WelcomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Game" component={GameScreen}/>
        <Stack.Screen name="Leaderboard" component={Leaderboard}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
