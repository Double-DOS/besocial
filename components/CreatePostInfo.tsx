import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreatePostInfo() {
  return (
    <View style={styled.createContainer}>
      <Text style={[styled.text, styled.createText]}>Create</Text>

      <View>
        <Text style={[styled.text, styled.descriptionText]}>
          Swipe to pick which type of content you want to create for your
          audiences and your profile
        </Text>
      </View>
    </View>
  );
}

const styled = StyleSheet.create({
  createContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    gap: 10,
    marginVertical: 20,
  },
  text: {
    textAlign: "center",
  },
  createText: {
    fontWeight: "900",
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 11,
    fontWeight: "400",
  },
});
