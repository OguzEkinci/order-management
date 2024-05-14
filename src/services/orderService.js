import { axiosInstance } from ".";

export const orderServices = (state) => {
  return {
    async orderList(type) {
      const response = await axiosInstance.get(`/orders`);
      return response?.data || [];
    },
    async basketList(type) {
      const response = await axiosInstance.get(`/baskets`);
      return response?.data || [];
    },
    async courierList(type) {
      const response = await axiosInstance.get(`/couriers`);
      return response?.data || [];
    },
  };
};
