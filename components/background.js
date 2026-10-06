import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

export default function Background({ children }) {
  return (
    <LinearGradient
      colors={["#071B3A", "#123E73", "#2878D0"]}
      style={styles.background}
    >
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.stars}>
        <View style={styles.star1} />
        <View style={styles.star2} />
        <View style={styles.star3} />
        <View style={styles.star4} />
      </View>

      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  circle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(76, 150, 235, 0.25)",
    top: -130,
    left: -100,
  },

  circle2: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: "rgba(65, 130, 220, 0.18)",
    bottom: -180,
    right: -100,
  },

  stars: {
    ...StyleSheet.absoluteFillObject,
  },

  star1: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "white",
    top: 80,
    left: 50,
  },

  star2: {
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: "white",
    top: 160,
    right: 60,
  },

  star3: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "white",
    top: 250,
    left: 100,
  },

  star4: {
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: "white",
    bottom: 180,
    right: 100,
  },
});