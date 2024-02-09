import supabase from "./supabase";
import { generateResponse } from "./helpers";
import {
  GENERIC_ERROR_MESSAGE,
  EMAIL_EXISTS_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  SAME_PASSWORD_ERROR_MESSAGE,
} from "./apiErrorMessages";

const supabaseSamePasswordResponseMessage = "New password should be different from the old password.";
const supabaseExistingEmailResponseMessage = "A user with this email address has already been registered";
const supabaseUserExistsError = "User already registered";

const signUpUser = async (credentials) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error || data.user === null) throw new Error(error.message);
    return generateResponse("ok", data.user.id);
  } catch (error) {
    console.log(error);

    const message = error.message === supabaseUserExistsError ? EMAIL_EXISTS_MESSAGE : GENERIC_ERROR_MESSAGE;
    return generateResponse(null, null, message);
  }
};

const deleteUserAtSignupError = async (id) => {
  try {
    const { error, status } = await supabase.rpc("delete_user_at_signup_error", { user_id_to_delete: id });

    if (error || status !== 204) throw new Error(error);

    console.log(`user deleted: ${id}`, status === 204);
    return generateResponse("ok", null);
  } catch (error) {
    console.log(error.message);
    return generateResponse(null, null, error.message);
  }
};

const deleteUserAccount = async (id) => {
  try {
    // profiles are automatically removed at user deletion
    const data = await supabase.rpc("delete_user_and_images", { user_id: id });

    console.log(data);
    // TODO: logout user and delete cache and redirect
    // ok these are good !!! ⬇️

    // if (error || status !== 204) throw new Error(error);

    // console.log(`user deleted: ${id}`, status === 204);
    // return generateResponse("ok", null);
  } catch (error) {
    console.log(error.message);
    // return generateResponse(null, null, error.message);
  }
};

const loginUser = async (credentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error || data.user === null) throw new Error(LOGIN_ERROR_MESSAGE);
    return generateResponse("ok", null);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null, error.message);
  }
};

const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      if (error.message === supabaseSamePasswordResponseMessage || error.status === 422) {
        throw new Error(SAME_PASSWORD_ERROR_MESSAGE);
      } else {
        throw new Error(GENERIC_ERROR_MESSAGE);
      }
    }

    console.log("password reset - ok");
    return generateResponse("ok", null, "Parola a fost salvatǎ cu succes.");
  } catch (error) {
    console.log(error);
    return generateResponse(null, null, error.message);
  }
};

const updateEmail = async (newEmail) => {
  try {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      if (error.message === supabaseExistingEmailResponseMessage || error.status === 422) {
        throw new Error(EMAIL_EXISTS_MESSAGE);
      } else {
        throw new Error(GENERIC_ERROR_MESSAGE);
      }
    }

    console.log("email reset - ok");
    return generateResponse("ok", null, "E-mailul a fost salvat cu succes.");
  } catch (error) {
    console.log(error);
    return generateResponse(null, null, error.message);
  }
};

const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) throw new Error(GENERIC_ERROR_MESSAGE);
    return generateResponse("ok", null, "Te-ai deconectat cu succes.");
  } catch (error) {
    console.log(error);
    return generateResponse(null, null, error.message);
  }
};

const getCurrentUser = async () => {
  // session and user from local storage
  const { data: session } = await supabase.auth.getSession();
  if (session.session === null) return generateResponse(null, null);

  const { data, error } = await supabase.auth.getUser();
  if (error || data.user === null) return generateResponse(null, null);

  return generateResponse("ok", { id: data.user.id });
};

export {
  signUpUser,
  loginUser,
  deleteUserAtSignupError,
  deleteUserAccount,
  getCurrentUser,
  logoutUser,
  updatePassword,
  updateEmail,
};
