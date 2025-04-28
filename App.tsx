// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen} 
          options={{ 
            title: 'Edit Profile',
            headerStyle: {
              backgroundColor: '#0077B5',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}