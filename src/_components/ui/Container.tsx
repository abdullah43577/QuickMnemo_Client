import { containerStyles } from "./containerStyles";

interface ContainerProps {
  children: React.ReactNode;
  className: string;
}

export const Container = function ({ children, className }: ContainerProps) {
  return (
    <section className={`${containerStyles} ${className}`}>{children}</section>
  );
};
