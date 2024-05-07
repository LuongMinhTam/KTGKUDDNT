import { useEffect, useState } from "react"
import { login, register, useMyContextController } from "../context";
import {  Image, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default Login = ({navigation}) => {
    const [email, setEmail] = useState("afkkenta710@gmail.com");
    const [password, setPassword] = useState("123456");
    const [showPassword, setShowPassword] = useState(false);
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    const hasErrorEmail = () => !email.includes('@')
    const hasErrorPassword = () => password.length < 6

    useEffect(() => {
        if(userLogin != null) {
                navigation.navigate("Home")
        }
    }, [userLogin])

    const onSubmit = () => {
        login(dispatch, email, password);
    }
    const onRegister = () => {
        navigation.navigate("Register")
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Image style={{height: 150, width: 150, alignSelf: 'center', marginBottom: 100}}
                source={{uri: 'https://miro.medium.com/max/600/1*R4c8lHBHuH5qyqOtZb3h-w.png'}}
            />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{margin: 10}} mode="outlined" />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword}
                style={{margin: 10}}
                right={<TextInput.Icon icon={"eye"} onPress={() => setShowPassword(!showPassword)}/>}
                mode="outlined"
            />
            {hasErrorEmail() || hasErrorPassword() ? (
                <Button mode="contained-tonal" 
                style={{margin: 10, padding: 5, backgroundColor: 'white'}}
                labelStyle={{fontSize: 20}}
            >
                Đăng nhập
            </Button>
            ) : (
                <Button mode="contained-tonal" onPress={onSubmit}
                style={{margin: 10, padding: 5}}
                labelStyle={{fontSize: 20}}
            >
                Đăng nhập
            </Button>
            )}
            
            <Button mode="contained-tonal" onPress={onRegister}
                style={{margin: 10, padding: 5}}
                labelStyle={{fontSize: 20}}
            >
                Đăng ký
            </Button>
        </View>
    )
}