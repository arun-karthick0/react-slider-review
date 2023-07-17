import { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";

function App() {
  const [people, setPeople] = useState([]);
  const [index, setIndex] = useState(0);

  // fetching data component
  useEffect(() => {
    setPeople(data);
  }, []);

  // slides -interval
  useEffect(() => {
    let sliders = setInterval(() => {
      setIndex((prev) => (prev + 1) % people.length);
    }, 3000);
    return () => {
      clearInterval(sliders);
    };
  }, [people]);

  return (
    <div className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((people, peopleIndex) => {
          const { id, image, name, title, quote } = people;

          let place = "nextSlide";
          if (peopleIndex === index) {
            place = "activeSlide";
          }
          if (
            peopleIndex === index - 1 ||
            (index === 0 && peopleIndex === people.length - 1)
          ) {
            place = "lastSlide";
          }

          return (
            <section className={place} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </section>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default App;
