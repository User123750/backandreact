import React ,{useEffect, useState}from 'react'
import axios from 'axios'

axios.defaults.baseURL="http://localhost:5000/"

function App() {
    const [formData,setFormDta]=useState({})
   
     const [user,setUser]=useState([])
     const [edit,setEdit]=useState({name:"",email:""})
     const [bol,setBol]=useState(true)
     useEffect(()=>{
        getFetchData()
    },[])

    const handelChange=(e)=>{
        const {name,value}=e.target
        setFormDta({...formData,[name]:value})
    }

    const handeSubmit=async(e)=>{
        e.preventDefault()
        const data = await  axios.post("/create",formData)
        console.log(data) 
        getFetchData()
        // setUser([...user,data.data])
    }


    const getFetchData=async()=>{
        
        try {
            const response = await axios.get('/');
            setUser(response.data.data);
          } catch (error) {
            console.log(error);
          }
    }



const handelDelete=async(id)=>{
    const data = await axios.delete("/delete/"+id) 

    getFetchData();
    alert(data.data.message)
}

const handleEdit= async (item)=>{
    setEdit(item)
    setBol(false)
}

const handleUpdate= async ()=>{
    

    const data = await axios.put("/update/"+edit._id,edit)
    console.log(data);
    setBol(true);
    getFetchData()

}

  return (
    <div>
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" name="name" onChange={handelChange} value={edit.name} id="name" className="form-control" placeholder="Enter name" aria-describedby="nameHelp" />
</div>
<div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="text" name="email" onChange={handelChange} value={edit.email} id="email" className="form-control" placeholder="Enter email" aria-describedby="emailHelp" />
</div>

       
       {bol ? <button type="button" onClick={handeSubmit} class="btn btn-primary">Ajouter</button> : <button type="button" onClick={handleUpdate} class="btn btn-primary">Update</button>}
    

        <div class="table-responsive">
            <table class="table table-primary">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                       
                    </tr>
                </thead>
                <tbody>
    {user && user.length > 0 ? (
        user.map(item => (
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td><button type="button" onClick={() => handelDelete(item._id)} className="btn btn-primary">Delete</button>
                <button type="button" onClick={() => handleEdit(item)} className="btn btn-success">Edit</button></td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="4">No data available</td>
        </tr>
    )}
</tbody>

            </table>
        </div>
        
    </div>
  )
}

export default App