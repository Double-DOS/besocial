import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { HomeProps } from "./IScreenProps";
import CreatePostButton from "../components/vectors/CreatePostButton";
import HomeBottomNav from "../components/HomeBottomNav";
const HomeScreen = ({ navigation }: HomeProps) => {
  return (
    <View style={styled.container}>
      <View style={styled.player}>
        <Text style={styled.text}>Home Screen</Text>
      </View>

      <HomeBottomNav goToCreatePost={() => navigation.navigate("CreatePost")} />
    </View>
  );
};

export default HomeScreen;

const styled = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    height: "100%",
  },
  player: {
    flex: 13,
    backgroundColor: "#EF258A",
  },
  text: {
    fontSize: 30,
  },
});
