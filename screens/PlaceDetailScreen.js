import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const PlaceDetailScreen = (props) => {
  const place = useSelector((state) => state.places.places).find(
    (item) => item.id === props.route.params.placeId
  );
  console.log(place, "placeplace");
  return (
    <View>
      <View style={styles.imagePreview}>
        <Image source={{ uri: place.imageUri }} style={styles.camera} />
      </View>
      <View style={{ ...styles.imagePreview, ...styles.darkBackground }}>
        <Text style={styles.text}>title :{place.title}</Text>
        <Text style={styles.text}>lat :{place.lat}</Text>
        <Text style={styles.text}>lng :{place.lng}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          color={Colors.primary}
          title="back"
          onPress={() => props.navigation.navigate("PlaceList")}
        />
      </View>
    </View>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  takePhoto: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  darkBackground: {
    backgroundColor: Colors.grey,
  },
});
