import {GetJSON} from "services/serviceURL";

export async function ReconstructUser(user_id, name){
    //user_id should be an int representing the CORRECT user id
    const user_data = await GetJSON("/get_user", { id: user_id, name: name});
    let result = {}
    let data = []

    result['msg'] = user_data['data']['message']
    result['success'] = user_data['data']['success']
    if(user_data['data']['success'] === "True") {
        for (let i in user_data['data']['data']) {
            if (user_data['data']['data'].hasOwnProperty(i)) {
                let temp = {}
                temp['key'] = i;
                temp['name_attr'] = user_data['data']['data'][i][0];
                temp['attr'] = user_data['data']['data'][i][1];
                temp['person_id'] = user_data['data']['data'][i][2];
                data.push(temp);
            }
        }
        result['data'] = data
    }
    return result;
}

export async function ReconstructFamily(family_id){
    // Family_ID should be an int, representing the CORRECT family id
}