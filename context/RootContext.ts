import { createContext } from "react";

interface RootContextModel {
  userData?: {
    email: string;
    username: string;
    profileImageUrl: string;
  };
  setUserData: Function;
}

export const RootContext = createContext<RootContextModel>({
  setUserData: () => {},
});
