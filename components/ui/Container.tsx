type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1140px] px-4 sm:px-5 lg:px-4 ${className}`}>
      {children}
    </div>
  );
}
