import React from "react";

import { View, Text } from "react-native";
import CreatePostInfo from "../components/CreatePostInfo";
import UploadPost from "../components/UploadPost";
import { CreatePostProps } from "./IScreenProps";

const CreatePostScreen = ({ navigation }: CreatePostProps) => {
  return (
    <View>
      <CreatePostInfo />
      <UploadPost />
    </View>
  );
};

export default CreatePostScreen;
