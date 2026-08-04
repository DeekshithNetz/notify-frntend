import React, { useEffect, useState } from "react";
//ok
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleSendNotification } from "../services/api";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
export default function DashboardScreen() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const data = await AsyncStorage.getItem("user");

        if (data) {
            setUser(JSON.parse(data));
        }
    }

    async function sendNotification() {
    try {
        console.log("entered");
        await handleSendNotification();
    } catch (error) {
        console.log(error);
    }
}
async function handleLogout() {
  
    try {
        await GoogleSignin.signOut();      // Sign out from Google
      

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        console.log("entereded");

      router.replace("/"); // Change if your login route is different
    } catch (error) {
        console.log(error);
    }
}

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Notification Dashboard
            </Text>

            {user && (
                <>
                    <Text style={styles.info}>Name: {user.name}</Text>
                    <Text style={styles.info}>Email: {user.email}</Text>
                    <Text style={styles.info}>Role: {user.role}</Text>
                </>
            )}
             <TouchableOpacity
    style={styles.logoutButton}
    onPress={handleLogout}
    activeOpacity={0.8}
>
    <Text style={styles.buttonText}>
        Logout
    </Text>
</TouchableOpacity>

            <TouchableOpacity
                style={styles.sendButton}
                onPress={sendNotification}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                    Send Notification
                </Text>
            </TouchableOpacity>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },

    info: {
        fontSize: 16,
        marginBottom: 8,
    },

    sendButton: {
        marginTop: 30,
        backgroundColor: "#E53935",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 5, // Android shadow
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    logoutButton: {
    marginTop: 15,
    backgroundColor: "#555",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
},
});