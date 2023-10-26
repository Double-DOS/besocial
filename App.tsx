import { StyleSheet, View } from "react-native";
import AppStack from "./navigation";
import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

export default function App() {
  return (
    <View style={styles.container}>
      <AppStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
