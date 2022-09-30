import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import { deletePlace } from "../helper/db";
import { loadPlace, removePlace } from "../store/places-actions";

const PlaceListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlace());
  }, [dispatch]);

  if (!places.length) return <View></View>;
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          imageUri={itemData.item.imageUri || ""}
          title={itemData.item.title}
          address={null}
          onDelete={() => dispatch(removePlace(itemData.item.id))}
          onSelect={() => {
            navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

export default PlaceListScreen;
