import {GetJSON} from "services/serviceURL";

export async function ReconstructUser(user_id){
    //user_id should be an int representing the CORRECT user id
    const user_data = await GetJSON("/get_user", { id: user_id });
    return user_data;
}

export async function ReconstructFamily(family_id){
    // Family_ID should be an int, representing the CORRECT family id
}