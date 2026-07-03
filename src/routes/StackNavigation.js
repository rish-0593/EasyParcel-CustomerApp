import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Details from "../screens/Details";
import Chat from "../screens/Chat";
import Order from "../screens/Order";
import Payment from "../screens/Payment";

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
            <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
            <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Payment" component={Payment} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
  
export default StackNavigation;