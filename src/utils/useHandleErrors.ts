import { useModalStore } from "@/hooks/useStore";
import { AxiosError } from "axios";

export const useHandleErrors = function () {
  const { setShowToast } = useModalStore();

  const handleErrors = function (error: any) {
    if (error instanceof AxiosError) {
      if (error.response) {
        setShowToast({
          show: true,
          msg: error.response.data.message,
          type: "error",
        });
      }
    } else {
      setShowToast({
        show: true,
        msg: error.message,
        type: "error",
      });
    }
  };

  return handleErrors;
};
