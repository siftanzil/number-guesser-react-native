import {
   View,
   Text,
   TextInput,
   StyleSheet,
   Alert,
   Dimensions,
   useWindowDimensions,
   KeyboardAvoidingView,
   ScrollView,
} from "react-native";
import React, { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const StartGameScreen = ({ onPickNumber }) => {
   const [enteredNumber, setEnteredNumber] = useState("");

   const { width, height } = useWindowDimensions();

   const numberInputHandler = (enteredText) => {
      setEnteredNumber(enteredText);
   };

   const resetInputHandler = () => {
      setEnteredNumber("");
   };

   const confirmInputHandler = () => {
      const chosenNumber = parseInt(enteredNumber);
      if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
         Alert.alert(
            "Invalid Number!",
            "Number has to be a number between 1 and 99",
            [
               {
                  text: "okay",
                  style: "destructive",
                  onPress: resetInputHandler,
               },
            ],
         );
         return;
      }
      onPickNumber(chosenNumber);
   };

   const marginTopDistance = height < 400 ? 30 : 100;

   return (
      <ScrollView style={styles.screen}>
         <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View
               style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
               <Title>Guess My Number</Title>
               <Card>
                  <InstructionText>Enter a Number</InstructionText>
                  <TextInput
                     style={styles.numberInput}
                     maxLength={2}
                     keyboardType="number-pad"
                     autoCapitalize="none"
                     autoCorrect={false}
                     value={enteredNumber}
                     onChangeText={numberInputHandler}
                  />
                  <View style={styles.buttonsContainer}>
                     <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>
                           Reset
                        </PrimaryButton>
                     </View>
                     <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>
                           Confirm
                        </PrimaryButton>
                     </View>
                  </View>
               </Card>
            </View>
         </KeyboardAvoidingView>
      </ScrollView>
   );
};

export default StartGameScreen;

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
   },
   rootContainer: {
      flex: 1,
      marginTop: deviceHeight < 400 ? 30 : 100,
      alignItems: "center",
   },
   numberInput: {
      height: 50,
      width: 70,
      fontSize: 32,
      borderBottomColor: Colors.accent500,
      borderBottomWidth: 2,
      marginVertical: 8,
      color: Colors.accent500,
      fontWeight: "bold",
      textAlign: "center",
   },
   buttonsContainer: {
      flexDirection: "row",
   },
   buttonContainer: {
      flex: 1,
   },
});
