export async function GetJSON(loc, params){
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(function(k) {return esc(k) + '=' + esc(params[k]);})
        .join('&');
    let response = []
    const url =  loc+"?"+query
    const fetchData = async() =>{
        const data = await fetch(url);
        const res = await data.json();
        for (let i in res){
            let temp = {}
            temp['key'] = i;
            temp['name_attr'] = res[i][0];
            temp['attr'] = res[i][1];
            temp['person_id'] = res[i][2];
            response.push(temp);
        }
    }
    await fetchData();
    return response;
}

export function PutJSON(loc, params){
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(function(k) {return esc(k) + '=' + esc(params[k]);})
        .join('&');

    const url =  loc+"?"+query
    fetch(
        url,
        {
            method: 'POST'
        })
        .then(data=>{
            console.log(data.json)
            return data.json();
        })
        .then(res=>{
            console.log("2nd PROMISE", res)
        })

}