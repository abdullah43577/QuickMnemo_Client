import { useModalStore } from "@/hooks/useStore";
import { AxiosError } from "axios";
// import { toast } from "react-toastify";

export const customId = "toastID";
export const HandleErrors = function (error: any) {
  const { setShowToast } = useModalStore();

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
// export const handleErrors = function (error: any) {
//   if (error instanceof AxiosError) {
//     if (error.response) {
//       toast.error(error.response.data.message, {
//         toastId: customId,
//       });
//     }
//   } else {
//     toast.error(error.message, {
//       toastId: customId,
//     });
//   }
// };
