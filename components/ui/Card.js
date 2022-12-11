import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

const Card = ({ children }) => {
   return <View style={styles.inputContainer}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
   inputContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      marginHorizontal: 24,
      padding: 16,
      borderRadius: 8,
      backgroundColor: Colors.primary800,
      elevation: 4,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.25,
   },
});
