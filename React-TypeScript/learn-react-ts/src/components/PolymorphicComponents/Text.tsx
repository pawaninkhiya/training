type TextProps = {
  size: "sm" | "md" | "lg";
  color: "primary" | "secondary";
  children: React.ReactNode;
  as?: React.ElementType;
};

export const Text = ({ size, color, children, as }: TextProps) => {
  const Component = as || "div";
  return (
    <Component className={`class-with-${size}-${color}`}>{children}</Component>
  );
};
