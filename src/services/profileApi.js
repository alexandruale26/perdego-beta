import supabase from "./supabase";
import { generateResponse } from "./helpers";
import { GENERIC_ERROR_MESSAGE, PROFILE_ERROR_MESSAGE } from "./apiErrorMessages";

const profilesTable = "profiles";

const createProfile = async (profile) => {
  try {
    const { error, status } = await supabase.from(profilesTable).insert([
      {
        name: profile.name,
        phone: profile.phone,
        color: profile.color,
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
      .from(profilesTable)
      .select("name, phone, createdAt, color, location")
      .eq("id", id)
      .single();

    if (error || status !== 200 || data === error) throw new Error("Error fetching user profile");
    return generateResponse("ok", data);
  } catch (error) {
    console.log(error);
    return generateResponse(null, null);
  }
};

const updateProfile = async (profileId, profile) => {
  try {
    const { error, status } = await supabase
      .from(profilesTable)
      .update({ name: profile.name, location: profile.location, phone: profile.phone })
      .eq("id", profileId);

    if (error || status !== 204) throw new Error(PROFILE_ERROR_MESSAGE);
    console.log("modified profile - ok");
    return generateResponse("ok", null, "Profilul tǎu a fost modificat cu success");
  } catch (error) {
    console.log(error);
    return generateResponse(null, null, error.message);
  }
};

export { createProfile, getProfile, updateProfile };
