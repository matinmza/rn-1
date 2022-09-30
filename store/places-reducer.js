import { ADD_PLACE, DELETE_PLACE, SET_PLACE } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACE:
      return {
        places: action.places.map(
          (pl) => new Place(pl.id.toString(), pl.title, pl.imageUri)
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri
      );
      return {
        places: state.places.concat(newPlace),
      };
    case DELETE_PLACE:
      return {
        places: action.payload,
      };
    default:
      return state;
  }
};
