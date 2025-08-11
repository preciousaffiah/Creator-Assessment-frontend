import { apiService } from "@/services";
import { handleAxiosError } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const useWallet = (walletId: string) => {
    const fetchTransactionHistory = async () => {
        try {
            const response = await apiService.getTransactionHistory();

            return response?.data?.data;
        } catch (error: any) {
            console.log("error messge:", error.response?.data?.message);
            handleAxiosError(error, "");
        }
    };

    const { isRefetching, isLoading, isError, data, refetch } = useQuery<any, Error>({
        queryKey: ["transaction-history", [walletId]],
        queryFn: fetchTransactionHistory,
        enabled: true,
        refetchOnWindowFocus: false,
    });

    return {
        isRefetching,
        isLoading,
        isError,
        data,
        refetch
    };
};

export default useWallet;
