import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://192.168.31.134:8000",
});

export async function handleSendNotification(message) {
    try {
        const token = await AsyncStorage.getItem("token");

        const response = await API.post(
            "/send-notification",
            {
                title: "Notification",   // Default title
                message: message,        // Message from TextInput
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("received");
        console.log(response.data);
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}

export default API;