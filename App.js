import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Square from "./app/components/Square";
import { N, SQARE_SIZE } from "./app/config/constants";
import ProductDetail from "./app/screens/ProductDetail";
export default function App() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);
  return (
    <>
      <ProductDetail />
    </>
  );
}
