import axios from "./axios.ts";

export const download = async (id: string) => {
  try {
    return await axios.get(`/download/${id}`, {
      onUploadProgress: (progressEvent) => {
        const loaded = progressEvent.loaded;
        console.log(loaded);
      },
    });
  } catch (error) {
    console.log(error);
  }
};
