interface ButtonProps {
  appearance?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  appearance = "primary",
}) => {
  return appearance === "primary" ? (
    <button className="transition-all transform hover:shadow-lg py-3 px-4 rounded-md hover:scale-105 bg-purple-500 hover:bg-purple-600 text-white">
      {children}
    </button>
  ) : (
    <button className=" transition-all transform hover:shadow-lg py-3 px-4 rounded-md hover:scale-105 border border-purple-500 hover:bg-purple-600 text-purple-500 hover:text-white">
      {children}
    </button>
  );
};
