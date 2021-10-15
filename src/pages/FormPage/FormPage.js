import Header from '../../components/Header/Header'
import {Link} from 'react-router-dom'
// import styles from './FormPage.module.css'
import Axios from 'axios';
import { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import styles from './FormPage.module.css';
import "./FormPage.css";

// import { Image } from 'cloudinary-react';
// import { setImage } from '../../app';
// import Transformation from 'cloudinary-react'


// import MainPage from '../MainPage/MainPage'
const FormPage = (props) => {

const [imageSelected, setImageSelected] = useState('');
// console.log(imageSelected)
const uploadImage = () => {
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 'musicimages')
    Axios.post(
        '	https://api.cloudinary.com/v1_1/dklcmfo0q/image/upload', formData)
    .then((res) => {
        props.setImage(res.data.url);
      })
};

console.log(props.image)
console.log(props.state.newTrack.url)
useEffect(function () {
  props.state.newTrack.url = props.image
}, [props.image, props.state.newTrack])








return (
    <>
    <Header user={props.userState.user} />
    <Link className= "btn btn-default" to='/'> Home</Link>
      <div class="mainContainer container-fluid" >  

       <form  onSubmit={props.handleSubmit} >
      
      <div className="form-row" >
          <div className="form-input">
              <input placeholder="Enter Track Name..."  name="track" value={props.state.newTrack.track} onChange={props.handleChange}  />

          </div>
          <div className="form-input">
              <input  placeholder="Enter Artist Name" name="artist" value={props.state.newTrack.artist} onChange={props.handleChange}  />   

          </div>
      </div>
      <div className="form-row" >

          <div className="form-input">
              <input  placeholder="Enter Album Name" name="album" value={props.state.newTrack.album} onChange={props.handleChange}  />

          </div>
          <div className="form-input">
              <input  placeholder="Enter Release Year" name="year" value={props.state.newTrack.year} onChange={props.handleChange}/>
          </div>
       </div>   
      <div className="form-row-submit" >
      <div className="form-input-upload">

      <small>(upload twice to see image in effect)</small><input name="url" type="file"    
        // value={props.state.newTrack.url}
         onChange={(e) => {
            setImageSelected(e.target.files[0]);
            
            
             }} /> 
             
             </div>



             <div className="form-input-button">

        <button disabled={!props.userState.user} class="formdiv" onClick={uploadImage} > {props.state.editMode ? 'Edit ' : 'Add '}</button>
        </div>
        </div>
      </form>
      <div class="imgdiv " >
      { props.userState.user ? props.state.tracks.map((s, i) => (
        <div class="containerData" key={i}>
            {/* {console.log(props.image)} */}
          {/* <div> <img class="card-img-top"   cloudName='dklcmfo0q'  src={props.image} alt="Card image cap"/></div>  */}
          {/* <Image class="CardImage"  cloudName="dklcmfo0q" publicId={props.state.newTrack} /> */}
          <img class="cardImage" src={s.url}  publicid={props.image} alt="Loading"/>
{/* <cloudName='dklcmfo0q'  publicId="musicimages/lzgodi4uvnoitgwwct3p" > */}
        <div class='info'>
          <div><p>{s.track}</p></div>
          <div><p>{s.artist}</p></div>
          <div><p>{s.album}</p></div>
          
                            </div>

       


<div class="controls-container">
          <div class="controls" onClick={()=> props.handleEdit(s._id)}> {'✏️'}</div>
          <div class="controls" onClick={() => props.handleDelete(s._id)}> {'🗑'}</div> 
</div>

        </div>
      )) : 
    <article> No skills to show -please login  </article>
    }

      </div>
     
     

      
</div>
    </>)
}

export default FormPage;
