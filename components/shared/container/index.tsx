import { usePathname } from "next/navigation";

const Container = ({ children, className }: any) => {
  const path = usePathname();
  // Check if the current route matches any of the specified patterns
  const isAuthRoute =
    path === "/auth/sign-in"

  return (
    <div
      className={`nav-item ${
        isAuthRoute ? "w-full" : "lg:w-[95%] md:w-[93%] w-full justify-end"
      } authcard1 ${className}`}
    >
      <div className="authcard2 h-full">{children}</div>
    </div>
  );
};

export default Container;
