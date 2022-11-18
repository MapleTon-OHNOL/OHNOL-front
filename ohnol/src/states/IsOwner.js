import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const IsOwner = atom({
  key: "IsOwner",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
