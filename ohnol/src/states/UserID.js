import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const UserID = atom({
  key: "UserID",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
