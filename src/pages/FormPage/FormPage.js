import Header from '../../components/Header/Header'
import {Link} from 'react-router-dom'
// import styles from './FormPage.module.css'
import Axios from 'axios';
import { useState } from 'react';
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










return (
    <>
    <Header user={props.userState.user} />
    <Link className= "btn btn-default" to='/'> Home</Link>
      <div class="mainContainer container-fluid" >  
      <div class="imgdiv container-fluid" >
      { props.userState.user ? props.state.tracks.map((s, i) => (
        <div class="containerData" key={i}>
            {/* {console.log(props.image)} */}
          {/* <div> <img class="card-img-top"   cloudName='dklcmfo0q'  src={props.image} alt="Card image cap"/></div>  */}
          {/* <Image class="CardImage"   src={s.url} /> */}
          <img class="cardImage" src={s.url} alt="Loading"/>
{/* <cloudName='dklcmfo0q'  publicId="musicimages/lzgodi4uvnoitgwwct3p" > */}
<div class='info'>
          <div><p>{s.track}</p></div>
          <div><p>{s.artist}</p></div>
          <div><p>{s.album}</p></div>
          </div>
          {/* <img class="card-img-top" cloudname="dklcmfo0q" publicid="musicimages/lzgodi4uvnoitgwwct3p" alt="Card image cap"  /> */}

       


<div class="controls-container">
          <div class="controls" onClick={()=> props.handleEdit(s._id)}> {'✏️'}</div>
          <div class="controls" onClick={() => props.handleDelete(s._id)}> {'🗑'}</div> 
</div>

        </div>
      )) : 
    <article> No skills to show -please login  </article>
    }

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

        
        <button disabled={!props.userState.user} class="formdiv" onClick={uploadImage} > {props.state.editMode ? 'Edit ' : 'Add '}</button>
        </div>
      </form>

      
</div>
    </>)
}

export default FormPage;
