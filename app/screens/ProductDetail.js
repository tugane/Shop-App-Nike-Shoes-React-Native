import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const product = {
  id: 1,
  name: "Air jordan 1 mid se gc",
  model: "Nike Air",
  price: 875,
  rating: 3.5,
  colors: [
    { text: "white", fill: "rgb(000,100,190)", background: "rgb(30,30,40)" },
    { text: "white", fill: "rgb(190,00,50)", background: "rgb(40,30,30)" },
    { text: "black", fill: "rgb(210,170,000)", background: "rgb(35,33,30)" },
    { text: "white", fill: "rgb(50,190,000)", background: "rgb(30,35,30)" },
    { text: "white", fill: "rgb(10,10,10)", background: "rgb(30,30,30)" },
  ],
  size: [7, 7.5, 8, 9],
  images: [
    require("../assets/chz.png"),
    require("../assets/chz-red.png"),
    require("../assets/chz-yellow.png"),
    require("../assets/chz-green.png"),
    require("../assets/chz-grey.png"),
  ],
};

const { height } = Dimensions.get("window");
const BG_HEIGHT = height / 1.7;

const ProductDetail = () => {
  const [activeSize, setActiveSize] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(-30);
  const translateX = useSharedValue(-15);
  const translateY = useSharedValue(-30);
  const circleScale = useSharedValue(1);
  const categoryScale = useSharedValue(1);
  const categoryOpacity = useSharedValue(1);
  const categoryRotate = useSharedValue(1);

  const categoryRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: categoryScale.value },
        { rotate: `${categoryRotate.value}deg` },
      ],
      opacity: categoryOpacity.value,
    };
  });

  const circleRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: 120 },
        { translateY: -150 },
        { scale: circleScale.value },
      ],
    };
  });

  const imgRStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}deg` },
        { translateX: translateX.value },
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });
  const handleSize = (size, index) => {
    scale.value = withSpring(
      0.9 + (size - 7) / 5,
      withDelay(500),
      (finished) => {
        if (finished) {
          runOnJS(setActiveSize)(index);
        }
      }
    );
    rotate.value = withSequence(withTiming(-40), withTiming(-30));
  };
  const handleColor = (index) => {
    // setActiveColor(index);
    translateX.value = withSequence(
      withTiming(-400, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setActiveColor)(index);
        }
      }),
      withTiming(-30, { duration: 300 })
    );
    rotate.value = withSequence(
      withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setActiveColor)(index);
        }
      }),
      withTiming(-30, { duration: 300 })
    );
    scale.value = withSequence(
      withSpring(0.5, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setActiveColor)(index);
        }
      }),
      withSpring(0.9 + (product.size[activeSize] - 7) / 5)
    );
    circleScale.value = withSequence(
      withSpring(0.5, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setActiveColor)(index);
        }
      }),
      withSpring(1)
    );
    categoryScale.value = withSequence(
      withSpring(0.95, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setActiveColor)(index);
        }
      }),
      withSpring(1)
    );
    categoryOpacity.value = withSequence(
      withSpring(0.5, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setActiveColor)(index);
        }
      }),
      withSpring(1)
    );
    categoryRotate.value = withSequence(
      withTiming(20, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setActiveColor)(index);
        }
      }),
      withTiming(0)
    );
  };
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: product.colors[activeColor].background,
        }}
      >
        <SafeAreaView>
          <View style={{ padding: 10 }}>
            <View style={{ position: "relative", height: 420 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "absolute",
                  width: "100%",
                  zIndex: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: 38,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="chevron-back"
                    color={`rgb(30,30,30)`}
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    width: 38,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="heart-outline" color="white" size={35} />
                </TouchableOpacity>
              </View>
              <Animated.View
                style={[
                  {
                    width: 600,
                    height: 550,
                    backgroundColor: product.colors[activeColor].fill,
                    borderRadius: 400,
                    position: "absolute",
                  },
                  circleRStyle,
                ]}
              />
              <View
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={[
                    {
                      color: "white",
                      fontSize: 90,
                      textTransform: "uppercase",
                      fontWeight: "700",
                    },
                    categoryRStyle,
                  ]}
                >
                  {product.model}
                </Animated.Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animated.Image
                  source={product.images[activeColor]}
                  style={[
                    {
                      width: "100%",

                      shadowOffset: { width: 1, height: 10 },
                      shadowColor: "black",
                      shadowRadius: 15,
                      shadowOpacity: 0.7,
                    },
                    imgRStyle,
                  ]}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 15,
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              {product.model}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textTransform: "uppercase",
                  fontWeight: "800",
                  width: "70%",
                }}
                numberOfLines={1}
              >
                {product.name}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textTransform: "uppercase",
                  fontWeight: "800",
                }}
              >
                ${product.price}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <View>
                <Ionicons
                  name="star"
                  style={{ marginRight: 5 }}
                  size={15}
                  color={product.colors[activeColor].fill}
                />
              </View>
              <View>
                <Ionicons
                  name="star"
                  style={{ marginRight: 5 }}
                  size={15}
                  color={product.colors[activeColor].fill}
                />
              </View>
              <View>
                <Ionicons
                  name="star"
                  style={{ marginRight: 5 }}
                  size={15}
                  color={product.colors[activeColor].fill}
                />
              </View>
              <View>
                <Ionicons
                  name="star"
                  style={{ marginRight: 5 }}
                  size={15}
                  color="white"
                />
              </View>
              <View>
                <Ionicons
                  name="star"
                  style={{ marginRight: 5 }}
                  size={15}
                  color="white"
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                size
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginTop: 15,
                }}
              >
                {product.size.map((size, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => handleSize(size, index)}
                      style={{
                        marginRight: 20,
                        backgroundColor:
                          activeSize === index
                            ? product.colors[activeColor].fill
                            : `rgb(256,256,256)`,
                        width: 38,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            activeSize === index
                              ? product.colors[activeColor].text
                              : "black",
                          fontSize: 18,
                          textTransform: "uppercase",
                          fontWeight: "800",
                        }}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    textTransform: "uppercase",
                    fontWeight: "700",
                  }}
                >
                  Color
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    marginTop: 15,
                    position: "relative",
                  }}
                >
                  {product.colors.map((color, index) => (
                    <Animated.View key={index}>
                      <TouchableOpacity
                        onPress={() => handleColor(index)}
                        style={[
                          {
                            marginRight: 10,
                            backgroundColor: color.fill,
                            width: 25,
                            height: 25,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                          },
                          activeColor === index && {
                            borderColor: `rgb(256,256,256)`,
                            borderWidth: 5,
                          },
                        ]}
                      />
                    </Animated.View>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: product.colors[activeColor].fill,
                  width: 150,
                  borderRadius: 20,
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: product.colors[activeColor].text,
                    fontSize: 20,
                    textTransform: "uppercase",
                    fontWeight: "800",
                  }}
                >
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default ProductDetail;
