import {PutJSON} from "services/serviceURL";

export function InputUser(input){
    const loc = "/submit_user";
    const params = {
        name: input,
    }
    PutJSON(loc, params)
}

export function InputFamily(input){
    const loc = "/submit_family";
    let params = {
        name: input,
    };
    console.log(loc, params)
    PutJSON(loc, params)
}