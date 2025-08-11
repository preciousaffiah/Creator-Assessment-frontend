import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Edu_NSW_ACT_Foundation, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

// Load fonts
const eduNSW = Edu_NSW_ACT_Foundation({
  subsets: ["latin"],
  variable: "--font-edu",
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${eduNSW.variable} ${inter.variable} font-inter`}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}
