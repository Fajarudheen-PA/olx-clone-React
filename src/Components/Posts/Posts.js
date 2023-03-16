import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import Loading from '../Loading/Loading';
import './Post.css';

function Posts() {
const {firebase} = useContext(FirebaseContext)
const [products,setProducts] = useState([])
const [recommended,setRecommended] = useState([])
const {setPostDetails} = useContext(PostContext)
const [loading,setLoading] = useState(false)
const history = useHistory()

useEffect(()=>{
  firebase.firestore().collection('products').get().then((snapshot)=>{
    const allPost = snapshot.docs.map((product)=>{
     return {
      ...product.data(),
      id:product.id
     }
    })
    setProducts(allPost)

    const randomProducts = [...allPost].sort(() => 0.5 - Math.random()).slice(0,10);
    setRecommended(randomProducts);
  });
},[firebase]); 

// const moveToView = (e)=>{
//   e.preventDefault();
//   setLoading(true);
//   setTimeout(() => {
//     setLoading(false)
//     history.push('/view')
//   }, 1000);
// }

  return (
    <div className="postParentDiv">
      {loading ? <Loading/> : ""}
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
      {products.map(product=>{
      
      return    <div className="card"
                // onClick={()=>{
                //   setPostDetails(product)
                //   setLoading(true)
                //   history.push('/view')
                // }}
                onClick={(e)=>{
                  e.preventDefault();
                  setLoading(true);
                  setPostDetails(product)
                  setTimeout(() => {
                    setLoading(false)
                    history.push('/view')
                  }, 1000);
                }}
                >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="product" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          })
      }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
       {recommended.map(product=>{

        return  <div className="card"
          // onClick={()=>{
          //   setPostDetails(product)
          //   history.push('/view')
          // }}
          onClick={(e)=>{
            e.preventDefault();
            setLoading(true);
            setPostDetails(product)
            setTimeout(() => {
              setLoading(false)
              history.push('/view')
            }, 1000);
          }}
        >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
        })  
       }  
        </div>
      </div>
    </div>
  );
}

export default Posts;
