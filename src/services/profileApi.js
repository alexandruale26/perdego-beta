import supabase from "./supabase";
import { generateResponse } from "./helpers";
import { GENERIC_ERROR_MESSAGE } from "./constants";

const createProfile = async (profile) => {
  try {
    const { error, status } = await supabase.from("profiles").insert([
      {
        name: profile.name,
        phone: profile.phone,
        color: profile.color,
        email: profile.email,
        location: profile.location,
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

const getProfile = async (id) => {
  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("email, name, phone, createdAt, color, location")
      .eq("id", id)
      .single();

    if (error || status !== 200 || data === error) throw new Error("Error fetching user profile");
    return generateResponse("ok", data);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
  }
};

export { createProfile, getProfile };
