import { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
// import axios from 'axios'
import {auth} from './services/firebase';
import {fetchtracks, updateTrack, createTrack, deleteTrack} from "./services/track-service";
// import FormPage from './pages/FormPage/FormPage';
import "./App.css";
import Header from './components/Header/Header.js';
import {  Route } from 'react-router-dom';
import FormPage from './pages/FormPage/FormPage'
import MainPage from './pages/MainPage/MainPage'

// import imageSelected from "./pages/FormPage/FormPage";



export default function App() {
  const [state, setState] = useState({
    tracks: [{ track:"",artist:"", album:"", year:"", url:""}],
    newTrack:{
      track:"",
      artist:"",
      album:"",
      year:"",
      url:"",
    },
    editMode: false
  });

const [userState, setUserState] = useState({
  user: null
})

const [image, setImage] = useState('')

console.log(image)
// console.log(state.newTrack)

// const [loading, setLoading] = useState(false)
// const uploadImage = e => {
//   const files = e.target.files[0];
//   const formData = new FormData();
//   formData.append("upload_preset", "musicimages")
//   formData.append("file", "files");
//   setLoading(true);

//   axios.post('https://api.cloudinary.com/v1_1/dklcmfo0q/image/upload', {formData})
//   .then(res => setImage(res.data.secure_url))
//   .then(setLoading(false))
//   .catch(err => console.log(err));

// }


  useEffect(function(){

    // make AJAX request (property shorthand props)
    async function getAppData(){
      
      const tracks = await fetchtracks();

      setState(prevState => ({
        ...prevState,
        tracks
      }));
    }

    getAppData()
    // set up authentication observer
    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));

    return function (){
    // clean up functions
    unsubscribe();
    }

  },[]);

   async function handleSubmit(e) {
    e.preventDefault();


    if(state.editMode){
      try{

        const tracks = await  updateTrack(state.newTrack);

        setState(prevState => ({
          ...prevState,
          tracks,
          editMode: false,
          newTrack:{
            track:'',
            artist:'',
            album:'',
            year:'',
            url: ''
          }
          // console.log(state.newTrack)
        }));

      } catch (error){

      }

    } else {
      try {
        const track = await createTrack(state.newTrack);
        // console.log(image)

          
          setState({
            tracks: [...state.tracks, track],
            newTrack: {
              track: "",
              artist:"",
              album: "",
              year:"",
              url:""
         
            }
          })
          
    
  
  
      } catch(error) {
        console.log(error)
      }
  

    }






  }
// when updating the form we are merging old values with new values while with add skill we are just replacing the latest data
  function handleChange(e){
    setState(prevState => ({
        ...prevState,
        newTrack:{
          ...prevState.newTrack,
        [e.target.name]: e.target.value
      }
    }));
  }

function handleEdit(id){
  const trackToEdit = state.tracks.find(track => track._id === id)
  setState(prevState => ({
    ...prevState,
    newTrack: trackToEdit,
    editMode: true
  }))
}

async function handleDelete(id){
  try{
    const tracks =  await deleteTrack(id);

    setState(prevState => ({
      ...prevState,
      tracks
    }))
  } catch{



  }
}




  return (
   <>
   {/* <Route 
   path='/'
   render={() => (
<MainPage />
   )}
   /> */}
   <Route 
   path='/FormPage'
   render={()=> (
     <FormPage
     state={state}
     userState={userState}
     handleSubmit={handleSubmit}
     handleChange={handleChange}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
     image={image}
     setImage={setImage}
     
     />
   )}
   />
{/* 
   <Route
   path='/'
   render={() => (
     <MainPage
     state={state}
     userState={userState}
 />
   )}
   /> */}
   </>
  );
}