import { ResizeMode, Video } from "expo-av";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SingleVideo = ({
  videoUri,
  thumbnailUri,
}: {
  videoUri: string;
  thumbnailUri: string;
}) => {
  const video = React.useRef(null);

  return (
    <View style={styled.video}>
      <Text style={styled.text}>Video</Text>
      <Video
        key={videoUri}
        ref={video}
        style={styled.video}
        source={{
          uri: videoUri,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};
const styled = StyleSheet.create({
  video: {
    backgroundColor: "orange",
  },
  text: {
    color: "black",
  },
});
export default SingleVideo;
