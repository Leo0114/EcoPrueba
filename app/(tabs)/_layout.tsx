import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { darkColors, lightColors } from "@/constants/Theme";
import { HapticTab } from "@/components/HapticTab";
import { Ionicons } from "@expo/vector-icons";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import LogoutModal from "../login/LogoutModal";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  let themetoapply = MD3LightTheme;
  let colorstoapply = lightColors;
  if (colorScheme === "dark") {
    themetoapply = MD3DarkTheme;
    colorstoapply = darkColors;
  }

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  return (
    <>
      <LogoutModal visible={isModalVisible} onClose={hideModal} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorstoapply.colors.primary,
          headerStyle: {
            backgroundColor: colorstoapply.colors.background,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },

          headerTintColor: colorstoapply.colors.primary,
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: [
            { backgroundColor: colorstoapply.colors.background },
            Platform.select({
              ios: {
                position: "absolute",
              },
              default: {},
            }),
          ],
          headerRight: () => (
            <Ionicons
              color={colorstoapply.colors.primary}
              size={28}
              name="log-out-outline"
              onPress={showModal}
              style={{ marginRight: 16 }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Clientes",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="people-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Tienda",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="storefront-outline" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
