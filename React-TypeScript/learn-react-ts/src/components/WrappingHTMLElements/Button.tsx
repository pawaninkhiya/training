import "./Button.css";
type ButtonVariantProps = {
  variant: "primary" | "secondary";
  children: string;
} & Omit<React.ComponentProps<"button">, "children">;
const CustomButton = ({ variant, children, ...rest }: ButtonVariantProps) => {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;

// import "./Button.css";
// type ButtonVariantProps = {
//   variant: "primary" | "secondary",
// } & React.ComponentProps<"button">
// const CustomButton = ({ variant, children, ...rest }: ButtonVariantProps) => {
//   return (
//     <button className={`class-with-${variant}`} {...rest}>
//       {children}
//     </button>
//   );
// };

// export default CustomButton;
