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
import { Storage } from "aws-amplify";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UploadPost = () => {
  const [thumbnail, setThumbnail] = useState<null | string>(null);

  const generateThumbnail = async (videoUri: string) => {
    const result = await VideoThumbnails.getThumbnailAsync(videoUri, {
      time: 2500,
    });
    setThumbnail(result.uri);
    return result.uri;
  };

  const uploadMediaToStorage = async (mediaUri: string, key: string) => {
    const response = await fetch(mediaUri);
    const blob = response.blob();

    const result = await Storage.put(key, blob);
    return result.key;
  };

  const getFileExtension = (fileName: string) => {
    const splitResult = fileName.split(".");
    console.log("split file name", splitResult);

    return splitResult;
  };
  const getUploadedMedia = async () => {
    const jsonValue = await AsyncStorage.getItem("uploads");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const uploadVideoAndThumbnailToStorage = async (
    videoUri: string,
    fileName: string,
    thumbnailUri: string
  ) => {
    const existingUploads = await getUploadedMedia();
    const fileExtension = getFileExtension(fileName);
    var uploadKey = fileExtension[0];
    var extension = fileExtension[1];
    console.log(uploadKey, extension);
    if (existingUploads != null && existingUploads.length > 0) {
      const uploadedPhotoKeys = existingUploads.map(
        (upload: { videoKey: any }) => upload.videoKey
      );
      console.log(uploadedPhotoKeys);
      while (uploadedPhotoKeys.includes(uploadKey + "." + extension)) {
        uploadKey = uploadKey + "x";
      }
    }
    uploadKey = uploadKey + "." + extension;

    const videoStorageKey = await uploadMediaToStorage(
      videoUri,
      "videos/" + uploadKey
    );
    uploadKey = fileExtension[0];
    if (existingUploads != null && existingUploads.length > 0) {
      const uploadedThumbnailKeys = existingUploads.map(
        (upload: { thumbnailKey: any }) => upload.thumbnailKey
      );
      console.log(uploadedThumbnailKeys);

      while (uploadedThumbnailKeys.includes(uploadKey + ".jpeg")) {
        uploadKey = uploadKey + "x";
      }
      uploadKey = uploadKey + ".jpeg";
    }
    const thumbnailStorageKey = await uploadMediaToStorage(
      thumbnailUri,
      "thumbnails/" + uploadKey
    );
    const value = {
      videoKey: videoStorageKey,
      thumbnailKey: thumbnailStorageKey,
    };
    console.log(
      "data uploaded successfully to s3 storage",
      videoStorageKey,
      thumbnailStorageKey
    );

    await storeData(value);
  };

  const storeData = async (value: {
    videoKey: string;
    thumbnailKey: string;
  }) => {
    const existingUploads = await getUploadedMedia();
    if (existingUploads != null && existingUploads.length > 0) {
      existingUploads.push(value);
      const newValue = existingUploads;
      await AsyncStorage.setItem("uploads", JSON.stringify(newValue));
    } else {
      await AsyncStorage.setItem("uploads", JSON.stringify([value]));
    }
    console.log("data stored successfully to local storage");
  };

  const selectVideoFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const generatedThumbnail = await generateThumbnail(result.assets[0].uri);
      uploadVideoAndThumbnailToStorage(
        result.assets[0].uri,
        result.assets[0].fileName ?? "upload-video.MOV",
        generatedThumbnail
      );
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
