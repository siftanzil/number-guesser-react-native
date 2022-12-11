import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";

import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
   const [userNumber, setUserNumber] = useState();
   const [gameIsOver, setGameIsOver] = useState(true);
   const [guessRounds, setGuessRounds] = useState(0);

   const [fontsLoaded] = useFonts({
      "open-sans": require("./assets/fonts/junegull.ttf"),
      "open-sans-bold": require("./assets/fonts/LuckiestGuy.ttf"),
   });

   if (!fontsLoaded) {
      return <AppLoading />;
   }

   const pickNumberHandler = (pickedNumber) => {
      setUserNumber(pickedNumber);
      setGameIsOver(false);
   };
   const gameOverHandler = (numberOfRounds) => {
      setGameIsOver(true);
      setGuessRounds(numberOfRounds);
   };

   const startNewGameHandler = () => {
      setUserNumber(null);
      setGuessRounds(0);
   };

   let screen = <StartGameScreen onPickNumber={pickNumberHandler} />;
   if (userNumber) {
      screen = (
         <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
      );
   }

   if (gameIsOver && userNumber) {
      screen = (
         <GameOverScreen
            roundsNumber={guessRounds}
            userNumber={userNumber}
            onStartNewGame={startNewGameHandler}
         />
      );
   }

   return (
      <>
         <StatusBar style="light" />
         <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.rootScreen}>
            <ImageBackground
               source={require("./assets/images/background.jpg")}
               resizeMode="cover"
               style={styles.rootScreen}
               imageStyle={styles.ImageBackground}>
               <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
         </LinearGradient>
      </>
   );
}

const styles = StyleSheet.create({
   rootScreen: {
      flex: 1,
   },
   ImageBackground: {
      opacity: 0.15,
   },
});
