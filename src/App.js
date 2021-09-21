import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [state, setState] = useState({
    tracks: [{ name: "JavaScript", album: 4 }],
    newTrack:{
      name:"",
      album:"3"
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

  function addTrack(e) {
    e.preventDefault();
    setState({
      tracks: [...state.tracks, state.newTrack],
      newTrack: {
        name: "",
        album: "3"
      }
    })
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
          <div>{s.name}</div> <div>{s.album}</div>
        </article>
      ))}
      <hr />
      <form onSubmit={addTrack}>
        <label>
          <span>name</span>
          <input name="name" value={state.newTrack.name} onChange={handleChange}  />
        </label>
        <label>
          <span>album</span> 
          <input name="album" value={state.newTrack.album} onChange={handleChange}  />

          {/* <select name="album" value={state.newTrack.album} onChange={handleChange}  >
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