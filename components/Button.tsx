interface ButtonProps {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="transition-all hover:shadow-lg py-3 px-4 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white">
      {children}
    </button>
  );
};
