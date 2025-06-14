import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Slide from "./Slide";
import SilderControler from "./SilderControler";
import SlideCover from "./SildeCover";
import SlidePlaceHolder from "./SlidePlaceHolder";
import SlideCoverPlaceHolder from "./SlideCoverPlaceHolder";
import SliderLoader from "./SliderLoader";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/events/approved"
        );
        if (Array.isArray(response.data)) {
          setSlides(response.data);
        } else if (Array.isArray(response.data.events)) {
          setSlides(response.data.events);
        } else {
          setSlides([]);
        }
      } catch (error) {
        setSlides([]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
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

  if (loading) {
    return (
      <div className="slideshow">
        <div className="slideshow__slide slideshow__slide--active">
          <SliderLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="slideshow">
      {slides.length === 0 ? (
        <>
          <div className={"slideshow__slide" + " slideshow__slide--active"}>
            <SlidePlaceHolder />
            <SlideCoverPlaceHolder />
          </div>
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
