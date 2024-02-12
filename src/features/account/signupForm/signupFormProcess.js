import { randomColor } from "../helpers";
import { capitalizeEachWordFromString } from "../../../utils/helpers";
import { signUpUser, deleteUserAtSignupError } from "../../../services/userApi";
import { createProfile } from "../../../services/profileApi";
import toastNotification from "../../../shared/Toasts";

const signupFormProcess = async (values, setIsLoading, setIsAccountCreated) => {
  setIsLoading(true);

  const email = values.email.toLowerCase();
  const color = randomColor();
  const name = capitalizeEachWordFromString(values.name);

  const signUpResponse = await signUpUser({ email, password: values.password });

  if (signUpResponse.status !== "ok") {
    setIsLoading(false);
    return toastNotification(signUpResponse.message);
  }

  const userId = signUpResponse.data;
  const newProfile = { name, email, color, id: userId, phone: values.phone, location: values.location };

  const profileResponse = await createProfile(newProfile);

  if (profileResponse.status !== "ok") {
    await deleteUserAtSignupError(userId); // no need to use response.status
    setIsLoading(false);

    return toastNotification(profileResponse.message);
  }

  setIsAccountCreated(true);
  setIsLoading(false);
};
export default signupFormProcess;
