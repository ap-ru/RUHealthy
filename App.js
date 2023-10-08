import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MealForm from './Screens/GenerateMealOptions';
import { MealPager } from './Screens/GeneratedMealDisplay';
import { LogBox } from 'react-native';


export default function App() {
  LogBox.ignoreAllLogs()
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Form">
        <Stack.Screen name="Form" component={MealForm} options={{ headerShown: false }}/>
        <Stack.Screen name='MealDisplay' component={MealPager} options={{ headerShown: false }}/>
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