"use client";

import { GeneralLayout } from "@layouts";
import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EyeIcon, EyeOff, LoaderCircle } from "lucide-react";
import Container from "@/components/shared/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiService } from "@/services";
import { useAuthToken } from "@/hooks";
import { ToastMessage } from "@/components/creator-ui";
import { handleAxiosError } from "@/utils/axios";

// Define Zod schemas for each step
const formSchema = z
  .object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(1, "required"),
  })
  .required();

const SignIn: FC = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Ensures validation checks on each change
  });

  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useAuthToken();

  const router = useRouter();

  const loginRequest: any = async () => {
    try {
      const response = await apiService.login(form.getValues());

      return response.data;
    } catch (error: any) {
      console.log(error);

      handleAxiosError(error, "");
    }
  };

  const mutation: any = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res: any) => {
      updateUser(res.data);
      router.push("/dashboard");
    },
  });

  const onSubmit = () => mutation.mutate();

  return (
    <GeneralLayout title={"Sign-in"}>
      <Container className={"min-h-[40rem]"}>
        <div className="authcard3 lg:min-h-[46rem] md:pt-20 md:pb-16 py-0 lg:px-12 md:px-8 px-0">
          <div className="authcard4">
            <div className="authcard5 md:rounded-xl rounded-none md:bg-background bg-foreground">
              <div className="md:m-auto lg:px-28 px-4 md:pt-0 pt-6 w-full flex flex-col">
                <div className="pb-8">
                  <div>
                    <h1 className="uppercase md:text-[1.6rem] auth-header font-medium text-txWhite">
                      Creator.co Assessment
                    </h1>
                    <p className="font-medium auth-subheader text-secondaryBorder">
                      Sign in
                    </p>
                  </div>
                </div>
                <AnimatePresence>
                  {mutation.isError && (
                    <motion.div
                      initial={{ y: -20, opacity: 0.5 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0.2 }}
                    >
                      <ToastMessage
                        message={
                          mutation?.error?.message ||
                          "An error occured during sign in"
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
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
                          name="email"
                          render={({ field }) => (
                            <FormItem className="grid gap-2 w-full">
                              <FormControl>
                                <input
                                  autoComplete="off"
                                  type="email"
                                  placeholder="email"
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
                          name="password"
                          render={({ field }) => (
                            <FormItem className="grid gap-2 w-full">
                              <FormControl>
                                <div className="flex items-center md:pt-0 pt-4">
                                  <input
                                    autoComplete="off"
                                    type={`${
                                      showPassword ? "text" : "password"
                                    }`}
                                    placeholder="Password"
                                    {...field}
                                    className="text-[0.98rem] rounded-none text-txWhite w-full mt-1 bg-transparent border-b-[1px] border-primary-border focus:border-b-orange-500 outline-none transition-colors duration-500"
                                  />
                                  <EyeOff
                                    onClick={() => {
                                      setShowPassword(!showPassword);
                                    }}
                                    className={`${
                                      showPassword ? "block" : "hidden"
                                    } cursor-pointer w-5 h-5 relative right-4 text-secondaryBorder`}
                                  />
                                  <EyeIcon
                                    onClick={() => {
                                      setShowPassword(!showPassword);
                                    }}
                                    className={`${
                                      showPassword ? "hidden" : "block"
                                    } cursor-pointer w-5 h-5 relative right-4 text-secondaryBorder`}
                                  />
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <br />
                      </div>
                    </motion.div>

                    {form.formState.isValid && mutation.isPending ? (
                      <button className="authbtn flex justify-center items-center bg-[#74901f] gap-x-4">
                        <LoaderCircle className="text-gray-300 w-5 h-5 rotate-icon" />
                        Hold on...
                      </button>
                    ) : (
                      <div className="form-actions md:flex gap-x-3">
                        <button type="submit" className="authbtn">
                          Sign in
                        </button>
                      </div>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          
          </div>
        </div>
      </Container>
    </GeneralLayout>
  );
};

export default SignIn;
