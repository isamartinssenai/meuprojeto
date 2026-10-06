import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import Background from "../components/background";

export default function Notificacao({ navigation }) {
  function enviarNotificacao() {
    Alert.alert(
      "🚨 ATENÇÃO!",
      "me faltou criatividade pra terminar kkkk"
    );
  }

  return (
    <Background>
      <View style={styles.container}>

        <Text style={styles.title}>
          NOTIFICAÇÃO
        </Text>

        <Text style={styles.subtitle}>
          Receba uma notificação
        </Text>

        <View style={styles.card}>

          <Text style={styles.icon}>
            🔔
          </Text>

          <Text style={styles.cardTitle}>
            Clique no botão
          </Text>

          <Text style={styles.cardText}>
            Clique no botão abaixo para receber uma notificação.
          </Text>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={enviarNotificacao}
        >
          <Text style={styles.buttonText}>
            Mostrar notificação
          </Text>
        </TouchableOpacity>

        

      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#B8D9FF",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 30,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(30, 80, 140, 0.7)",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  icon: {
    fontSize: 55,
    marginBottom: 15,
  },

  cardTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },

  cardText: {
    color: "#C8E1FF",
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },

  button: {
    width: "85%",
    height: 52,
    backgroundColor: "rgba(55, 130, 220, 0.8)",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  back: {
    width: "70%",
    height: 45,
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  backText: {
    color: "white",
    fontSize: 16,
  },
});