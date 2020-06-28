import {GetJSON} from "services/serviceURL";

export function SearchUser(input){
    const loc = "/search_user";
    const params = {
        name: input,
    }

    const json_info = GetJSON(loc, params)
}

export function SearchFamily(input){
    const loc = "/search_family";
    let params = {
        name: input,
    };
    //make async
    const json_info = GetJSON(loc, params)
}