import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "./../constants/Colors";
import { Button } from "react-native";
import PlaceListScreen from "../screens/PlaceListScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.grey,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="PlaceList"
          options={({ navigation }) => ({
            headerRight: () => (
              <MaterialIcons
                name="add-location-alt"
                size={24}
                color={Colors.primary}
                onPress={() => navigation.push("NewPlace")}
              />
            ),
          })}
          component={PlaceListScreen}
        />
        <Stack.Screen name="NewPlace" component={NewPlaceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
