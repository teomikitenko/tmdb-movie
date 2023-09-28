import "./homePage.css";
import { fetchFilms } from "../filmPage/filmSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import MediaSection from "./mediaSection/MediaSection";
import SearchPanel from "../filmPage/serchpanel/SearchPanel";
import TraiLerSection from "./trailerSection/Trailersection";
import PopularBlock from "./popularBlock/popularBlock";
const HomePage = () => {
  const [period, setPeriod] = useState("day");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilms(period));
  }, [period]);

  const classNames = require("classnames");
  const divClass = classNames({
    background_swiper: true,
    left: period === "day",
    right: period === "week",
  });
  return (
    <>
      <SearchPanel />
      <section className="trending_movies">
        <div className="wrapper_conteiner">
          <div className="wrap_section">
            <h2>У тренді</h2>
            <div className="slide_button">
              <a onClick={() => setPeriod("day")}>
                <p
                  className={
                    period === "day" ? "active_text" : "no_active_text"
                  }
                >
                  Сьогодні
                </p>
              </a>
              <a onClick={() => setPeriod("week")}>
                <p
                  className={
                    period === "week" ? "active_text" : "no_active_text"
                  }
                >
                  Цього тижня
                </p>
              </a>
              <div className={divClass}></div>
            </div>
          </div>
          <MediaSection period={period} />
        </div>
      </section>

      <TraiLerSection />
      <PopularBlock/>
    </>
  );
};

export default HomePage;
