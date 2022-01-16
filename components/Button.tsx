import { LegacyRef } from "react";

interface ButtonProps {
  appearance?: "primary" | "secondary";
  onClick?: () => void;
  ref?: LegacyRef<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  appearance = "primary",
  onClick,
  ref,
  type,
  disabled,
  className,
}) => {
  return appearance === "primary" ? (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={`shadow-lg shadow-indigo-500/50 transition-all transform hover:shadow-lg py-3 px-4 rounded-md hover:scale-105 bg-purple-500 hover:bg-purple-600 text-white ${
        disabled && "opacity-50"
      } ${className}`}
    >
      {children}
    </button>
  ) : (
    <button
      type={type}
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={`shadow-lg shadow-indigo-500/50 transition-all transform hover:shadow-lg py-3 px-4 rounded-md hover:scale-105 border border-purple-500 hover:bg-purple-600 text-purple-500 hover:text-white ${
        disabled && "opacity-50"
      } ${className}`}
    >
      {children}
    </button>
  );
};
