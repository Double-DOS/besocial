import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
} from "react-native";
import SingleVideo from "./SingleVideo";

const PlayVideo = ({ videoObjects }) => {
  return (
    <View style={styled.container}>
      {videoObjects === null ? (
        <Text style={styled.text}>
          No videos to play Upload Videos to watch them!
        </Text>
      ) : (
        <SafeAreaView style={styled.player}>
          <FlatList
            data={videoObjects}
            keyExtractor={(videoObject) => videoObject.videoUri}
            renderItem={({ item }) => (
              <SingleVideo
                videoUri={item.videoUri}
                thumbnailUri={item.thumbnailUri}
              />
            )}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 13,
    position: "relative",
  },
  player: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    fontSize: 30,
    color: "black",
  },
});

export default PlayVideo;
