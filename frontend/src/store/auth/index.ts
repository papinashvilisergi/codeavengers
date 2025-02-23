import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { UserInfo } from "@/types/login";
type User = {
  access: string;
  refresh: string;
} | null;

// type userInfo = {
//   id: number;
//   username: string;
//   personal_number: string;
//   first_name: string;
//   last_name: string;
// };

export const userAtom = atomWithStorage<User>("user", null);
export const meAtom = atom<UserInfo | null>(null);
