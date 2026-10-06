import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import Background from "../components/background";

export default function Home({ navigation }) {
  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.logo}>
          MeuProjeto
        </Text>

        <Text style={styles.subtitle}>
          Explore suas funcionalidades
        </Text>

        <Text style={styles.description}>
          Escolha uma opção para começar
        </Text>

        <View style={styles.grid}>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Audio")}
          >
            <Text style={styles.icon}>🎵</Text>

            <Text style={styles.cardTitle}>
              Áudio
            </Text>

            <Text style={styles.cardDescription}>
              Reproduza suas músicas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Camera")}
          >
            <Text style={styles.icon}>📷</Text>

            <Text style={styles.cardTitle}>
              Câmera
            </Text>

            <Text style={styles.cardDescription}>
              Tire suas fotos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Acelerometro")}
          >
            <Text style={styles.icon}>📱</Text>

            <Text style={styles.cardTitle}>
              Acelerômetro
            </Text>

            <Text style={styles.cardDescription}>
              Detecte movimentos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Gps")}
          >
            <Text style={styles.icon}>📍</Text>

            <Text style={styles.cardTitle}>
              GPS
            </Text>

            <Text style={styles.cardDescription}>
              Veja sua localização
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Scanner")}
          >
            <Text style={styles.icon}>🔍</Text>

            <Text style={styles.cardTitle}>
              Scanner
            </Text>

            <Text style={styles.cardDescription}>
              Leia QR Codes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Notificacao")}
          >
            <Text style={styles.icon}>🔔</Text>

            <Text style={styles.cardTitle}>
              Notificação
            </Text>

            <Text style={styles.cardDescription}>
              Receba lembretes
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 35,
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D8E9FF",
    textAlign: "center",
  },

  description: {
    fontSize: 13,
    color: "#9FC5F0",
    marginTop: 5,
    marginBottom: 25,
    textAlign: "center",
  },

  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    minHeight: 155,
    backgroundColor: "rgba(48, 126, 218, 0.85)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  icon: {
    fontSize: 35,
    marginBottom: 10,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },

  cardDescription: {
    color: "#D7EAFF",
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
  },
});