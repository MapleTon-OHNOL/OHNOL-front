import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserState = atom({
  key: "UserState",
  default: {
    email: "",
    username: "",
  },
  effects_UNSTABLE: [persistAtom],
});
