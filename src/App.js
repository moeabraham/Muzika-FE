import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [state, setState] = useState({
    tracks: [{ track:"", album:""}],
    newTrack:{
      track:"",
      album:"",
      year:"",
      url:"",
    }
  });

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
    // put incoming data into state(aka update state)
  },[]);

   async function handleSubmit(e) {
    e.preventDefault();

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
// when updating the form we are merging old values with new values while with add skill we are just replacing the latest data
  function handleChange(e){
    console.log(e.target)
    setState(prevState => ({
        tracks: prevState.tracks,
        newTrack:{
          ...prevState.newTrack,
        [e.target.name]: e.target.value
      }
    }));
  }

  return (
    <section>
      <h2>Tracks </h2>
      <hr />
      {state.tracks.map((s, i) => (
        <article key={i}>
          <div>{s.track}</div> <div>{s.album}</div>
        </article>
      ))}
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          <span>track name</span>
          <input name="track" value={state.newTrack.track} onChange={handleChange}  />
        </label>
        <label>
          <span>album</span> 

          <input name="album" value={state.newTrack.album} onChange={handleChange}  />
          <input name="year" value={state.newTrack.year} onChange={handleChange}  />
          <input name="url" value={state.newTrack.url} onChange={handleChange}  />



          {/* <select name="year" value={state.newTrack.year} onChange={handleChange}  >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select> */}
        </label>
        <button>ADD Track</button>
      </form>
    </section>
  );
}