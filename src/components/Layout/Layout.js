import Header from "./Header";

const Layout = ({ children, routes }) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="py-10 lg:pl-72 flex flex-1 flex-col  max-w-full overflow-y-scroll overflow-x-hidden   h-screen max-h-full ">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};
export default Layout;
