const ToastMessage = ({
  error = true,
  message,
  children,
}: {
  error?: boolean;
  message: string;
  children?: any;
}) => {
  return (
    <div
      className={`flex align-middle px-4 items-center gap-x-2 ${
        error ? "bg-red-200" : "bg-teal-50"
      } rounded-md border-1  my-3 ${
        error ? "border-red-500" : "border-primaryLime"
      }`}
    >
      <p
        className={`py-2 m-0 ${
          error ? "text-red-800" : "text-primaryLime"
        } font-book`}
      >
        {message}
      </p>
      {children}
    </div>
  );
};

export default ToastMessage;
