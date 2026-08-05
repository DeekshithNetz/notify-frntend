import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleSendNotification } from "../services/api";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function DashboardScreen() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
    if (!message.trim()) {
      Alert.alert("Empty Message", "Please enter a notification message.");
      return;
    }
    setSending(true);
    try {
      await handleSendNotification(message);
      setMessage("");
      Alert.alert("Sent", "Notification sent successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to send notification.");
    } finally {
      setSending(false);
    }
  }

  async function handleLogout() {
    try {
      setShowMenu(false); // Close menu immediately
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good to see you,</Text>
            <Text style={styles.userName}>{user?.name || "User"}</Text>
          </View>
          
          {/* Profile Avatar Button */}
          <TouchableOpacity 
            style={styles.avatar} 
            onPress={() => setShowMenu(!showMenu)}
            activeOpacity={0.6}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </TouchableOpacity>
        </View>
        <Text>Is Admin: {user?.role === "admin" ? "YES" : "NO"}</Text>

        {/* ── Profile Card ── */}
        {user && (
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Account</Text>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Name</Text>
              <Text style={styles.rowValue}>{user.name}</Text>
               <Text style={styles.rowValue}>{user.role}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Email</Text>
              <Text style={styles.rowValue} numberOfLines={1}>
                {user.email}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Role</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || "User"}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ── Role Based Functionality ── */}
        {user?.role === "admin" ? (
          /* ── Admin: Compose ── */
          <View style={styles.card}>
            <Text style={styles.cardHeading}>Compose Notification</Text>
            <Text style={styles.cardSubtext}>
              This will be broadcasted to all subscribed users.
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Write your message here..."
              placeholderTextColor="#9CA3AF"
              value={message}
              onChangeText={setMessage}
              multiline
              textAlignVertical="top"
              maxLength={500}
            />

            <View style={styles.inputFooter}>
              <Text style={styles.charCount}>{message.length}/500</Text>
            </View>

            <TouchableOpacity
              style={[styles.button, sending && styles.buttonDisabled]}
              onPress={sendNotification}
              disabled={sending}
              activeOpacity={0.7}
            >
              {sending ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Send Notification</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          /* ── User: Subscribed Message ── */
          <View style={styles.card}>
            <View style={styles.centerContent}>
              <View style={styles.subscribedIcon}>
                <Text style={styles.subscribedCheck}>✓</Text>
              </View>
              <Text style={styles.infoTitle}>You're Subscribed</Text>
              <Text style={styles.infoBody}>
                You will receive push notifications directly on your device when an admin sends an update.
              </Text>
            </View>
          </View>
        )}

        {/* Bottom padding for scroll */}
        <View style={styles.bottomPad} />
      </ScrollView>

      {/* ── Profile Dropdown Menu (Outside ScrollView so it doesn't scroll) ── */}
      {showMenu && (
        <>
          {/* Invisible background to close menu when tapping away */}
          <TouchableOpacity 
            style={styles.menuOverlay} 
            activeOpacity={1} 
            onPress={() => setShowMenu(false)} 
          />
          {/* The actual menu card */}
          <View style={styles.menuCard}>
            <Text style={styles.menuName} numberOfLines={1}>{user?.name}</Text>
            <Text style={styles.menuEmail} numberOfLines={1}>{user?.email}</Text>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleLogout}
              activeOpacity={0.6}
            >
              <Text style={styles.menuButtonText}>Sign out</Text>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // Properly handles Android status bars/notches without extra libraries
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) : 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 24,
  },
  bottomPad: {
    height: 40,
  },

  /* Top Bar */
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 28,
  },
  greeting: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
    letterSpacing: -0.2,
  },
  userName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.8,
    marginTop: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4F46E5",
    letterSpacing: 0.5,
  },

  /* Card */
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 16,
    lineHeight: 18,
  },

  /* Info Rows */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    maxWidth: "60%",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },

  /* Role Badge */
  roleBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4F46E5",
    letterSpacing: 0.2,
  },

  /* Text Input */
  textInput: {
    width: "100%",
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    paddingBottom: 32,
    fontSize: 15,
    fontWeight: "400",
    color: "#111827",
    backgroundColor: "#FAFAFA",
    lineHeight: 22,
  },
  inputFooter: {
    alignItems: "flex-end",
    marginTop: -26,
    paddingRight: 14,
    marginBottom: 18,
  },
  charCount: {
    fontSize: 11,
    color: "#D1D5DB",
    fontWeight: "500",
  },

  /* Button */
  button: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },

  /* User Subscribed UI */
  centerContent: {
    alignItems: "center",
    paddingVertical: 12,
  },
  subscribedIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  subscribedCheck: {
    fontSize: 24,
    color: "#10B981",
    fontWeight: "700",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  infoBody: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 260,
  },

  /* ── Profile Dropdown Menu ── */
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.05)", // Very subtle native feel
    zIndex: 10,
  },
  menuCard: {
    position: "absolute",
    top: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 16 : 16,
    right: 24,
    width: 240,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 16,
    zIndex: 20,
    // Clean iOS/Android native shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5, 
  },
  menuName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  menuEmail: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 8,
  },
  menuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#EF4444", // Soft red for destructive action
  },
  menuArrow: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "400",
  },
});