import { apiService } from "@/services";
import { handleAxiosError } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const useWallet = (walletId: string) => {
    const fetchWallet = async () => {
        try {
            const response = await apiService.getWallet();

            return response?.data?.data;
        } catch (error: any) {
            console.log("error messge:", error.response?.data?.message);
            handleAxiosError(error, "");
        }
    };

    const { isRefetching, isLoading, isError, data, refetch } = useQuery<any, Error>({
        queryKey: ["wallet-details", [walletId]],
        queryFn: fetchWallet,
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
