import {
   View,
   Text,
   StyleSheet,
   Alert,
   FlatList,
   useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
   const rndNum = Math.floor(Math.random() * (max - min)) + min;

   if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
   } else {
      return rndNum;
   }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
   const initialGuess = generateRandomBetween(1, 100, userNumber);
   const [currentGuess, setCurrentGuess] = useState(initialGuess);
   const [guessRounds, setGuessRounds] = useState([initialGuess]);
   const { width, height } = useWindowDimensions();

   useEffect(() => {
      if (currentGuess === userNumber) {
         onGameOver(guessRounds.length);
      }
   }, [currentGuess, userNumber, onGameOver]);

   useEffect(() => {
      minBoundary = 1;
      maxBoundary = 100;
   }, []);

   const nextGuessHandler = (direction) => {
      if (
         (direction === "lower" && currentGuess < userNumber) ||
         (direction === "greater" && currentGuess > userNumber)
      ) {
         Alert.alert("Don't lie", "You know that this is wrong...", [
            {
               text: "Sorry",
               style: "cancel",
            },
         ]);
         return;
      }

      if (direction === "lower") {
         maxBoundary = currentGuess;
      } else {
         minBoundary = currentGuess + 1;
      }
      // console.log(minBoundary, maxBoundary);
      const newRndNumber = generateRandomBetween(
         minBoundary,
         maxBoundary,
         currentGuess,
      );
      setCurrentGuess(newRndNumber);
      setGuessRounds((prevGuessRound) => [newRndNumber, ...prevGuessRound]);
   };

   return (
      <View style={styles.screen}>
         <Title>Opponent's Guess</Title>
         <NumberContainer>{currentGuess}</NumberContainer>
         <Card>
            <InstructionText style={styles.InstructionText}>
               Higher or lower?
            </InstructionText>
            <View style={styles.buttonsContainer}>
               <View style={styles.buttonContainer}>
                  <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                     <Ionicons name="md-remove" size={24} color="white" />
                  </PrimaryButton>
               </View>
               <View style={styles.buttonContainer}>
                  <PrimaryButton
                     onPress={nextGuessHandler.bind(this, "greater")}>
                     <Ionicons name="md-add" size={24} color="white" />
                  </PrimaryButton>
               </View>
            </View>
         </Card>
         <View style={styles.listContainer}>
            <FlatList
               data={guessRounds}
               renderItem={(itemData) => (
                  <GuessLogItem
                     roundNUmber={guessRounds.length - itemData.index}
                     guess={itemData.item}
                  />
               )}
               keyExtractor={(item) => item}
            />
         </View>
      </View>
   );
};

export default GameScreen;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      marginTop: 50,
      padding: 12,
      alignItems: "center",
   },
   InstructionText: {
      marginBottom: 12,
   },
   buttonsContainer: {
      flexDirection: "row",
      paddingTop: 10,
   },
   buttonContainer: {
      flex: 1,
   },
   listContainer: {
      flex: 1,
      padding: 16,
   },
});
