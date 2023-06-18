function saveToWatch(id){
    axios.post('/api/save', {id}).then(data =>{
        if(data.status == 200){
            // alert(data.data)
            location.reload()
        }
    })
}

function deleteFromToWatch(id){
    axios.delete(`/api/save/${id}`, {id}).then(data=>{
        if(data.status==200){
            // alert(data.data)
            location.reload()
        }
    })
}