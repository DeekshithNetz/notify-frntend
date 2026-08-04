import messaging from "@react-native-firebase/messaging";
import * as Device from "expo-device";


export async function requestNotificationPermission() {
/*
    if (!Device.isDevice) {
        alert("Use physical device");
        return false;
    }*/


    const authStatus = await messaging().requestPermission();


    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;


    return enabled;
}



export async function getFCMToken() {

    const token = await messaging().getToken();

    console.log("FCM TOKEN:", token);

    return token;
}