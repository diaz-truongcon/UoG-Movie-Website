import React from 'react';
import './SlideRent.scss';

function SlideRent() {
    const images = [
        "https://assets.glxplay.io/web/images/SugarBabyNghiep_1920x1080_S.max-1920x1080.jpg",
        "https://assets.glxplay.io/web/images/TheDesperateChase_1920x1080_S.max-1920x1080.jpg",
        "https://assets.glxplay.io/web/responsive/w300/ChiaKhoaTramTy_1000x1500.jpg",
        "https://assets.glxplay.io/web/responsive/w300/MyHeroAcademiaWorldHeroesMission_1000x1500.jpg",
        "https://assets.glxplay.io/web/responsive/w300/Cinderella2021_1000x1500.jpg",
        "https://assets.glxplay.io/web/responsive/w300/Eve_1000x1500.jpg",
        "https://assets.glxplay.io/web/responsive/w300/DoctorStrangeInTheMultiverseOfMadness_1000x1500.jpg",
        "https://assets.glxplay.io/web/responsive/plain/section-6_2.jpg",
        "https://assets.glxplay.io/web/responsive/plain/section-6_1.jpg",
        "https://assets.glxplay.io/web/responsive/w500/home-page-iphone-12-pro-max.png"
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
