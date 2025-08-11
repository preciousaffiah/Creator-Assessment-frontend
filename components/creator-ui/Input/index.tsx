import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { InputHide, InputShow } from "@/components/creator-icons";
import styles from "./Input.module.scss";
import { title } from "process";

type InputType = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: boolean;
  message?: Promise<string> | string;
  disabled?: boolean;
  readOnly?: boolean;
  alertElement?: JSX.Element;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  autoComplete?: "on" | "off";
};

const Input = ({
  name,
  type = "text",
  label,
  placeholder,
  value,
  error = false,
  message,
  disabled = false,
  readOnly = false,
  onChange,
  onEnterPress,
  onFocus,
  onBlur,
  autoComplete,
  alertElement,
}: // ...props
InputType) => {
  const [show, setShow] = useState<boolean>(false);

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterPress && onEnterPress(e);
    }
  };

  const errorClass = message ? "error" : "regular";

  const strokeColour = error && message ? "#F86B6B" : null;

  message = message as string;

  return (
    <div className={styles.Input}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}

      <div className={styles.InputInner}>
        {/* {alertElement && <>{alertElement}</>} */}
        <AnimatePresence>
          {alertElement && (
            <motion.div
              initial={{ y: -20, opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0.2 }}
              className={styles.Message}
            >
              {alertElement}
            </motion.div>
          )}
        </AnimatePresence>
        <input
          className={`form-control ${styles[errorClass]}`}
          title={label}
          value={value}
          type={show ? "text" : type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={enterHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
        />

        {type === "password" && (
          <button
            type="button"
            title={show ? "Hide" : "Reveal"}
            onClick={() => setShow(!show)}
          >
            {show ? (
              <InputHide stroke={strokeColour} />
            ) : (
              <InputShow stroke={strokeColour} />
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ y: -20, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0.2 }}
            className={styles.Message}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;
