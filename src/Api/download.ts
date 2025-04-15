import axios from "./axios.ts";

export const download = async (id: string) => {
  try {
    return await axios.post(`/download`, { productId: id });
  } catch (error) {
    console.log(error);
  }
};
