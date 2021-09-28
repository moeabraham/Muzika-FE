import Header from '../../components/Header/Header'
// import styles from './FormPage.module.css'
import Axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import styles from './FormPage.module.css';
import "./FormPage.css";

import { Image } from 'cloudinary-react';
// import { setImage } from '../../app';
// import Transformation from 'cloudinary-react'


// import MainPage from '../MainPage/MainPage'
const FormPage = (props) => {

const [imageSelected, setImageSelected] = useState('');
console.log(imageSelected)
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










return (
    <>
    <Header user={props.userState.user} />
      <div class="mainContainer container-fluid" >  
      <div class="imgdiv container-fluid" >
      {props.state.tracks.map((s, i) => (
        <div class="containerData" key={i}>
            {/* {console.log(props.image)} */}
          {/* <div> <img class="card-img-top"   cloudName='dklcmfo0q'  src={props.image} alt="Card image cap"/></div>  */}
          <Image class="CardImage"   src={s.url} />
{/* <cloudName='dklcmfo0q'  publicId="musicimages/lzgodi4uvnoitgwwct3p" > */}
          <p>{s.track}</p>
          {/* <img class="card-img-top" cloudname="dklcmfo0q" publicid="musicimages/lzgodi4uvnoitgwwct3p" alt="Card image cap"  /> */}

       



          <div className="controls" onClick={()=> props.handleEdit(s._id)}> {'✏️'}</div>
          <div className="controls" onClick={() => props.handleDelete(s._id)}> {'🗑'}</div> 


        </div>
      ))}

      </div>
     
      <form  onSubmit={props.handleSubmit} >
        <div >
      
      <div  >
      <label >Track name<input name="track" value={props.state.newTrack.track} onChange={props.handleChange}  /></label> 

      </div>
      <div >
      <label >Artist name<input name="artist" value={props.state.newTrack.artist} onChange={props.handleChange}  /></label>    

      </div>
      <div >
      <label  >album<input name="album" value={props.state.newTrack.album} onChange={props.handleChange}  /></label>

      </div>
      <div  >
      <label > Year<input name="year" value={props.state.newTrack.year} onChange={props.handleChange}  /></label>

      </div>
      <div  >
      <label >URL<input name="url"  value={props.image} onChange={props.handleChange}   /></label> 

      </div>



      <div  >
      <label > Upload<input name="url" type="file"    
        // value={props.state.newTrack.url}
         onChange={(e) => {
            setImageSelected(e.target.files[0]);

          
      
            
             }} /> 
             </label>
      </div>

        
        <button class="formdiv" onClick={uploadImage} > {props.state.editMode ? 'Edit ' : 'Add '}</button>
        </div>
      </form>

      
</div>
    </>)
}

export default FormPage;
