import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { logout, useMyContextController } from "../context";

export default Home = () => {

    const JOBS = firestore().collection("JOBS");
    const [job, setJob] = useState('');
    const [listJob, setListJob] = useState([]);
    const [loading , setLoading] = useState(true);
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;

    useEffect(() => {
        const subscriber = firestore().collection("JOBS").onSnapshot(querySnapshot => {
            const jobs = [];

            querySnapshot.forEach(documentSnapshot => {
                jobs.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setListJob(jobs);
        });
        return () => subscriber();
    },[])

    const handleAddJob = async() => {
        if(!job) {
            Alert.alert("Please enter job name.");
            return;
        }

        try{
            await JOBS.add({JobName: job});
            setJob("");
            Alert.alert("Job add successfully!");
        } catch (error) {
            console.error("Error adding job: ", error);
            Alert.alert("An error occurred. Please try again.");
        } 
    };

    const handleLogout = () => {
        logout(dispatch);
    }

    return (
        <View style={{flex: 1}}>
            <View style={{marginVertical: 20, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{color: 'blue', fontSize: 20}}>Logout</Text>
                </TouchableOpacity>
                
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row', alignSelf: 'center'}}>
                <TextInput placeholder="Add new jod" style={{marginTop: 30, width: 300}} mode="outlined"
                    value={job} onChangeText={setJob}
                />
                <Button style={{marginTop: 30, height: 60, width: 70, borderWidth: 0.5, borderRadius: 0, backgroundColor: 'lightblue', alignSelf : 'center'}}
                    onPress={handleAddJob}
                >Add</Button>
            </View>
            <View style={{justifyContent:'center', marginTop: 60, alignSelf: 'center', margin: 10}}>
                <FlatList
                        data = {listJob}
                        renderItem={({item}) => (
                            <View style={{ height: 50 , borderBottomWidth: 0.5, padding: 10}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.JobName}</Text>
                            </View>
                        )}
                    />
            </View>
        </View>
    )
}