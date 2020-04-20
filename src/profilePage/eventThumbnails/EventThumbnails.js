/* eslint-disable */

import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './EventThumbnails.css';
import DefaultEventImage from '../defaultEventImage.jpg';

const EventThumbnails = (props) => {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const handleChange = param => e => {
    props.viewEventDetail(param);
  };
  
  return (
      <div class="events-image-container">
        <Carousel responsive={responsive} infinite={true} partialVisible={false}  slidesToSlide={2}>
          {(props.eventList).map((event, index) => {
              let image = (event.photoGallery && event.photoGallery[0])  ? event.photoGallery[0] : DefaultEventImage;
              return (
                
                  <div className="card text-center image-container" key={index} onClick={handleChange(event.id)}>
                      <img className="event-img" src={image} alt="event image"/>
                      <div className="card-body">
                          <p className="card-title">{event.title}</p>
                          <a href={event.url} target="_blank" rel="noopener noreferrer">{event.location.city}, {event.location.state}</a>
                      </div>
                  </div>
              )
          })}
        </Carousel>

    </div>
  );
}

export default EventThumbnails;


