import axios from "./axios.ts";

export const download = async (id: string) => {
  try {
    return await axios.get(`/download/${id}`);
  } catch (error) {
    console.log(error);
  }
};
