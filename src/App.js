import { useState, useEffect } from "react";
import {auth} from './services/firebase';
import "./App.css";

import Header from './components/Header/Header.js';

export default function App() {
  const [state, setState] = useState({
    tracks: [{ track:"", album:""}],
    newTrack:{
      track:"",
      album:"",
      year:"",
      url:"",
    },
    editMode: false
  });

const [userState, setUserState] = useState({
  user: null
})



  useEffect(function(){

    // make AJAX request (property shorthand props)
    async function getAppData(){
      
      const tracks = await fetch('http://localhost:3001/api/tracks')
      .then(res => res.json())

      setState(prevState => ({
        ...prevState,
        tracks
      }));
    }

    getAppData()
    // set up authentication observer
    auth.onAuthStateChanged(user => setUserState({ user }));


  },[]);

   async function handleSubmit(e) {
    e.preventDefault();


    if(state.editMode){
      try{
        const {track, album, year, url, _id} = state.newTrack;
        const tracks = await  fetch(`http://localhost:3001/api/tracks/${_id}`,{
          method: 'PUT',
          headers: {
            'Content-type' : 'Application/json'
          },
          body: JSON.stringify({track, album, year, url})
        }).then(res => res.json());
        setState(prevState => ({
          ...prevState,
          tracks,
          editMode: false,
          newTrack:{
            track:'',
            album:'',
            year:'',
            url: ''
          }
        }));

      } catch{


      }

    } else {
      try {
        const track = await fetch('http://localhost:3001/api/tracks', {
          method:'POST',
          headers: {
            'Content-type' : 'Application/json'
          },
          body: JSON.stringify(state.newTrack)
        }).then(res => res.json())
        
          
          setState({
            tracks: [...state.tracks, track],
            newTrack: {
              track: "",
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
    const tracks =  await fetch(`http://localhost:3001/api/tracks/${id}`, {
      method: 'DELETE'
    }).then(res => res.json());
    setState(prevState => ({
      ...prevState,
      tracks
    }))
  } catch{



  }
}




  return (
    <>
    <Header user={userState.user} />
    <section>
      <hr />
      <div>
      {state.tracks.map((s, i) => (
        <article className="container" key={i}>
          <div>{s.track}</div> 
          <div>{s.album}</div>
          <div>{s.year}</div>
          <div> {s.url}</div>
          <div className="controls" onClick={()=> handleEdit(s._id)}> {'✏️'}</div>
          <div className="controls" onClick={() => handleDelete(s._id)}> {'🗑'}</div>

        </article>
      ))}
      <hr />
      </div>

      <form onSubmit={handleSubmit}>
        <label>Track name<input name="track" value={state.newTrack.track} onChange={handleChange}  /></label>          
        <label>album<input name="album" value={state.newTrack.album} onChange={handleChange}  /></label>
        <label> Year<input name="year" value={state.newTrack.year} onChange={handleChange}  /></label>
        <label>url<input name="url" value={state.newTrack.url} onChange={handleChange}  /></label>




         
        
        <button>{state.editMode ? 'Edit ' : 'Add '}</button>
      </form>
    </section>
    </>
  );
}