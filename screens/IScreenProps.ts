import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation";

export type CreatePostProps = NativeStackScreenProps<
  StackParamList,
  "CreatePost"
>;
export type HomeProps = NativeStackScreenProps<StackParamList, "Home">;
