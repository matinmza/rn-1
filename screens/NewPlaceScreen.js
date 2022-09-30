import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/places-actions";
import ImageSelector from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();
  const savePlaceHandler = () => {
    dispatch(addPlace(title, image, location.lat, location.lng));
    navigation.goBack();
  };
  const photoHandler = (photo) => {
    setImage(photo);
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={setTitle}
          value={title}
          style={styles.textInput}
        />
        <ImageSelector image={image} onChange={photoHandler} />
        <LocationPicker
          location={location}
          onChange={(getLocation) => setLocation(getLocation)}
        />
        <Button
          color={Colors.primary}
          title="Save Place"
          onPress={savePlaceHandler}
          disabled={!image || !title || !location}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});
