import { StyleSheet, Image } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export interface ClienteResponse {
  nombreCliente: string;
  domicilio: string;
  razonSocial: string;
  domicilioFiscal: string;
  rfc: string;
  muestraPS: string;
}

interface ClienteInfoProps {
  data?: ClienteResponse;
}

const ClienteInfo: React.FC<ClienteInfoProps> = ({ data }) => {
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    card: {
      borderRadius: 12,
      padding: 20,
      marginVertical: 10,
      backgroundColor: colors.surface,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    div: { backgroundColor: colors.surface },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primary,
    },
    text: {
      fontSize: 16,
      color: colors.onSurface,
    },
    label: {
      fontWeight: "bold",
      color: colors.secondary,
    },
  });

  if (!data) {
    return (
      <ThemedView style={dynamicStyles.card}>
        <ThemedText style={dynamicStyles.text}>
          No hay información del cliente disponible.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={dynamicStyles.card}>
      <ThemedView style={[styles.headerContainer, dynamicStyles.div]}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          }}
          style={styles.profileImage}
        />
        <ThemedText style={dynamicStyles.header}>
          {data.nombreCliente}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.row, dynamicStyles.div]}>
        <Ionicons
          name="business-outline"
          size={16}
          color={colors.onSurface}
          style={styles.icon}
        />
        <ThemedText style={dynamicStyles.text}>
          <ThemedText style={dynamicStyles.label}>Empresa: </ThemedText>
          {data.razonSocial}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.row, dynamicStyles.div]}>
        <Ionicons
          name="location-outline"
          size={16}
          color={colors.onSurface}
          style={styles.icon}
        />
        <ThemedText style={dynamicStyles.text}>
          <ThemedText style={dynamicStyles.label}>Domicilio: </ThemedText>
          {data.domicilioFiscal}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.row, dynamicStyles.div]}>
        <Ionicons
          name="document-text-outline"
          size={16}
          color={colors.onSurface}
          style={styles.icon}
        />
        <ThemedText style={dynamicStyles.text}>
          <ThemedText style={dynamicStyles.label}>RFC: </ThemedText>
          {data.rfc}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
});

export default ClienteInfo;
