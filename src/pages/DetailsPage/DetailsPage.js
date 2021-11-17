

import React from 'react'
import Header from '../../components/Header/Header'
import UploadImage from "../../components/ImageUpload/UploadImage"

// import {Link} from 'react-router-dom'
// import styles from './FormPage.module.css'
// import Axios from 'axios';
// import { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import styles from './FormPage.module.css';
import "./DetailsPage.css";
// import { CloudinaryContext } from "cloudinary-react";
// import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
// import { render } from "react-dom";

// import {storage} from "../../services/firebase.js"
// import {useParams} from 'react-router-dom';


const DetailsPage = (props) => {
  // const {ids} = useParams();

return (
    <>
    
    <Header user={props.userState.user} />
    <UploadImage />
    {/* {console.log(props.state.tracks)} */}
    
    {/* <h1>Product id: {ids}</h1> */}

  

      {/* <h1>a7a</h1> */}
      {props.state.tracks.map((track, id) => (
        <div  >
          {console.log(track._id)}

        </div>
      ))}

    </>
)



}


export default DetailsPage;