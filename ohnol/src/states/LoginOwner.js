import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginOwner = atom({
  key: "LoginOwner",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
