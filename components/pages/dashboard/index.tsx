"use client";
import React, { FC, useState } from "react";
import {
  FolderOpen,
  Loader,
  Wallet,
  LoaderCircle,
  RefreshCcw,
} from "lucide-react";
import Container from "@/components/shared/container";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTransactionHistory, fetchWallet, useAuthToken } from "@/hooks";
import { handleAxiosError } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { apiService } from "@/services";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastMessage } from "@/components/creator-ui";
import DataPagination from "@/components/creator-ui/Pagination";
import TransferHistory from "@/components/shared/transfer-history";
import TransferMoneyModal from "@/components/shared/transfer-money-modal";

const formSchema = z
  .object({
    recipientUsername: z.string().trim().min(3, "required"),
    amount: z.string().trim().min(1, "required"),
    description: z.string().trim().optional(),
  })
  .required();

const DashboardComp: FC = () => {
  const { userData } = useAuthToken();

  const { data, isRefetching, refetch } = fetchWallet(userData?.wallet_id || "");
  const { data: itemsData, isLoading: isItemsLoading, isRefetching: isItemsRefetching, refetch: itemsRefetch } = fetchTransactionHistory(userData?.wallet_id || "");

  const [page, setPage] = useState(1);

  const [success, setSuccess] = useState(false);

  const [balanceError, setBalanceError] = useState(false);
  const userBalance = (data?.balance || userData?.balance)?.toFixed(2)?.toLocaleString();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientUsername: "",
      amount: "",
      description: "",
    },
    mode: "onChange",
  });

  const sendMoneyRequest: any = async () => {
    try {
      const response = await apiService.sendMoney(form.getValues());

      return response.data;
    } catch (error: any) {
      handleAxiosError(error, "");
    }
  };

  const mutation: any = useMutation({
    mutationFn: sendMoneyRequest,
    onSuccess: (res: any) => {
      setSuccess(true);
      form.reset();
      refetch();
      itemsRefetch();
    },
  });

  const onSubmit = () => {
    const amount = parseFloat(data.amount) || 0;

    if (amount > userBalance) {
      setBalanceError(true);
      return;
    }

    setBalanceError(false);

    mutation.mutate()
  };

  return (
    <div className="flex justify-end h-screen w-full">
      <Container>
        <div className="authcard3 py-16 h-fit lg:px-12 md:px-8 px-4">
          <div className="lg:w-[40%] w-full h-fit flex flex-col gap-y-4 md:pb-0 pb-3 justify-between">
            <div className="w-full overflow-x-scroll flex flex-col md:justify-start gap-x-4">
              <p className="text-white md:text-3xl text-2xl font-medium pb-4">Howdy, {userData?.fullname}!</p>

              <div
                className={`
                                    bg-primaryDark md:min-w-max min-w-80 w-full h-full text-sm text-txWhite rounded-md py-1`}
              >
                <div className="text-secondaryBorder w-full flex flex-col gap-y-10">
                  <div className="p-2 flex justify-between">
                    <div className="text-secondaryBorder font-medium flex gap-x-2">
                      <Wallet />
                      <h1 className="text-lg">Available Balance</h1>
                    </div>
                    <RefreshCcw className={`w-4 cursor-pointer ${isRefetching ? "rotate-icon" : ""}`} onClick={() => refetch()} />
                  </div>
                  <div className="w-full flex justify-between">
                    <Card className="text-txWhite w-full rounded-none bg-transparent border-none">
                      <CardHeader className="px-2 py-2">
                        <CardTitle className="flex justify-between items-end">
                          <div>
                            <p className="font-medium text-3xl flex gap-x-1">
                              <span className="pl-1 flex">$</span>
                              {
                                isRefetching ? <p>...</p>
                                  :
                                  <>
                                    {userBalance}
                                  </>
                              }

                            </p>
                          </div>
                          <div>
                            <TransferMoneyModal
                              refetch={refetch}
                              data={data}
                              userBalance={userBalance}
                              itemsRefetch={itemsRefetch}
                            />
                          </div>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <TransferHistory
              itemsData={itemsData}
              isItemsLoading={isItemsLoading}
              isItemsRefetching={isItemsRefetching}
              page={page}
              setPage={setPage}
              itemsRefetch={itemsRefetch}
              isRefetching={isRefetching}
            />
          </div>

        </div>
      </Container>
    </div>
  );
};

export default DashboardComp;
