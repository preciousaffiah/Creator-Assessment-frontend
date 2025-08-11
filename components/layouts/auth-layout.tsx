import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { PageAnimation } from "../creator-ui";
import { Toaster } from "../ui/toaster";
import { useAuthToken } from "@/hooks";

interface ILayout {
  children: JSX.Element | React.ReactNode;
  title: string;
  subtitle?: string;
  heading?: string;
  description?: string;
}

export default function AuthenticatedLayout({
  children,
  title,
  subtitle,
  heading,
  description,
}: ILayout) {;
  title = title || "Page Title";
  subtitle = subtitle || "";
  description =
    description ||
    "creator- A Global Saas all in one management for your businesses";
  heading = heading || title;

  const router = useRouter();

  const { token, isLoading } = useAuthToken();

  useEffect(() => {
    if (isLoading) return;
    if (!token) router.push("/auth/sign-in");
    
  }, [isLoading, router, token]);

  return (
    <Fragment>
      <Head>
       <title>{`creator | ${title}`}</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="author" content="creator" />
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
        <meta name="description" content={description} />
        <meta name="title" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="creator" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:url" content="https://trycreator.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
                    content="https://storage.googleapis.com/creator-456113.appspot.com/random/circledcreator.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://trycreator.com/"
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
                    content="https://storage.googleapis.com/creator-456113.appspot.com/random/circledcreator.png"
        />
       <link rel="icon" type="image/x-icon" href="https://storage.googleapis.com/creator-456113.appspot.com/random/circledcreatorIcon.png" /> 
 
      </Head>

      <div className="flex flex-col h-screen min-h-screen">
        <PageAnimation>
          {/* nav */}

          {/* form */}
          {children}
        </PageAnimation>
      </div>
    </Fragment>
  );
}
