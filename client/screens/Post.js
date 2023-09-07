import { SafeAreaView, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import FooterTabs from "../components/nav/FooterTabs";

export default function Post() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Text>Post</Text>
      <View style={{ flex: 1, justifyContent: "flex-end" }}></View>
      <FooterTabs />
    </SafeAreaView>
  );
}
