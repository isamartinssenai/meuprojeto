import { useState } from "react";

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";

import Background from "../components/background";

export default function Camera({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [foto, setFoto] = useState(null);
  const [camera, setCamera] = useState(null);

  if (!permission) {
    return <Background />;
  }

  if (!permission.granted) {
    return (
      <Background>
        <View style={styles.permission}>
          <Text style={styles.title}>CÂMERA</Text>

          <Text style={styles.text}>
            Precisamos da permissão para usar a câmera.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={requestPermission}
          >
            <Text style={styles.buttonText}>
              Permitir câmera
            </Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }

  async function tirarFoto() {
    if (camera) {
      const resultado = await camera.takePictureAsync();
      setFoto(resultado.uri);
    }
  }

  return (
    <Background>
      <View style={styles.container}>

        <Text style={styles.title}>
          CÂMERA
        </Text>

        <Text style={styles.subtitle}>
          Capture um momento
        </Text>

        {!foto ? (
          <>
            <View style={styles.cameraContainer}>
              <CameraView
                style={styles.camera}
                facing="back"
                ref={(ref) => setCamera(ref)}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={tirarFoto}
            >
              <Text style={styles.buttonText}>
                Tirar foto
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image
              source={{ uri: foto }}
              style={styles.foto}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => setFoto(null)}
            >
              <Text style={styles.buttonText}>
                Tirar outra
              </Text>
            </TouchableOpacity>
          </>
        )}

        

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

  permission: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
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
    marginBottom: 20,
    textAlign: "center",
  },

  cameraContainer: {
    width: "95%",
    height: 430,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },

  camera: {
    width: "100%",
    height: "100%",
  },

  foto: {
    width: "95%",
    height: 430,
    borderRadius: 20,
  },

  button: {
    width: "80%",
    height: 52,
    backgroundColor: "rgba(55, 130, 220, 0.8)",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
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

  text: {
    color: "#D7E9FF",
    fontSize: 17,
    textAlign: "center",
    marginVertical: 20,
  },
});