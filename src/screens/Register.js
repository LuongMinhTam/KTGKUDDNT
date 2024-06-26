import { useEffect, useState } from "react"
import { login, register, useMyContextController } from "../context";
import {  Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import auth from '@react-native-firebase/auth'
import  firestore  from "@react-native-firebase/firestore"

export default Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [controller, dispatch] = useMyContextController();
    const hasErrorName = () => name.length <= 0
    const hasErrorEmail = () => !email.includes('@')
    const hasErrorPassword = () => password.length < 6
    const hasErrorPasswordConfirm = () => confirmPassword != password
    const onRegister = () => {
        const USERS = firestore().collection("USERS");
        const customer = {
            name: name,
            phone: phone,
            email: email
          }
        USERS.doc(email).onSnapshot(u => {
            if(!u.exists)
            {
                auth().createUserWithEmailAndPassword(email, password)
                .then(() => 
                USERS.doc(email).set(customer)
                .then(() => {console.log("Add new user customer"); navigation.navigate("Login")})
                )
            }
        })
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 40, fontWeight: 'bold', alignSelf: 'center', color: "pink", marginBottom: 30}}>
                Register
            </Text>
            <TextInput placeholder="Full Name" value={name} onChangeText={setName}
                style={{margin: 10}}
                mode="outlined"
            />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{margin: 10}} mode="outlined" />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword}
                style={{margin: 10}}
                right={<TextInput.Icon icon={"eye"} onPress={() => setShowPassword(!showPassword)}/>}
                mode="outlined"
            />
            <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword}
                style={{margin: 10}}
                right={<TextInput.Icon icon={"eye"} onPress={() => setShowPassword(!showPassword)}/>}
                mode="outlined"
            />
            
            {hasErrorEmail() || hasErrorName() || hasErrorPassword() || hasErrorPasswordConfirm() ? (
                <Button mode="contained-tonal" 
                    style={{margin: 10, padding: 5, backgroundColor: 'white'}}
                    labelStyle={{fontSize: 20}}
                >
                    Đăng ký
                </Button>
            ): (
                <Button mode="contained-tonal" onPress={onRegister}
                    style={{margin: 10, padding: 5}}
                    labelStyle={{fontSize: 20}}
                >
                    Đăng ký
                </Button>
            )}
            
        </View>
    )
}