import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../context";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import { useNavigation } from "@react-navigation/native";


const Stack = createStackNavigator();
export default Router = () => {
    const navigation = useNavigation();
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    console.log("f"+userLogin);

    return (
        <Stack.Navigator initialRouteName="Login"
         screenOptions={{headerTintColor:'grey',headerTitleAlign:'center' }}>
            <Stack.Screen name="Login" component={Login}  navigation = {navigation} />
            <Stack.Screen name="Home" component={Home} options={{
                headerTitle: userLogin ? userLogin.name : 'Home'
            }}/>
            <Stack.Screen name="Register" component={Register} navigation = {navigation} />
        </Stack.Navigator>
    )
}