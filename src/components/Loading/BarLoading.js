import { Loader } from "@mantine/core";

const BarLoading = () => {
  return (
    <div className="flex items-center h-full justify-center w-full">
      <Loader color="yellow" type="bars" />
    </div>
  );
};

export default BarLoading;
