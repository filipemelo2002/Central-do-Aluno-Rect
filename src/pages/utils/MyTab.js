import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function MyTab({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };
        const display = isFocused ? "flex" : "none";
        return (
          <TouchableOpacity
            style={styles.tabContainer}
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon
              name={iconArray[index]}
              size={30}
              color={isFocused ? "#36abff" : "#9a9a9a"}
            />
            <Animated.View style={{ display }}>
              <Text
                style={{
                  ...styles.textLabel,
                  color: isFocused ? "#36abff" : "#9a9a9a"
                }}
              >
                {label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const iconArray = ["table", "user", "calendar", "areachart"];
const styles = StyleSheet.create({
  tabContainer: {
    padding: 10,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  textLabel: {
    fontSize: 14,
    color: "#fff"
  }
});
