function deleteblog(id, authorID){
    axios.delete(`/api/${id}`).then(data=>{
       location.replace(`/`)
    })
    console.log(id, authorID)
}