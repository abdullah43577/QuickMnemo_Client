import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const customId = "toastID";
export const handleErrors = function (error: any) {
  if (error instanceof AxiosError) {
    if (error.response) {
      toast.error(error.response.data.message, {
        toastId: customId,
      });
    }
  } else {
    toast.error(error.message, {
      toastId: customId,
    });
  }
};
