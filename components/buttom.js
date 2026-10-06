import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Buttom({ txt, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{txt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#404040",
    borderWidth: 1,
    borderColor: "#bc2525",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },

  text: {
    color: "white",
    fontSize: 20,
  },
});