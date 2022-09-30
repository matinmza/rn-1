import * as FileSystem from "expo-file-system";
import { deletePlace, fetchPlaces, insertPlace } from "../helper/db";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";
export const DELETE_PLACE = "DELETE_PLACE";

export const addPlace = (title, image, lat, lng) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({ from: image, to: newPath });
      const dbResult = await insertPlace(
        title,
        newPath,
        "dummy address",
        lat,
        lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title, imageUri: newPath },
      });
    } catch (error) {
      throw error;
    }
  };
};
export const removePlace = (id) => {
  return async (dispatch, getState) => {
    try {
      await deletePlace(id);
      const places = getState().places.places;
      const newList = places.filter((item) => item.id !== id);
      dispatch({
        type: DELETE_PLACE,
        payload: newList,
      });
    } catch (error) {
      throw error;
    }
  };
};
export const loadPlace = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();

      dispatch({ type: SET_PLACE, places: dbResult.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
