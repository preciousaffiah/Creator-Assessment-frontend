import { axiosWithoutToken, axiosWithToken } from "@/utils/axios";

class APIService {
  login(payload: { email: string; password: string; }) {
    return axiosWithoutToken.post("/auth/login", {
      ...payload,
    });
  }

  getWallet() {
    return axiosWithToken().get(`/wallet/balance`);
  }

  getTransactionHistory() {
    return axiosWithToken().get(`/wallet/transactions`);
  }

  sendMoney(payload: {
    recipientUsername: string;
    amount: string;
    description?: string;
  }) {
    return axiosWithToken().post("/wallet/send", {
      ...payload,
    });
  }

}

const apiService = new APIService();
export default apiService;
