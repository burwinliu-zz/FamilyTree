export async function GetJSON(loc, params){
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(function(k) {return esc(k) + '=' + esc(params[k]);})
        .join('&');
    let res = {}
    const url =  loc+"?"+query
    const fetchData = async() =>{
        const data = await fetch(url);
        res = await data.json();
    }
    await fetchData();
    return res;
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