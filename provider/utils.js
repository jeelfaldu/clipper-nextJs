import { toast } from "react-toastify";

export const notify = (msg, type = '') => {
  toast(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    draggable: false,
    progress: 0,
    theme: "light",
    type
  })
}