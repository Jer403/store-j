import axios from "./axios.ts";

export const paymentLinkRequest = async (data: {
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  country: number;
  city: string;
  postalCode: string;
}) => {
  try {
    return await axios.post(`/tpp/paymentlink`, data);
  } catch (error) {
    console.log(error);
  }
};
