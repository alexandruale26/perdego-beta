import toast from "react-hot-toast";

const toastNotification = (message, successToast = false) =>
  toast(<span className="text-sm xs:text-base text-grey-800 text-center font-light">{message}</span>, {
    style: { background: successToast ? "#86efac" : "#fca5a5" },
  });

export default toastNotification;
