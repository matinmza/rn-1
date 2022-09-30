import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import staticFakeImage from "../assets/staticmap.png";
const MapPreview = (props) => {
  const googleKey = "AIzaSyDIc-W0GWVp8AJt-rsUgHtbpE8SqKVE3W0";
  let imagePreviewUrl;
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${googleKey}`;
  }
  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={staticFakeImage} />
      ) : (
        props.children
      )}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
