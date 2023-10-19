import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";

const UploadPost = () => {
  const [video, setVideo] = useState<null | string>(null);
  const [thumbnail, setThumbnail] = useState<null | string>(null);

  const generateThumbnail = async (videoUri: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 2500,
      });
      setThumbnail(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  const selectVideoFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      generateThumbnail(result.assets[0].uri);
    }
  };
  return thumbnail ? (
    <View style={styled.thumbnailContainer}>
      <Image
        source={{
          uri: thumbnail,
        }}
        alt="video_preview_thumbnail"
        style={styled.thumbnail}
      />
      <View style={styled.previewContainer}>
        <Text style={styled.previewText}>Preview</Text>
      </View>
    </View>
  ) : (
    <View style={styled.addContentContainer}>
      <TouchableOpacity
        style={styled.addContentButton}
        onPress={() => selectVideoFile()}
      >
        <FontAwesome5 name="plus" size={29} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styled = StyleSheet.create({
  addContentContainer: {
    borderRadius: 21,
    width: 155,
    height: 211,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#EF258A",
  },
  addContentButton: {
    borderRadius: 50,
    width: 51,
    height: 51,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    flex: 1,
    borderRadius: 21,
  },
  thumbnailContainer: {
    position: "relative",
    width: 155,
    height: 211,
    alignSelf: "center",
  },
  previewContainer: {
    position: "absolute",
    left: 10,
    top: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    width: 68,
    height: 29,
    alignItems: "center",
    justifyContent: "center",
  },
  previewText: {
    textAlign: "center",
  },
});

export default UploadPost;
