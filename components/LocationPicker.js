import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import MapPreview from "./MapPreview";

const LocationPicker = ({ onChange, location }) => {
  const [isFetching, setIsFetching] = useState(null);
  const getLocationHandler = async () => {
    setIsFetching(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("no permission", "you most to set permission", [
        { text: "Okay" },
      ]);
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      onChange({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("sorry!", "could not fetch", [{ text: "Okay" }]);
    }
    setIsFetching(false);
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={location}>
        {isFetching ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
