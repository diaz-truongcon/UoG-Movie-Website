import React from 'react';
import { Image } from "antd";
function Promotions(props) {
    return (
        <div >
            <Image  
                src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2FPromotion-1.png?alt=media&token=503d81fc-eac5-43fa-bbce-db5a8107621a"
                alt="Description of the image"
            />
            <Image 
            style={{ marginTop:"20px"}}           
                src="https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2FPromotion-2.png?alt=media&token=fc5c724a-083c-4ebc-a542-775b60ae8d75"
                alt="Description of the image"
            />
        </div>
    );
}

export default Promotions;