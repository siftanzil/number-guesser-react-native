import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
   return (
      <View style={styles.rootContainer}>
         <Title>GAME OVER!</Title>
         <View style={styles.imageContainer}>
            <Image
               style={styles.image}
               source={require("../assets/images/gameover.jpg")}
            />
         </View>
         <Text style={styles.summaryText}>
            Your phone needed{" "}
            <Text style={styles.highlightText}>{roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlightText}>{userNumber}</Text>.
         </Text>
         <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
   );
};

export default GameOverScreen;

const styles = StyleSheet.create({
   rootContainer: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
      alignItems: "center",
   },
   imageContainer: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 3,
      borderColor: Colors.primary800,
      overflow: "hidden",
      margin: 36,
   },
   image: {
      resizeMode: "center",
      width: 300,
      height: 300,
   },
   summaryText: {
      fontFamily: "open-sans",
      fontSize: 20,
      textAlign: "center",
      marginBottom: 20,
   },
   highlightText: {
      fontFamily: "open-sans-bold",
      fontWeight: "bold",
      color: "blue",
      fontSize: 30,
   },
});
