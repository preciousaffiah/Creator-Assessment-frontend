import { ToastMessage } from "@/components/creator-ui";
import DataPagination from "@/components/creator-ui/Pagination";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { motion, AnimatePresence } from "framer-motion";

import { FolderOpen, Loader, LoaderCircle, RefreshCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { handleAxiosError } from "@/utils/axios";
import { apiService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const formSchema = z
    .object({
        recipientUsername: z.string().trim().min(3, "required"),
        amount: z.string().trim().min(1, "required"),
        description: z.string().trim().optional(),
    })
    .required();

const TransferMoneyModal = ({ refetch, data, userBalance, itemsRefetch }: any) => {

    const [success, setSuccess] = useState(false);
    const [balanceError, setBalanceError] = useState(false);


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
        const amount = parseFloat(data?.amount) || 0;

        if (amount > userBalance) {
            setBalanceError(true);
            return;
        }

        setBalanceError(false);

        mutation.mutate()
    };

    return (
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
    );
};

export default TransferMoneyModal;