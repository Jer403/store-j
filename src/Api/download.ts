import axios from "./axios.ts";

export const download = async (id: string) => {
  try {
    return await axios.get(`/download/${id}`, {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.total
          ? progressEvent.total
          : progressEvent.loaded;
        const percentCompleted = Math.round((loaded * 100) / total);
        console.log(percentCompleted);
      },
    });
  } catch (error) {
    console.log(error);
  }
};
