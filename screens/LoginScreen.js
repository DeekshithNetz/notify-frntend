import React from "react";
import { View, Button, Alert } from "react-native";

import { useRouter } from "expo-router";

import {
    GoogleSignin
} from "@react-native-google-signin/google-signin";

import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../services/api";

import {
    requestNotificationPermission,
    getFCMToken
} from "../services/notification";


GoogleSignin.configure({
    webClientId: "424215813666-ap2fnchcu166l6q8tno2ua6tahstsarn.apps.googleusercontent.com",
});


export default function LoginScreen() {

    const router = useRouter();


    async function login(){

        try {

            await GoogleSignin.hasPlayServices();


            const userInfo =
                await GoogleSignin.signIn();


            const googleUser = userInfo.data.user;


            const response =
                await API.post(
                    "/google-login",
                    {
                        google_id: googleUser.id,
                        name: googleUser.name,
                        email: googleUser.email
                    }
                );


            const jwtToken = response.data.access_token;

            const user = response.data.user;


            await AsyncStorage.setItem(
                "token",
                jwtToken
            );


            await AsyncStorage.setItem(
                "user",
                JSON.stringify(user)
            );



            const allowed =
                await requestNotificationPermission();
            console.log("allow",allowed);    



            if(allowed){

                const fcmToken =
                    await getFCMToken();


                await API.post(
                    "/update-fcm-token",
                    {
                        fcm_token: fcmToken
                    },
                    {
                        headers:{
                            Authorization:
                            `Bearer ${jwtToken}`
                        }
                    }
                );

            }


            router.replace("/DashboardScreen");


        }
        catch(error){

            console.log(error);

            Alert.alert(
                "Login Failed",
                error.message
            );

        }

    }



    return(
    <View
        style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        }}
    >
        <Button
            title="Login with Google"
            onPress={login}
        />
    </View>
);

}