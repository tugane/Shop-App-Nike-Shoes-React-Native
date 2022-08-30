import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { N, SQARE_SIZE } from "../config/constants";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const Square = ({ index, progress }) => {
  const offset = (2 * Math.PI) / N;
  const finalAngle = offset * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }
    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }
    return progress.value;
  });

  const translateY = useDerivedValue(() => {
    if (finalAngle === rotate.value) {
      return withSpring(-N * SQARE_SIZE);
    }

    if (progress.value > 2 * Math.PI) {
      return withSpring((index - N) * SQARE_SIZE);
    }

    return -index * SQARE_SIZE;
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}rad` },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          heigh: SQARE_SIZE,
          width: 12,
          aspectRatio: 1,
          backgroundColor: "white",
          opacity: (index + 1) / N,
          position: "absolute",
        },
        rStyle,
      ]}
    />
  );
};

export default Square;

const styles = StyleSheet.create({});
