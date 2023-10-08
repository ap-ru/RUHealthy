import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GenerateMealOptions from './screens/GenerateMealOptions';


export default function App() {
  
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Form">
        <Stack.Screen 
          name="Form" 
          component={GenerateMealOptions}
          options={{
            headerShown: false, // Set headerShown to false for this screen
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
