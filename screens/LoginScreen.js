import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
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

GoogleSignin.configure({
    
  webClientId:
    "424215813666-ap2fnchcu166l6q8tno2ua6tahstsarn.apps.googleusercontent.com",
});

/* ─── Creative 2x2 Grid "G" Icon (Zero SVGs!) ─── */
function GoogleG() {
  return (
    <View style={styles.gWrap}>
      <View style={[styles.gQuad, { backgroundColor: "#4285F4" }]} />
      <View style={[styles.gQuad, { backgroundColor: "#EA4335" }]} />
      <View style={[styles.gQuad, { backgroundColor: "#FBBC05" }]} />
      <View style={[styles.gQuad, { backgroundColor: "#34A853" }]} />
      <View style={styles.gHole} />
    </View>
  );
}

/* ─── Playful Feature Pill ─── */
function Pill({ emoji, text, bgColor, textColor }) {
  return (
    <View style={[styles.pill, { backgroundColor: bgColor }]}>
      <Text style={styles.pillEmoji}>{emoji}</Text>
      <Text style={[styles.pillText, { color: textColor }]}>{text}</Text>
    </View>
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
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* ── Top Spacer ── */}
        <View style={{ flex: 1 }} />

        {/* ── Logo Section ── */}
        <View style={styles.logoWrapper}>
          {/* Creative blob background */}
          <View style={styles.logoBlob} />
          {/* Clean white circle */}
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🔔</Text>
          </View>
        </View>

        {/* ── Title (Matches Dashboard Heading Exactly) ── */}
        <Text style={styles.title}>Notify</Text>

        {/* ── Subtitle (Matches Dashboard Subtext Exactly) ── */}
        <Text style={styles.subtitle}>
          Smart notifications, delivered instantly.
        </Text>

        {/* ── Creative Cartoony Pills ── */}
        <View style={styles.pillsRow}>
          <Pill emoji="⚡" text="Real-time" bgColor="#EFF6FF" textColor="#3B82F6" />
          <Pill emoji="🛡️" text="Secure" bgColor="#ECFDF5" textColor="#10B981" />
          <Pill emoji="☁️" text="Cloud" bgColor="#F5F3FF" textColor="#8B5CF6" />
        </View>

        {/* ── Bottom Spacer ── */}
        <View style={{ flex: 1.5 }} />

        {/* ── Login Button (Matches Dashboard Button Exactly) ── */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={login}
          style={styles.button}
        >
          <GoogleG />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* ── Terms Text ── */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms</Text> and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>

        {/* ── Footer ── */}
        <View style={styles.footerRow}>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>Powered by Notify • v1.0</Text>
        </View>
        
        <View style={styles.bottomPad} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ─── Styles (Strictly matches Dashboard tokens) ─── */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  bottomPad: {
    height: 20,
  },

  /* ── Logo ── */
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginBottom: 20,
    position: "relative",
  },
  logoBlob: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEF2FF",
    top: 18,
    left: "50%",
    marginLeft: -50,
    transform: [{ rotate: "-15deg" }],
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    // Subtle native shadow for premium feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  logoEmoji: {
    fontSize: 32,
  },

  /* ── Typography (Dashboard matching) ── */
  title: {
    fontSize: 26,          // Matches userName
    fontWeight: "700",     // Matches userName
    color: "#111827",      // Matches userName
    letterSpacing: -0.8,   // Matches userName
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,          // Matches greeting/rowLabel
    fontWeight: "400",     // Matches greeting/rowLabel
    color: "#6B7280",      // Matches greeting/rowLabel
    letterSpacing: -0.2,   // Matches greeting
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  /* ── Pills ── */
  pillsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 24,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    gap: 6,
  },
  pillEmoji: {
    fontSize: 13,
  },
  pillText: {
    fontSize: 12,          // Matches charCount/infoBody
    fontWeight: "600",     // Matches roleBadgeText
    letterSpacing: 0.2,    // Matches roleBadgeText
  },

  /* ── Button (Dashboard matching) ── */
  button: {
    width: "100%",
    backgroundColor: "#111827",  // Matches Dashboard button
    borderRadius: 10,           // Matches Dashboard button
    paddingVertical: 14,        // Matches Dashboard button
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  buttonText: {
    fontSize: 15,          // Matches Dashboard buttonText
    fontWeight: "600",     // Matches Dashboard buttonText
    color: "#FFFFFF",      // Matches Dashboard buttonText
    letterSpacing: -0.2,   // Matches Dashboard buttonText
  },

  /* ── Terms ── */
  termsText: {
    fontSize: 12,
    color: "#9CA3AF",      // Matches infoBody
    textAlign: "center",
    marginTop: 16,
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
    marginTop: 24,
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB", // Matches signOutArrow
  },
  footerText: {
    fontSize: 11,
    color: "#D1D5DB",      // Matches signOutArrow
    fontWeight: "500",
    letterSpacing: 0.5,
  },

  /* ── Creative Google "G" ── */
  gWrap: {
    width: 20,
    height: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    overflow: "hidden",
  },
  gQuad: {
    width: "50%",
    height: "50%",
  },
  gHole: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    top: 6,
    left: 6,
  },
});