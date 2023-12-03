type ContainerProps = {
  children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => (
  <div className="grid grid-rows-[60px,calc(100%-60px)] bg-slate-100 overflow-hidden">
    {children}
  </div>
);
export { Container };
