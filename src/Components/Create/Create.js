import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import Loading from '../Loading/Loading';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [loading,setLoading] = useState(false)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const history = useHistory()
  const date = new Date()
  const handleSubmit = (e)=>{
    e.preventDefault();
    if (!user) {
      toast.error("Please Login In To Upload Products",{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setLoading(true);

    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        }).then(()=>{
          setTimeout(() => {
            setLoading(false)
            history.push('/')
          }, 1000);
        })
      })
    }).catch(error =>{
      alert(error.message);
      setLoading(false)
    })
  }
  return (
    <Fragment>
      <Header />
      {loading ? <Loading/> : ""}
      <img src='../../../Images/olx-create-bg.jpg' alt='Background' className='login-bg'></img>
      <card>
        <div className="centerDiv">
            <label className='label' htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label className='label' htmlFor="fname">Choose Category</label>
            <br />
            {/* <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            /> */}
            <select
              className="input"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)} 
              >
                <option value="">--Please Choose Your Category--</option> 
                <option value="Vehicle" >Vehicle</option>
                <option value="Furniture">Furniture</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Kitchen Appliances">Kitchen Appliances</option>
                <option value="Others">Others</option>
            </select>
            <br />
            <label className='label' htmlFor="fname">Price</label>
            <br />
            <input
              className="input" 
              type="number"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              id="fname" 
              name="Price" 
            />
            <br />
          <br />
          <img className='image-display' alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} 
            style={{cursor:"pointer"}}
            type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </card>
      {<ToastContainer/>}
    </Fragment>
  );
};

export default Create;