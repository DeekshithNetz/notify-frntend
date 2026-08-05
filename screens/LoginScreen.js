import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";
import {
  requestNotificationPermission,
  getFCMToken,
} from "../services/notification";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Path } from "react-native-svg";

GoogleSignin.configure({
  webClientId:
    "424215813666-ap2fnchcu166l6q8tno2ua6tahstsarn.apps.googleusercontent.com",
});

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 390;

function s(size) {
  return size * scale;
}

/* ─── Custom Bell Logo ─── */
function NotifyLogo({ size = s(80) }) {
  const half = size / 2;
  const bellWidth = size * 0.5;
  const bellHeight = size * 0.45;
  const clapperR = size * 0.06;
  const arcR = size * 0.26;

  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/Svg"
      >
        {/* Outer glow ring */}
        <Circle
          cx={half}
          cy={half}
          r={half - s(4)}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={s(1.5)}
          fill="none"
        />
        {/* Bell body */}
        <Path
          d={`
            M ${half - bellWidth / 2} ${half + bellHeight * 0.15}
            Q ${half - bellWidth / 2} ${half - bellHeight * 0.6} ${half} ${half - bellHeight * 0.7}
            Q ${half + bellWidth / 2} ${half - bellHeight * 0.6} ${half + bellWidth / 2} ${half + bellHeight * 0.15}
            L ${half + bellWidth * 0.6} ${half + bellHeight * 0.35}
            L ${half - bellWidth * 0.6} ${half + bellHeight * 0.35}
            Z
          `}
          fill="white"
        />
        {/* Clapper */}
        <Circle
          cx={half}
          cy={half + bellHeight * 0.35 + clapperR + s(2)}
          r={clapperR}
          fill="white"
        />
        {/* Top knob */}
        <Circle cx={half} cy={half - bellHeight * 0.7 - s(4)} r={s(4)} fill="white" />
        {/* Notification ping - top right */}
        <Circle cx={half + arcR * 0.7} cy={half - arcR * 0.7} r={s(8)} fill="#FF6B35" />
        <Circle
          cx={half + arcR * 0.7}
          cy={half - arcR * 0.7}
          r={s(13)}
          stroke="#FF6B35"
          strokeWidth={s(2)}
          fill="none"
          opacity={0.4}
        />
      </Svg>
    </View>
  );
}

/* ─── Floating Orb Decoration ─── */
function FloatingOrb({ style, color1, color2, size = s(120) }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 4000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 4000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -s(20)],
  });

  const translateX = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, s(10), 0],
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: 0.12,
          ...style,
          transform: [{ translateY }, { translateX }],
        },
      ]}
    >
      <LinearGradient
        colors={[color1, color2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: "100%", height: "100%", borderRadius: size / 2 }}
      />
    </Animated.View>
  );
}

/* ─── Google Icon Svg ─── */
function GoogleIcon({ size = s(20) }) {
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

/* ─── Feature Pill ─── */
function FeaturePill({ icon, text, delay = 0 }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(s(20))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.featurePill,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </Animated.View>
  );
}

/* ─── Main Screen ─── */
export default function LoginScreen() {
  const router = useRouter();

  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.spring(logoAnim, {
        toValue: 1,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(footerAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
      console.log("allow", allowed);

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

  const logoScale = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  const logoOpacity = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={["#0F0C29", "#1A1A40", "#24243E"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.gradient}
      >
        {/* Floating Orbs */}
        <FloatingOrb
          color1="#6C63FF"
          color2="#FF6B35"
          size={s(180)}
          style={{ top: -s(40), right: -s(50) }}
        />
        <FloatingOrb
          color1="#FF6B35"
          color2="#FFC107"
          size={s(140)}
          style={{ bottom: s(120), left: -s(40) }}
        />
        <FloatingOrb
          color1="#00D2FF"
          color2="#6C63FF"
          size={s(100)}
          style={{ top: s(280), right: -s(20) }}
        />
        <FloatingOrb
          color1="#FF6B35"
          color2="#FF3CAC"
          size={s(80)}
          style={{ bottom: s(260), right: s(40) }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {/* ─── Top Spacing (respects status bar) ─── */}
          <View style={styles.topSpacer} />

          {/* ─── Logo Section ─── */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <View style={styles.logoRing}>
              <LinearGradient
                colors={["#FF6B35", "#FF3CAC", "#6C63FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoRingGradient}
              />
            </View>
            <NotifyLogo size={s(72)} />
          </Animated.View>

          {/* ─── Title ─── */}
          <Animated.View
            style={[
              styles.titleWrap,
              {
                opacity: titleAnim,
                transform: [
                  { translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [s(15), 0] }) },
                ],
              },
            ]}
          >
            <Text style={styles.title}>Notify</Text>
          </Animated.View>

          {/* ─── Subtitle ─── */}
          <Animated.View
            style={[
              styles.subtitleWrap,
              {
                opacity: subtitleAnim,
                transform: [
                  { translateY: subtitleAnim.interpolate({ inputRange: [0, 1], outputRange: [s(12), 0] }) },
                ],
              },
            ]}
          >
            <Text style={styles.subtitle}>
              Smart notifications,{"\n"}delivered instantly.
            </Text>
          </Animated.View>

          {/* ─── Feature Pills ─── */}
          <View style={styles.featuresRow}>
            <FeaturePill icon="⚡" text="Real-time" delay={500} />
            <FeaturePill icon="🔔" text="Push Alerts" delay={650} />
            <FeaturePill icon="🔒" text="Secure" delay={800} />
          </View>

          {/* ─── Spacer ─── */}
          <View style={{ flex: 1 }} />

          {/* ─── Login Button ─── */}
          <Animated.View
            style={[
              styles.buttonWrap,
              {
                opacity: buttonAnim,
                transform: [
                  { translateY: buttonAnim.interpolate({ inputRange: [0, 1], outputRange: [s(30), 0] }) },
                ],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={login}
              style={styles.loginButtonOuter}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F0F0F5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.loginButtonGradient}
              >
                <View style={styles.loginButtonInner}>
                  <GoogleIcon size={s(22)} />
                  <Text style={styles.loginButtonText}>Continue with Google</Text>
                </View>
              </LinearGradient>
              {/* Button shadow layer */}
              <View style={styles.buttonShadow} />
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text>{" "}
              and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Animated.View>

          {/* ─── Footer ─── */}
          <Animated.View
            style={[
              styles.footerWrap,
              {
                opacity: footerAnim,
                transform: [
                  { translateY: footerAnim.interpolate({ inputRange: [0, 1], outputRange: [s(10), 0] }) },
                ],
              },
            ]}
          >
            <View style={styles.footerDot} />
            <Text style={styles.footerText}>
              Powered by Notify • v1.0
            </Text>
          </Animated.View>

          {/* ─── Bottom Safe Spacer ─── */}
          <View style={styles.bottomSpacer} />
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

/* ─── Styles ─── */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F0C29",
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: s(28),
  },
  topSpacer: {
    height: s(20),
  },
  bottomSpacer: {
    height: s(16),
  },

  /* Logo */
  logoContainer: {
    alignItems: "center",
    marginTop: s(30),
    marginBottom: s(20),
  },
  logoRing: {
    position: "absolute",
    width: s(110),
    height: s(110),
    borderRadius: s(55),
    opacity: 0.25,
  },
  logoRingGradient: {
    width: "100%",
    height: "100%",
    borderRadius: s(55),
  },

  /* Title */
  titleWrap: {
    alignItems: "center",
  },
  title: {
    fontFamily: "System",
    fontSize: s(44),
    fontWeight: "800",
    letterSpacing: s(-1.5),
    color: "#FFFFFF",
  },

  /* Subtitle */
  subtitleWrap: {
    alignItems: "center",
    marginTop: s(8),
  },
  subtitle: {
    fontFamily: "System",
    fontSize: s(16),
    fontWeight: "400",
    color: "rgba(255,255,255,0.55)",
    textAlign: "center",
    lineHeight: s(24),
  },

  /* Feature Pills */
  featuresRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: s(28),
    gap: s(10),
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: s(100),
    paddingVertical: s(8),
    paddingHorizontal: s(14),
    gap: s(6),
    backdropFilter: "blur(10px)",
  },
  featureIcon: {
    fontSize: s(14),
  },
  featureText: {
    fontFamily: "System",
    fontSize: s(12),
    fontWeight: "500",
    color: "rgba(255,255,255,0.6)",
    letterSpacing: s(0.2),
  },

  /* Button */
  buttonWrap: {
    marginBottom: s(12),
  },
  loginButtonOuter: {
    position: "relative",
    borderRadius: s(16),
    overflow: "visible",
  },
  loginButtonGradient: {
    borderRadius: s(16),
    paddingVertical: s(16),
    paddingHorizontal: s(24),
  },
  loginButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: s(12),
  },
  buttonShadow: {
    position: "absolute",
    bottom: -s(4),
    left: s(8),
    right: s(8),
    height: s(20),
    borderRadius: s(16),
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: -1,
    blurRadius: s(12),
  },
  loginButtonText: {
    fontFamily: "System",
    fontSize: s(16),
    fontWeight: "600",
    color: "#1A1A2E",
    letterSpacing: s(0.3),
  },
  termsText: {
    fontFamily: "System",
    fontSize: s(11.5),
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    marginTop: s(14),
    lineHeight: s(17),
  },
  termsLink: {
    color: "rgba(255,255,255,0.6)",
    textDecorationLine: "underline",
  },

  /* Footer */
  footerWrap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: s(8),
    marginBottom: s(8),
  },
  footerDot: {
    width: s(4),
    height: s(4),
    borderRadius: s(2),
    backgroundColor: "#FF6B35",
  },
  footerText: {
    fontFamily: "System",
    fontSize: s(11),
    color: "rgba(255,255,255,0.25)",
    letterSpacing: s(0.5),
  },
});