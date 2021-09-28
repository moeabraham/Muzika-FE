const BASE_URL = ' http://localhost:3001/api/tracks'

function fetchtracks(uid){
    // return fetch(BASE_URL + '?uid' + uid).then(res => res.json())

    return fetch(`${BASE_URL}?uid=${uid}`).then((res) => res.json());

}


function updateTrack({track, artist, album, year, url, _id},uid){
    return fetch(`${BASE_URL}/${_id}`,{
        method: 'PUT',
        headers: {
          'Content-type' : 'Application/json'
        },
        body: JSON.stringify({track,artist, album, year, url})
      }).then(res => res.json());
}

function createTrack(data, uid){
    return fetch(BASE_URL, {
        method:'POST',
        headers: {
          'Content-type' : 'Application/json'
        },
        body: JSON.stringify({...data, uid})
      }).then(res => res.json())
      
}

function deleteTrack(id){
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      }).then(res => res.json());
      
}

export{
    fetchtracks,
    updateTrack,
    createTrack,
    deleteTrack
}