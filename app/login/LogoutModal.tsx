import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Modal, Portal, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export const LogoutModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  const logout = () => {
    onClose();
    router.replace("/login");
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <ThemedText style={styles.modalText}>¿Cerrar sesión?</ThemedText>
        <ThemedView style={styles.buttonContainer}>
          <Button onPress={onClose} mode="text">
            Cancelar
          </Button>
          <Button onPress={logout} mode="text" textColor="black">
            Salir
          </Button>
        </ThemedView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    marginHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    width: "100%",
  },
});
