import React from 'react';
import './SlideRent.scss';

function SlideRent() {
    const images = [
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Ftra.jpg?alt=media&token=91c46e6a-cc43-4cf6-9334-c51f59ee1587",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fsieulua.jpg?alt=media&token=91a4b1f8-bfe1-4355-b32f-105e649199eb",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fngayxuacomotchuyentinh.jpg?alt=media&token=fce0626e-3c46-4222-bc41-7715682f9d60",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fmai.jpg?alt=media&token=06b9dcf3-98c2-4d50-963c-b99912a8026c",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Flatmat7.jpg?alt=media&token=09c50769-17fe-49b4-bdc2-1513d8d00f18",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fhaimuoi.jpg?alt=media&token=e9e9cf1d-51b4-4b5f-9ab2-4aea3186310f",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fdaopho.jpg?alt=media&token=f34eae9f-2b44-4b66-b072-78dd56004cc0",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fcodauhaomon.jpg?alt=media&token=5fcc5316-b9ea-407a-b6ff-88d95bd0f794",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2Fchichiemem.jpg?alt=media&token=12ce61c6-f0e0-428c-8c3a-54eb5682d4dd",
        "https://firebasestorage.googleapis.com/v0/b/uog-movie-website.appspot.com/o/Pictures%2Fsliderent%2FGaplaichibau.jpg?alt=media&token=1bd839ba-6407-41eb-94ce-37ea43c59cca",
    ];
    
    return (
        <div className="rent">
            <div className="box">
                {images.map((image, index) => (
                    <span key={index} style={{ "--i": index + 1 }}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SlideRent;
