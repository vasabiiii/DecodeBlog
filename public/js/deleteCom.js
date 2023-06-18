function deleteCom(rateId){
    axios.delete(`/api/rate/${rateId}`).then(data=>{
        location.reload()
    })
    console.log(rateId)
}