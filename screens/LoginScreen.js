import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";
import {
  requestNotificationPermission,
  getFCMToken,
} from "../services/notification";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";

GoogleSignin.configure({
  webClientId:
    "424215813666-ap2fnchcu166l6q8tno2ua6tahstsarn.apps.googleusercontent.com",
});

/* ─── Premium Google "G" Icon ─── */
function GoogleIcon({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

/* ─── Main Screen ─── */
export default function LoginScreen() {
  const router = useRouter();

  async function login() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleUser = userInfo.data.user;

      const response = await API.post("/google-login", {
        google_id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
      });

      const jwtToken = response.data.access_token;
      const user = response.data.user;

      await AsyncStorage.setItem("token", jwtToken);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      const allowed = await requestNotificationPermission();
      if (allowed) {
        const fcmToken = await getFCMToken();
        await API.post(
          "/update-fcm-token",
          { fcm_token: fcmToken },
          { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
      }

      router.replace("/DashboardScreen");
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed", error.message);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.container}>
        {/* ── Centered Content Block ── */}
        <View style={styles.centerBlock}>
          
          {/* Luxury Monogram Logo */}
          <View style={styles.monogramWrap}>
            <View style={styles.monogramCircle}>
              <Text style={styles.monogramText}>N</Text>
            </View>
          </View>

          {/* Refined Typography */}
          <Text style={styles.title}>Notify</Text>
          <Text style={styles.subtitle}>
            Smart notifications,{'\n'}delivered instantly.
          </Text>

          {/* Generous Spacer for Luxury Feel */}
          <View style={{ height: 48 }} />

          {/* Premium Google Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={login}
            style={styles.button}
          >
            <GoogleIcon size={20} />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Minimalist Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Subtle Footer */}
        <View style={styles.footerRow}>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>Powered by Notify • v1.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ─── Styles (Premium, Luxury, & Safe) ─── */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // Prevents Android Top Status Bar/Notch overlap
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) : 0,
    // Prevents Android Bottom Gesture Navigation overlap
    paddingBottom: Platform.OS === "android" ? 16 : 0, 
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
    justifyContent: "space-between", // Pushes footer to absolute bottom safely
  },

  /* ── Center Layout ── */
  centerBlock: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ── Luxury Monogram ── */
  monogramWrap: {
    marginBottom: 28,
  },
  monogramCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#111827", // Matches Dashboard dark elements
    justifyContent: "center",
    alignItems: "center",
    // Subtle shadow for depth (Premium feel)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  monogramText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -1,
    marginTop: -2, // Optical centering fix for 'N'
  },

  /* ── Typography ── */
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -1.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0.2, // Wide tracking for elegance
  },

  /* ── Button (Matches Dashboard style strictly) ── */
  button: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },

  /* ── Terms ── */
  termsText: {
    fontSize: 12,
    color: "#D1D5DB",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
  termsLink: {
    color: "#6B7280",
    fontWeight: "500",
  },

  /* ── Footer ── */
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8, // Safe distance from absolute bottom edge
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  footerText: {
    fontSize: 11,
    color: "#D1D5DB",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});