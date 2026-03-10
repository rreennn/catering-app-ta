import clsx from "clsx";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyle =
    "px-4 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      className={clsx(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
