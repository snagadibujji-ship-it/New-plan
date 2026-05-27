import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@/context/AuthContext";
import colors from "@/constants/colors";

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { token } = useAuth();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
      </View>

      <View style={styles.center}>
        {!token ? (
          <>
            <Feather name="lock" size={40} color={colors.light.mutedForeground} />
            <Text style={styles.emptyTitle}>Sign in to view orders</Text>
            <Text style={styles.emptySub}>Track your deliveries after logging in</Text>
            <TouchableOpacity style={styles.signInBtn} onPress={() => router.push("/auth")}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Feather name="shopping-bag" size={40} color={colors.light.mutedForeground} />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySub}>Your order history will appear here</Text>
            <TouchableOpacity style={styles.signInBtn} onPress={() => router.push("/")}>
              <Text style={styles.signInText}>Browse Vendors</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: colors.light.foreground,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 32,
    marginBottom: 60,
  },
  emptyTitle: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    color: colors.light.foreground,
    marginTop: 8,
  },
  emptySub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: colors.light.mutedForeground,
    textAlign: "center",
  },
  signInBtn: {
    marginTop: 12,
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: colors.light.primary,
    borderRadius: 24,
  },
  signInText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
});
