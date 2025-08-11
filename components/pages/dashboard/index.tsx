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
                            <Dialog>
                              <DialogTrigger asChild>
                                <div onClick={() => {
                                  setSuccess(false);
                                }} className="text-sm font-normal text-black bg-green-500 cursor-pointer rounded-lg px-2">+ Send Money</div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md text-gray-200">
                                {success ? (
                                  <div className="flex flex-col justify-center items-center">
                                    <p>Transaction Successfull</p>
                                  </div>
                                ) : (
                                  <>
                                    <AnimatePresence>
                                      {(mutation.isError || balanceError) && (
                                        <motion.div
                                          initial={{ y: -20, opacity: 0.5 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          exit={{ y: -20, opacity: 0.2 }}
                                        >
                                          <ToastMessage
                                            message={
                                              balanceError
                                                ? "Insufficient balance"
                                                : mutation?.error?.message || "An error occured during process"
                                            }
                                          />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>

                                    <DialogHeader>
                                      <DialogTitle>Transfer</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col items-center gap-2">


                                      <Form {...form}>
                                        <form
                                          onSubmit={form.handleSubmit(onSubmit)}
                                          className="w-full flex flex-col m-auto justify-center"
                                        >
                                          <motion.div
                                            initial={{ y: -20, opacity: 0.5 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0.2 }}
                                          >
                                            <div className="flex flex-col gap-y-4">
                                              <FormField
                                                control={form.control}
                                                name="recipientUsername"
                                                render={({ field }) => (
                                                  <FormItem className="grid gap-2 w-full">
                                                    <FormControl>
                                                      <input
                                                        autoComplete="off"
                                                        type="text"
                                                        placeholder="username"
                                                        {...field}
                                                        className="md:pt-0 pt-4 text-[0.98rem] rounded-none text-txWhite w-full mt-1 bg-transparent border-b-[1px] border-primary-border focus:border-b-orange-500 outline-none transition-colors duration-500"
                                                      />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />

                                              <FormField
                                                control={form.control}
                                                name="amount"
                                                render={({ field }) => (
                                                  <FormItem className="grid gap-2 w-full">
                                                    <FormControl>
                                                      <input
                                                        type="text"
                                                        id="amount"
                                                        placeholder="amount"
                                                        {...field}

                                                        onChange={(e) => {
                                                          const numericValue =
                                                            e.target.value.replace(
                                                              /^0+|[^0-9]/g,
                                                              ""
                                                            );

                                                          field.onChange(numericValue);

                                                          // Clear balance error when user types
                                                          if (balanceError) {
                                                            setBalanceError(false);
                                                          }

                                                          // Real time balance validation
                                                          const amount = parseFloat(numericValue) || 0;
                                                          if (amount > userBalance && numericValue !== "") {
                                                            setBalanceError(true);
                                                          }
                                                        }}
                                                        value={field.value ?? ""}
                                                        className={`md:pt-0 pt-4 text-[0.98rem] rounded-none text-txWhite w-full mt-1 bg-transparent border-b-[1px] ${balanceError ? 'border-red-500' : 'border-primary-border'
                                                          } focus:border-b-orange-500 outline-none transition-colors duration-500`}
                                                      />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />

                                              <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                  <FormItem className="grid gap-2 w-full">
                                                    <FormControl>
                                                      <input
                                                        autoComplete="off"
                                                        type="text"
                                                        placeholder="description (optional)"
                                                        {...field}
                                                        className="md:pt-0 pt-4 text-[0.98rem] rounded-none text-txWhite w-full mt-1 bg-transparent border-b-[1px] border-primary-border focus:border-b-orange-500 outline-none transition-colors duration-500"
                                                      />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />


                                              <br />
                                            </div>
                                          </motion.div>

                                          <DialogFooter className="sm:justify-start">
                                            <button
                                              type="submit"
                                              disabled={balanceError || !form.formState.isValid}
                                              className={`flex gap-x-1 items-center self-end rounded-md w-fit text-white px-3 py-1.5 text-sm font-medium transition-colors ${balanceError || !form.formState.isValid
                                                ? 'bg-gray-500 cursor-not-allowed'
                                                : 'bg-primary-orange hover:bg-primary-orange/90'
                                                }`}
                                            >
                                              Send
                                              {form.formState.isValid && mutation.isPending && (
                                                <LoaderCircle className="text-white w-4 rotate-icon" />
                                              )}
                                            </button>
                                          </DialogFooter>

                                        </form>
                                      </Form>
                                    </div>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
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
            <div className="flex gap-y-6 px-0 flex-col w-full h-full">
              <div className="pt-4 rounded-md md:px-3 px-0 gap-y-10 flex pb-4 gap-x-4 flex-col">
                <div className="flex pb-4 flex-col bg-primaryDark pt-4 rounded-md">
                  <div className="pt-4 rounded-t-md px-3 flex pb-4 border-b border-primary-border">
                    <div className="flex justify-between w-full">
                      <p className="capitalize text-lg font-medium text-secondaryBorder">
                        Transaction History
                      </p>
                      <RefreshCcw className={`w-4 cursor-pointer capitalize text-lg font-medium text-secondaryBorder ${isItemsRefetching ? "rotate-icon" : ""}`} onClick={() => itemsRefetch()} />
                    </div>
                  </div>

                  {itemsData &&
                    !isItemsLoading &&
                    !isItemsRefetching &&
                    itemsData.pagination.total_transactions > 0 && (
                      <>
                        {itemsData?.transactions
                          .map((transaction: any, index: number) => (
                            <div className="text-white flex gap-x-3 px-3 py-2 items-center">
                              <p>{index + 1}.</p>
                              <p>{transaction.counterpart_user_name} - </p>
                              <p className="italic">{transaction.description}</p>
                              <p className="text-sm">{new Date(transaction?.created_at).toLocaleDateString()}</p>
                              {
                                transaction.mode === "debit" ?
                                  <span className="text-red-500">- ${transaction.amount.toFixed(2)}</span>
                                  :
                                  <span className="text-green-500">+ ${transaction.amount.toFixed(2)}</span>
                              }
                              <p className={`${transaction.mode === "debit" ? "bg-red-600/20 text-red-500" : "bg-green-600/20 text-green-500"} capitalize px-3 rounded-lg`}>{transaction.mode}</p>
                            </div>
                          ))}

                        <DataPagination
                          currentPage={page}
                          setCurrentPage={setPage}
                          refetch={itemsRefetch}
                          total_items={itemsData.pagination.total_transactions}
                          total_pages={itemsData.pagination.total_pages}
                          items_per_page={itemsData.pagination.perPage}
                          current_item_count={itemsData.pagination.total_transactions} // Total number of items matching the filter
                        />
                      </>
                    )}

                  {itemsData?.currentItemCount < 1 &&
                    !isRefetching &&
                    !isItemsLoading && (
                      <div className="text-txWhite h-[18rem] m-auto flex flex-col justify-center items-center font-medium text-lg font-edu">
                        <FolderOpen />
                        Empty
                      </div>
                    )}

                  {(isItemsLoading || isItemsRefetching) && (
                    <div className="text-txWhite h-[18rem] m-auto flex flex-col justify-center items-center font-medium text-lg font-edu">
                      <Loader className="rotate-icon size-8" />
                      Loading
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default DashboardComp;
