import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import CreatePostButton from "../assets/images/create.png";

const HomeBottomNav = ({
  goToCreatePost,
  fetchValues,
}: {
  goToCreatePost: () => void;
  fetchValues: () => void;
}) => {
  return (
    <View style={styled.container}>
      <TouchableOpacity onPress={fetchValues}>
        <Ionicons name="home" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToCreatePost}>
        <Ionicons name="ios-search" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToCreatePost}>
        <Image source={CreatePostButton} alt={"create_post_button"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToCreatePost}>
        <Ionicons name="ios-wallet" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToCreatePost}>
        <FontAwesome5 name="user-alt" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeBottomNav;

const styled = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});
