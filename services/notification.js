import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";


export async function requestNotificationPermission() {

    if (Platform.OS === "android" && Platform.Version >= 33) {

        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        console.log("Android notification permission:", result);

        return result === PermissionsAndroid.RESULTS.GRANTED;
    }


    const authStatus = await messaging().requestPermission();

    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;


    console.log("Firebase notification permission:", authStatus);

    return enabled;
}



export async function getFCMToken() {

    await messaging().registerDeviceForRemoteMessages();

    const token = await messaging().getToken();

    console.log("FCM TOKEN:", token);

    return token;
}