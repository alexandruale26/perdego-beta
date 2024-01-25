import supabase from "./supabase";
import { generateResponse } from "./helpers";
import { GENERIC_ERROR_MESSAGE, USER_EXISTS_MESSAGE } from "./constants";

const userExistsError = "User already registered";

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

    const message = error.message === userExistsError ? USER_EXISTS_MESSAGE : GENERIC_ERROR_MESSAGE;
    return generateResponse(null, null, message);
  }
};

const createProfile = async (profile) => {
  try {
    const { error, status } = await supabase.from("profiles").insert([
      {
        name: profile.name,
        phone: profile.phone,
        color: profile.color,
        email: profile.email,
        id: profile.id,
      },
    ]);

    if (error || status !== 201) throw new Error(GENERIC_ERROR_MESSAGE);

    console.log("created profile - ok");
    return generateResponse("ok", null);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null, error.message);
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

const loginUser = async (credentials) => {
  const data = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  console.log(data);
};

const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (session.session === null) return generateResponse(null, null);

  const { data, error } = await supabase.auth.getUser();
  if (error || data.user === null) return generateResponse(null, null);

  return generateResponse("ok", { id: data.user.id });
};

const getProfile = async (id) => {
  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("email, name, phone, createdAt, color")
      .eq("id", id)
      .single();

    if (error || status !== 200 || data === error) throw new Error("Error fetching user profile");
    return generateResponse("ok", data);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
  }
};

export { signUpUser, loginUser, deleteUserAtSignupError, createProfile, getCurrentUser, getProfile };
