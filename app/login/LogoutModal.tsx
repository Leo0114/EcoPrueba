import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Modal, Portal, Button, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

const LogoutModal = ({
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
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    modalContainer: {
      backgroundColor: colors.surface,
    },
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[
          styles.modalContainer,
          dynamicStyles.modalContainer,
        ]}
      >
        <ThemedText style={styles.modalText}>¿Cerrar sesión?</ThemedText>
        <ThemedView
          style={[styles.buttonContainer, dynamicStyles.modalContainer]}
        >
          <Button onPress={onClose} mode="text">
            Cancelar
          </Button>
          <Button onPress={logout} mode="text" textColor={colors.onBackground}>
            Salir
          </Button>
        </ThemedView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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

export default LogoutModal;
