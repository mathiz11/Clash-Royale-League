import React, { createContext, Dispatch, FC, useContext, useReducer, } from "react";
import { User } from "../services/authService";
import { Player } from "../services/playerService";

type Message = {
  status: "info" | "warning" | "success" | "error" | undefined;
  description: string;
}

type State = {
  user?: User;
  player?: Player;
  message?: Message;
};

type Action = {
  type: string;
  payload?: any;
};

const initialState: State = {};

export const ACTIONS = {
  SIGN_IN: "SIGN_IN",
  LOG_OUT: "LOG_OUT",
  ADD_PLAYER: "ADD_PLAYER",
  SHOW_MESSAGE: "SHOW_MESSAGE",
  REMOVE_MESSAGE: "REMOVE_MESSAGE",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        user: action.payload.user,
      };
    case "LOG_OUT":
      delete state.user
      return {};
    case "ADD_PLAYER":
      return {
        ...state,
        player: action.payload.player,
      };
    case "SHOW_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
      };
    case "REMOVE_MESSAGE":
      delete state.message
      return state
    default:
      return state;
  }
};

const StoreContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  () => {
  },
]);

export const StoreProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
