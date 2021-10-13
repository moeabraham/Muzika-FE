import { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
// import axios from 'axios'
import {auth} from './services/firebase';
import {fetchtracks, updateTrack, createTrack, deleteTrack} from "./services/track-service";
// import FormPage from './pages/FormPage/FormPage';
import "./App.css";
// import Header from './components/Header/Header.js';
import {  Route, Switch } from 'react-router-dom';
import FormPage from './pages/FormPage/FormPage'
// import imageSelected from './pages/FormPage/FormPage'
import MainPage from './pages/MainPage/MainPage'
import $ from 'jquery'
import DetailsPage from "./pages/DetailsPage/DetailsPage";

// import imageSelected from "./pages/FormPage/FormPage";



export default function App() {


  const [image, setImage] = useState('')



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


// const [image, setImage] = useState({})

// console.log(image)
// console.log(toLocaleString(imageSelected))
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

      if(!userState.user) return;
      const tracks = await fetchtracks(userState.user.uid);

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

  }, [userState.user]);

   async function handleSubmit(e) {
    e.preventDefault();
    if(!userState.user) return;

    if(state.editMode){
      try{

        const tracks = await  updateTrack(state.newTrack, userState.user.uid);

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
        const track = await createTrack(state.newTrack,  userState.user.uid, image );
        console.log(image)

          
          setState({
            tracks: [...state.tracks, track],
            newTrack: {
              track: "",
              artist:"",
              album: "",
              year:"",
              url:image
         
            }
          })
          
          setImage('')
          // TODO: set form to empty string
          $('.text').val('');
          $('.text').val('');
          $('.submit')
      
  
  
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
  if(!userState.user) return;

  const trackToEdit = state.tracks.find(track => track._id === id)
  setState(prevState => ({
    ...prevState,
    newTrack: trackToEdit,
    editMode: true
  }))
}

async function handleDelete(id){
  if(!userState.user) return;

  try{
    const tracks =  await deleteTrack(id, userState.user.uid);

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
   <Switch>
   {/* <Route 
     exact path='/'
   render={(props) => (
     <MainPage 
     {...props}
     state={state}
     userState={userState}
    />
   )}
/> */}

{/* remember to be specific about how you arrange you Routes, '/' with exact as first. then either use exact or arrange them properly  */}
   <Route 
     exact path='/FormPage'
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

   </Switch>






   <Switch>
   <Route 
     exact path='/details'
   render={()=> (
     <DetailsPage
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
     
     
   </Switch>







   

 <Route
   exact path='/'
   render={(props) => (
     <MainPage 
     {...props}
     state={state}
     userState={userState}
 />
   )}
   /> 
   </>
  );
}