import { Button, Modal } from "@mantine/core";
import { useTranslation } from "react-i18next";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, confirmText }) => {
  const { t } = useTranslation();
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      centered
      classNames={{
        root: "dark:!bg-slate-700",
        header: "dark:!bg-slate-700",
        content: "!rounded-xl dark:!bg-slate-700",
        title: "!text-md !font-semibold ",
        close: "dark:!text-white",
      }}
      title={title || t("actions.confirm")}
      overlayProps={{
        backgroundOpacity: 0.45,
        blur: 2,
        color: "#ff9800",
      }}
    >
      <span className="font-normal">{confirmText}</span>

      <div className="flex w-full justify-end mt-2">
        <Button variant="filled" color="red" onClick={onConfirm}>
          {t("actions.confirm")}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
