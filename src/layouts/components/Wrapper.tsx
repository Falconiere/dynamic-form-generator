type WrapperProps = {
  children: React.ReactNode;
};
const Wrapper = ({ children }: WrapperProps) => (
  <main className="grid grid-cols-[280px,calc(100%-280px)] h-full overflow-hidden">
    {children}
  </main>
);
export { Wrapper };
