import { Button, Modal, NumberInput } from "@mantine/core";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import services from "../../services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import BarLoading from "../../components/Loading/BarLoading";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import validations from "./validations/validations";

const OrderCreateModal = ({
  isOpen,
  onClose,
  onSend,
  title,
  oldSlidesData,
  text,
  id,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validations),
  });

  const { isLoading: isAddMainSliderLoading, data: addMainSliderData } =
    useQuery({
      enabled: isOpen,
      queryKey: ["addMainSliderData"],
      queryFn: async () =>
        await services.cards("MAIN_SLIDER").then((res) => {
          const newData = res.data.map((item) => ({
            value: item._id,
            label: item.name,
          }));
          return newData;
        }),
    });
  const addSlideToPage = useMutation({
    mutationFn: (newSlides) => services.updateSlides(newSlides),
  });

  const handleClose = () => {
    onClose();
    reset();
  };
  const onSubmit = async (data) => {
    let newMainSliderData;
    let mainSlider;
    try {
      newMainSliderData = {
        items: [
          ...oldSlidesData.map((item, index) => ({
            id: item?.id,
            order: index,
          })),
          {
            id: data.slides,
            order: oldSlidesData.length,
          },
        ],
        type: "MAIN_SLIDER",
      };
      mainSlider = await addSlideToPage.mutateAsync(newMainSliderData);
      if (mainSlider) {
        toast.success("Eklendi", {
          duration: 3000,
        });
        onSend(newMainSliderData);

        reset();
      }
    } catch (e) {
      toast.error("Eklenemedi", {
        duration: 3000,
      });
    }
  };

  const slides = useWatch({
    control,
    name: "slides",
    defaultValue: null,
  });

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      centered
      classNames={{
        root: "dark:!bg-slate-700 !bg-gray-200",
        header: "dark:!bg-slate-700 !bg-gray-200",
        content: "!rounded-xl dark:!bg-slate-700 !bg-gray-200",
        title: "!text-md !font-semibold ",
        close: "dark:!text-white dark:!bg-gray-800 dark:hover:!bg-gray-800/70",
      }}
      title={title || "Add Storage Product"}
      overlayProps={{
        backgroundOpacity: 0.45,
        blur: 2,
        color: "#ff9800",
      }}
    >
      <div>
        {isAddMainSliderLoading ? (
          <BarLoading />
        ) : (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-full">
                <div className="sm:col-span-full">
                  <div className="mt-2 mb-4">
                    <label className="mt-2 text-sm" htmlFor="name">
                      Slayt
                    </label>
                    <CustomSelect
                      control={control}
                      name="slides"
                      value={slides}
                      placeholder={t("placeholders.select")}
                      data={addMainSliderData}
                    />
                    {errors.slides && (
                      <span className="text-xs text-red-500">
                        Slayt Seçiniz
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-end mt-2 gap-2">
                <Button
                  variant="outline"
                  color="yellow"
                  onClick={() => handleClose()}
                  radius={"md"}
                >
                  {t("actions.cancel")}
                </Button>
                <Button
                  variant="filled"
                  color="yellow"
                  type="submit"
                  radius={"md"}
                >
                  {t("actions.confirm")}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default OrderCreateModal;
