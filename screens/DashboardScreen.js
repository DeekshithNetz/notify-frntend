import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleSendNotification } from "../services/api";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Path, Polyline, Line, Rect } from "react-native-svg";

/* ─── Responsive Scale ─── */
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 390;
function s(size) {
  return size * scale;

}

/* ─── Floating Orb ─── */
function FloatingOrb({ style, color1, color2, size = s(120) }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 5000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 5000 + Math.random() * 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -s(18)] });
  const translateX = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, s(8), 0] });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity: 0.1,
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

/* ─── User Avatar Svg ─── */
function UserAvatar({ size = s(52) }) {
  const half = size / 2;
  const headR = size * 0.15;
  const bodyR = size * 0.28;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Circle cx={half} cy={half} r={half} fill="rgba(255,255,255,0.08)" />
      <Circle cx={half} cy={half - bodyR * 0.25} r={headR} fill="rgba(255,255,255,0.35)" />
      <Path
        d={`M ${half - bodyR} ${half + bodyR * 0.85} Q ${half - bodyR} ${half + bodyR * 0.1} ${half} ${half + bodyR * 0.05} Q ${half + bodyR} ${half + bodyR * 0.1} ${half + bodyR} ${half + bodyR * 0.85}`}
        fill="rgba(255,255,255,0.35)"
      />
    </Svg>
  );
}

/* ─── Send Icon Svg ─── */
function SendIcon({ size = s(20), color = "#FFFFFF" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 2L11 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* ─── Logout Icon Svg ─── */
function LogoutIcon({ size = s(18), color = "rgba(255,255,255,0.5)" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="16 17 21 12 16 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="21" y1="12" x2="9" y2="12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* ─── Mail Icon Svg ─── */
function MailIcon({ size = s(18), color = "#FF6B35" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="2" y="4" width="20" height="16" rx="3"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* ─── Shield Icon Svg (for role) ─── */
function ShieldIcon({ size = s(18), color = "#6C63FF" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12l2 2 4-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/* ─── Info Row Component ─── */
function InfoRow({ icon, label, value, delay = 0 }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(s(12))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.infoRow,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.infoIconWrap}>{icon}</View>
      <View style={styles.infoTextWrap}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
      </View>
    </Animated.View>
  );
}

/* ─── Glass Card ─── */
function GlassCard({ children, style, delay = 0 }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 70, friction: 10, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.glassCard,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

/* ═══════════════════════════════════════════
   ─── MAIN DASHBOARD SCREEN ───
   ═══════════════════════════════════════════ */
export default function DashboardScreen() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  /* Header animations */
  const headerAnim = useRef(new Animated.Value(0)).current;
  const nameAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUser();

    Animated.parallel([
      Animated.timing(headerAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(nameAnim, { toValue: 1, duration: 600, delay: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  async function loadUser() {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }

  async function sendNotification() {
    if (!message.trim()) {
      Alert.alert("Oops", "Please enter a notification message.");
      return;
    }

    setSending(true);
    try {
      await handleSendNotification(message);
      setMessage("");
      Alert.alert("Success", "Notification sent successfully.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to send notification.");
    } finally {
      setSending(false);
    }
  }

  async function handleLogout() {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={["#0F0C29", "#1A1A40", "#24243E"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.gradient}
      >
        {/* Background orbs */}
        <FloatingOrb color1="#6C63FF" color2="#FF6B35" size={s(200)} style={{ top: -s(60), left: -s(60) }} />
        <FloatingOrb color1="#FF6B35" color2="#FFC107" size={s(160)} style={{ bottom: s(80), right: -s(50) }} />
        <FloatingOrb color1="#00D2FF" color2="#6C63FF" size={s(100)} style={{ top: s(350), left: -s(30) }} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* ─── Top Safe Spacer ─── */}
          <View style={styles.topSpacer} />

          {/* ─── Header ─── */}
          <Animated.View
            style={[
              styles.headerRow,
              {
                opacity: headerAnim,
                transform: [{ translateY: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [s(-15), 0] }) }],
              },
            ]}
          >
            <View style={styles.headerLeft}>
              <Text style={styles.brandText}>Notify</Text>
              <View style={styles.liveDot} />
            </View>

            {/* Avatar */}
            <TouchableOpacity style={styles.avatarWrap} activeOpacity={0.7}>
              {user ? (
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitials}>{getInitials(user.name)}</Text>
                </View>
              ) : (
                <UserAvatar size={s(44)} />
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* ─── Welcome Section ─── */}
          <Animated.View
            style={[
              styles.welcomeWrap,
              {
                opacity: nameAnim,
                transform: [{ translateY: nameAnim.interpolate({ inputRange: [0, 1], outputRange: [s(12), 0] }) }],
              },
            ]}
          >
            <Text style={styles.welcomeLabel}>Welcome back,</Text>
            <Text style={styles.welcomeName}>{user?.name || "User"}</Text>
          </Animated.View>

          {/* ─── User Info Card ─── */}
          {user && (
            <GlassCard style={styles.infoCard} delay={300}>
              <Text style={styles.cardTitle}>Account Details</Text>
              <View style={styles.infoSeparator} />

              <InfoRow
                icon={<UserAvatar size={s(36)} />}
                label="Full Name"
                value={user.name}
                delay={400}
              />
              <InfoRow
                icon={<MailIcon size={s(20)} />}
                label="Email Address"
                value={user.email}
                delay={500}
              />
              <InfoRow
                icon={<ShieldIcon size={s(20)} />}
                label="Role"
                value={user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || "User"}
                delay={600}
              />
            </GlassCard>
          )}

          {/* ─── Admin: Send Notification Card ─── */}
          {user?.role === "admin" && (
            <GlassCard style={styles.sendCard} delay={700}>
              <View style={styles.sendCardHeader}>
                <View style={styles.sendCardIconWrap}>
                  <SendIcon size={s(18)} color="#FF6B35" />
                </View>
                <View>
                  <Text style={styles.cardTitle}>Send Notification</Text>
                  <Text style={styles.cardSubtitle}>Broadcast to all users</Text>
                </View>
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  placeholder="Type your notification message..."
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  textAlignVertical="top"
                  maxLength={500}
                />
                <Text style={styles.charCount}>{message.length}/500</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={sendNotification}
                disabled={sending}
                style={[styles.sendButton, sending && styles.sendButtonDisabled]}
              >
                <LinearGradient
                  colors={sending ? ["#555", "#444"] : ["#FF6B35", "#FF3CAC"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.sendButtonGradient}
                >
                  <SendIcon size={s(18)} color="#FFFFFF" />
                  <Text style={styles.sendButtonText}>
                    {sending ? "Sending..." : "Send Notification"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </GlassCard>
          )}

          {/* ─── Non-Admin Message ─── */}
          {user && user.role !== "admin" && (
            <GlassCard style={styles.viewerCard} delay={700}>
              <View style={styles.viewerIconWrap}>
                <MailIcon size={s(28)} color="#6C63FF" />
              </View>
              <Text style={styles.viewerTitle}>Notification Viewer</Text>
              <Text style={styles.viewerText}>
                You're logged in as a viewer. Admins can send notifications from this dashboard.
              </Text>
            </GlassCard>
          )}

          {/* ─── Logout Button ─── */}
          <GlassCard style={styles.logoutCard} delay={850}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <LogoutIcon size={s(18)} color="rgba(255,255,255,0.5)" />
              <Text style={styles.logoutText}>Sign Out</Text>
              <View style={styles.logoutArrow}>
                <Text style={styles.logoutArrowText}>→</Text>
              </View>
            </TouchableOpacity>
          </GlassCard>

          {/* ─── Bottom Spacer ─── */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </LinearGradient>
    </View>
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
  scrollContent: {
    paddingHorizontal: s(22),
  },
  topSpacer: {
    height: s(16),
  },
  bottomSpacer: {
    height: s(40),
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: s(8),
    marginBottom: s(28),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(8),
  },
  brandText: {
    fontFamily: "System",
    fontSize: s(22),
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: s(-0.5),
  },
  liveDot: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: "#4ADE80",
  },
  avatarWrap: {
    borderRadius: s(24),
    overflow: "hidden",
  },
  avatarCircle: {
    width: s(44),
    height: s(44),
    borderRadius: s(22),
    backgroundColor: "rgba(255,107,53,0.25)",
    borderWidth: 1.5,
    borderColor: "rgba(255,107,53,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    fontFamily: "System",
    fontSize: s(16),
    fontWeight: "700",
    color: "#FF6B35",
  },

  /* Welcome */
  welcomeWrap: {
    marginBottom: s(24),
  },
  welcomeLabel: {
    fontFamily: "System",
    fontSize: s(14),
    fontWeight: "400",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: s(0.3),
  },
  welcomeName: {
    fontFamily: "System",
    fontSize: s(30),
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: s(-1),
    marginTop: s(2),
  },

  /* Glass Card Base */
  glassCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: s(20),
    padding: s(20),
    marginBottom: s(16),
  },

  /* Card Titles */
  cardTitle: {
    fontFamily: "System",
    fontSize: s(17),
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: s(-0.3),
  },
  cardSubtitle: {
    fontFamily: "System",
    fontSize: s(12),
    color: "rgba(255,255,255,0.4)",
    marginTop: s(2),
  },
  infoSeparator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginVertical: s(16),
  },

  /* Info Card */
  infoCard: {},
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(14),
    paddingVertical: s(10),
  },
  infoIconWrap: {
    width: s(40),
    height: s(40),
    borderRadius: s(12),
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  infoTextWrap: {
    flex: 1,
    gap: s(3),
  },
  infoLabel: {
    fontFamily: "System",
    fontSize: s(11),
    fontWeight: "500",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: s(0.5),
    textTransform: "uppercase",
  },
  infoValue: {
    fontFamily: "System",
    fontSize: s(15),
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
  },

  /* Send Card */
  sendCard: {},
  sendCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(12),
    marginBottom: s(16),
  },
  sendCardIconWrap: {
    width: s(40),
    height: s(40),
    borderRadius: s(12),
    backgroundColor: "rgba(255,107,53,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrap: {
    position: "relative",
    marginBottom: s(16),
  },
  input: {
    width: "100%",
    minHeight: s(110),
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: s(14),
    padding: s(14),
    paddingBottom: s(30),
    backgroundColor: "rgba(0,0,0,0.25)",
    color: "#FFFFFF",
    fontFamily: "System",
    fontSize: s(15),
    fontWeight: "400",
    lineHeight: s(22),
  },
  charCount: {
    position: "absolute",
    bottom: s(10),
    right: s(14),
    fontFamily: "System",
    fontSize: s(11),
    color: "rgba(255,255,255,0.25)",
  },
  sendButton: {
    borderRadius: s(14),
    overflow: "hidden",
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: s(10),
    paddingVertical: s(15),
    borderRadius: s(14),
  },
  sendButtonText: {
    fontFamily: "System",
    fontSize: s(15),
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: s(0.3),
  },

  /* Viewer Card */
  viewerCard: {
    alignItems: "center",
    paddingVertical: s(30),
    paddingHorizontal: s(24),
  },
  viewerIconWrap: {
    width: s(60),
    height: s(60),
    borderRadius: s(30),
    backgroundColor: "rgba(108,99,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: s(16),
  },
  viewerTitle: {
    fontFamily: "System",
    fontSize: s(18),
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: s(8),
  },
  viewerText: {
    fontFamily: "System",
    fontSize: s(13),
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    lineHeight: s(20),
    maxWidth: s(260),
  },

  /* Logout Card */
  logoutCard: {
    paddingVertical: s(6),
    paddingHorizontal: s(6),
    marginBottom: s(8),
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
    paddingVertical: s(14),
    paddingHorizontal: s(16),
    borderRadius: s(14),
  },
  logoutText: {
    flex: 1,
    fontFamily: "System",
    fontSize: s(15),
    fontWeight: "500",
    color: "rgba(255,255,255,0.5)",
  },
  logoutArrow: {
    width: s(28),
    height: s(28),
    borderRadius: s(14),
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutArrowText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: s(14),
    fontWeight: "600",
  },
});