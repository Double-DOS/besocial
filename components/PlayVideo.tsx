import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "aws-amplify";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, SafeAreaView } from "react-native";

const PlayVideo = () => {
  const video = React.useRef(null);
  const [videoObjects, setVideoObjects] = useState<null | []>();
  const fetchVideos = async () => {
    const jsonValue = await AsyncStorage.getItem("uploads");
    const existingUploads = jsonValue != null ? JSON.parse(jsonValue) : null;
    if (existingUploads != null && existingUploads.length > 0) {
      const uploadedMediaUrls = existingUploads.map(
        (upload: { videoKey: string; thumbnailKey: string }) => {
          return {
            videoUri: Storage.get(upload.videoKey),
            thumbnailUri: Storage.get(upload.thumbnailKey),
          };
        }
      );
      setVideoObjects(uploadedMediaUrls);
    }
  };
  return (
    <SafeAreaView style={styled.player}>
      {videoObjects === null ? (
        <Text style={styled.text}>
          No videos to play Upload Videos to watch them!
        </Text>
      ) : (
        <FlatList
          data={videoObjects}
          keyExtractor={(videoObject) => videoObject.videoUri}
          renderItem={(videoObject) => (
            <Video
              key={videoObject.videoUri}
              ref={video}
              style={styled.video}
              source={{
                uri: videoObject.videoUri,
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styled = StyleSheet.create({
  player: {
    flex: 13,
    backgroundColor: "#EF258A",
    position: "relative",
  },
  text: {
    fontSize: 30,
  },
  video: {
    flex: 1,
  },
});

export default PlayVideo;
