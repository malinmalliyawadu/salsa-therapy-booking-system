interface ButtonLinkProps {
  appearance?: "primary" | "secondary";
  href: string;
  className?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  appearance = "primary",
  href,
  className,
}) => {
  return appearance === "primary" ? (
    <a
      href={href}
      className={`shadow-lg shadow-indigo-500/50 transition-all transform hover:shadow-lg py-3 px-4 rounded-md hover:scale-105 bg-purple-500 hover:bg-purple-600 text-white  ${className}`}
    >
      {children}
    </a>
  ) : (
    <a
      href={href}
      className={`transition-all transform hover:shadow-lg py-3 px-4 rounded-md hover:scale-105 outline outline-purple-500 hover:bg-purple-600 text-purple-500 hover:text-white ${className}`}
    >
      {children}
    </a>
  );
};
