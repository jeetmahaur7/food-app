import {
  ADD_CATEGORY_RED,
  DELETE_CATEGORY_RED,
  GET_CATEGORY_RED,
  UPDATE_CATEGORY_RED,
} from "../Constants";
export default function CategoryReducer(state = [], action) {
  let newState, index;
  switch (action.type) {
    case ADD_CATEGORY_RED:
      newState = [...state];
      newState.push(action.payload);
      return newState;

    case GET_CATEGORY_RED:
      return action.payload;

    case UPDATE_CATEGORY_RED:
      index = state.findIndex((x) => x.id === action.payload.id);
      state[index].name = action.payload.name;
      state[index].active = action.payload.active;
      return state;

    case DELETE_CATEGORY_RED:
      return state.filter((x) => x.id !== action.payload.id);

    default:
      return state;
  }
}
