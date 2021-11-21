import React, {useState, useEffect}  from "react";
import firebase from "../../services/firebase";
import {v4 as uuid} from "uuid";
import styles from './UploadImage.module.css'

export default function UploadImage(){

const [imageUrl, setImageUrl] = useState([]);

const readImages=async (e) => {
    const file = e.target.files[0];
    // the files appears on firebase under "images" to change that we need to get the uuid dependancy so it would generate random ID numbers for the images in store in firebase
    const id = uuid()
    const storageRef = firebase.storage().ref("images").child(id);
    const imageRef = firebase.database().ref('images').child("daily").child(id);
   await storageRef.put(file)
   storageRef.getDownloadURL().then((url) => {
    //    we are using set instead of push 
    imageRef.set(url)
    const newState = [...imageUrl, {id, url}];

    setImageUrl(newState)
   })
    console.log(file)
}

const getImageUrl = () => {

    const imageRef = firebase.database().ref('images').child("daily")
    imageRef.on("value", (snapshot) => {
        
        const imageUrls = snapshot.val();
        const urls = [];
        for (let id in imageUrls){
            urls.push({id, url: imageUrls[id] })
        }
        const newState = [...imageUrl, ...urls];
        setImageUrl(newState)
    })
};

const deleteImage = (id)=> {
    const storageRef = firebase.storage().ref("images").child(id);
    const imageRef = firebase.database().ref('images').child("daily").child(id);
    storageRef.delete().then(() => {
        imageRef.remove();
    })

}




useEffect(() => {

    getImageUrl()
},[])


return (
    <div className={styles.uploadSec}>
        <h1>Upload Pics to your gallery</h1>
        <input type="file" accept="image/*"  onChange={readImages}/>
        <section>
        {imageUrl
            ? imageUrl.map(({id, url}) => {
                    return (
                        
                        <div className={styles.imgSec} key={id} >
                            <img src={url}  alt="" />
                            <button className={styles.button} onClick={() => deleteImage(id)} >Delete</button>

                        </div>
                    )
            })
        
            : "" }
            </section>
        {/* <img src={imageUrl} alt="" /> */}
    </div>
)

}

