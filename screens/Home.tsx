import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "aws-amplify";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { HomeProps } from "./IScreenProps";
import CreatePostButton from "../components/vectors/CreatePostButton";
import HomeBottomNav from "../components/HomeBottomNav";
import PlayVideo from "../components/PlayVideoScroller";
const HomeScreen = ({ navigation }: HomeProps) => {
  const [videoObjects, setVideoObjects] = useState<
    | null
    | {
        videoUri: string;
        thumbnailUri: string;
      }[]
  >();
  const fetchVideos = async () => {
    // await AsyncStorage.clear();
    const jsonValue = await AsyncStorage.getItem("uploads");
    console.log(jsonValue);
    const existingUploads = jsonValue != null ? JSON.parse(jsonValue) : null;
    const uploadedMediaUrls = [];
    if (existingUploads != null && existingUploads.length > 0) {
      for (let index = 0; index < existingUploads.length; index++) {
        const element = existingUploads[index];
        const videoUri = await Storage.get(element.videoKey);
        const thumbnailUri = await Storage.get(element.thumbnailKey);
        const resolvedValue = {
          videoUri: videoUri,
          thumbnailUri: thumbnailUri,
        };
        uploadedMediaUrls.push(resolvedValue);
      }

      console.log(uploadedMediaUrls);
      setVideoObjects(uploadedMediaUrls);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);
  return (
    <View style={styled.container}>
      <PlayVideo videoObjects={videoObjects} />

      <HomeBottomNav
        goToCreatePost={() => navigation.navigate("CreatePost")}
        fetchValues={fetchVideos}
      />
    </View>
  );
};

export default HomeScreen;

const styled = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    height: "100%",
  },
});
