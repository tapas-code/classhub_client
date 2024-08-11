import React from "react";
import HeroImg from '../assets/download.jpeg'

const Home = () => {
  return (
    <div className="hero bg-base-200 flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={HeroImg}
          className="max-w-sm rounded-lg shadow-2xl "
        />
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
