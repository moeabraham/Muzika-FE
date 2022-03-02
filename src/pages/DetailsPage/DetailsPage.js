

import React from 'react'
import Navbar from '../../components/Header/Navbar'
import UploadImage from "../../components/ImageUpload/UploadImage"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

import {Link} from 'react-router-dom'
// import styles from './FormPage.module.css'
// import Axios from 'axios';
// import { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import styles from './FormPage.module.css';
import "./DetailsPage.css";
// import Button from 'react-bootstrap/Button';

// import { CloudinaryContext } from "cloudinary-react";
// import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
// import { render } from "react-dom";

// import {storage} from "../../services/firebase.js"
// import {useParams} from 'react-router-dom';


const DetailsPage = (props) => {
  // const {ids} = useParams();

return (
    <>
    <style type="text/css">
      {`
      button{
        margin-right:1rem;
        background-color: #f17d80;       
      }
      `}
    </style>
    <Navbar user={props.userState.user} />
    <div className='buttons'>
    <button class="button">    <Link  class="link"to='/'> <AiIcons.AiFillHome /></Link>
 </button>
    <button class="button">    <Link  class="link"to='/formpage'><BiIcons.BiArrowBack />Back to form page</Link>
 </button>
 </div>
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