import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const ImageSelector = (props) => {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const refCamera = useRef(null);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  const takePhotoHandler = async () => {
    if (props.image) return props.onChange("");
    await refCamera.current.takePictureAsync({ onPictureSaved });
  };
  const onPictureSaved = (photo) => {
    props.onChange(photo.uri);
  };
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
          <Text>No image picked yet.</Text>
        </View>
        <Button
          onPress={requestPermission}
          title="Take Image"
          color={Colors.primary}
        />
      </View>
    );
  }
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {props.image ? (
          <Image source={{ uri: props.image }} style={styles.camera} />
        ) : (
          <Camera ref={refCamera} style={styles.camera} type={type}>
            <View style={styles.buttonContainer}></View>
          </Camera>
        )}
      </View>
      {!props.image && (
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <FontAwesome name="exchange" size={24} color="black" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.takePhoto} onPress={takePhotoHandler}>
        {props.image ? (
          <FontAwesome name="repeat" size={24} color="black" />
        ) : (
          <FontAwesome name="camera" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImageSelector;

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
});
