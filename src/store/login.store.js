import { create } from "zustand";
import { loginURL } from "../utils/endpoints";
import axios from "axios";
import jwtdecode from "jwt-decode";

const useLoginStore = create((set) => ({
  token: null,
  user: null,
  login: async (payload) => {
    let decodedToken = null;
    const { data } = await axios.post(loginURL, payload);

    if (data.token) decodedToken = jwtdecode(data.token);
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.data));
    set({
      token: data.token,
      user: data.data,
    });
  },
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    set({
      token: null,
      user: null,
    });
  },
  loadLogin: () => {
    set({
      token: sessionStorage.getItem("token"),
      user: JSON.parse(sessionStorage.getItem("user")),
    });
  },
}));

export default useLoginStore;
