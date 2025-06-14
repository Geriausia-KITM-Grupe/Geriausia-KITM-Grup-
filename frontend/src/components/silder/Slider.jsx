import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Slide from "./Slide";
import SilderControler from "./SilderControler";
import SlideCover from "./SildeCover";
import SlidePlaceHolder from "./SlidePlaceHolder";
import SlideCoverPlaceHolder from "./SlideCoverPlaceHolder";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events/approved")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSlides(response.data);
        } else if (Array.isArray(response.data.events)) {
          setSlides(response.data.events);
        } else {
          setSlides([]);
        }
      })
      .catch((error) => {
        setSlides([]);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(intervalRef.current);
  }, [slides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="slideshow">
      {slides.length === 0 ? (
        // Render placeholder Slide when no slides
        <>
          <SlidePlaceHolder />
          <SlideCoverPlaceHolder />
          <SilderControler />
        </>
      ) : (
        slides.map((slide, idx) => (
          <div
            className={
              "slideshow__slide" +
              (idx === currentSlide ? " slideshow__slide--active" : "")
            }
            key={idx}
          >
            <Slide event={slide} cats={slide.category} />
            <SlideCover alt={slide.title} image={slide.picture} />
            <SilderControler onPrev={handlePrev} onNext={handleNext} />
          </div>
        ))
      )}
    </div>
  );
};

export default Slider;
