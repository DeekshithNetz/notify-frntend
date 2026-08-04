    import axios from "axios";
    import AsyncStorage from "@react-native-async-storage/async-storage";

    const API = axios.create({
        baseURL: "http://10.0.2.2:8000"
    });

    export async function handleSendNotification() {
        try {
            const token = await AsyncStorage.getItem("token");

            const response = await API.post(
                "/send-notification",
                {
                    title: "Test Notification",
                    message: "Hello Everyone!",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("recice");
            console.log(response.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    export default API;