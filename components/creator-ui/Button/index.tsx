import { Spinner } from "@/components/creator-icons";
import styles from "./Button.module.scss";

type ButtonType = {
  label?: string;
  icon?: JSX.Element | null;
  iconButton?: boolean;
  endIcon?: JSX.Element;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  buttonStyle?: "fill" | "outline" | "ghost" | "text";
  variant?: "normal" | "block";
  flat?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string
};

const Button = ({
  icon,
  iconButton = false,
  endIcon,
  loading,
  label,
  size = "medium",
  buttonStyle = "fill",
  variant = "normal",
  flat = true,
  disabled = false,
  onClick,
  type = "button",
  className
}: ButtonType) => {

  disabled = loading?loading:disabled;

  return (
    <div
      className={`active:bg-transparent ${styles["Button"]} ${styles[buttonStyle]} ${styles[size]} ${
        iconButton && styles["iconButton"]
      }`}
    >
      <button
        disabled={disabled}
        type={type}
        className={`${className} gap-2`}
        onClick={onClick}
      >
        {loading ? (
          <span className={styles.Spinner}>
            <Spinner />
          </span>
        ) : (
          icon
        )}
        {label}
      </button>
    </div>
  );
};

export default Button;
