function request(url, method, data, callback){
    fetch(url,
        {
            credentials: 'include', //allow CORS
            method: method,
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: (data === null)? null:JSON.stringify(data),
        })
        .then((response)=>{
            // alert("###")
            // alert(response.status)
            if(response.status === 200)
                return response;
        })
        .then((data)=>{
            // alert("###")
            // alert(data)
            return data.json()
        })
        .then((data)=>{
            // alert("###")
            // alert(data)
            callback(data)
        })
        .catch((err)=>{
            console.log(err)
        })
}