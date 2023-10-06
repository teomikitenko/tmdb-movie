import { useEffect, useState } from "react";
export const useSerialMedia = (data) => {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState({ url: "", name: "" });

  const base_youtube = "https://www.youtube.com/watch?v=";
  const style = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(0, 0, 0)",
    minWidth: "90px",
    minHeight: "50px",
    width: "984px",
    height: "553px",
    zIndex: "300",
  };
  useEffect(() => {
    setVideoUrl({
      url: searchVideo(),
      name: data.name,
    });
  }, []);
  useEffect(() => window.scrollTo(0, 0), []);

  const searchVideo = () => {
    const trailer = data.videos.results.filter(
      (vid) => vid.type === "Trailer"
    )[0];
    if (!trailer) {
      const openingCredits = data.videos.results.filter(
        (vid) => vid.type === "Opening Credits"
      )[0];
      if (!openingCredits) {
        const teaser = data.videos.results.filter(
          (vid) => vid.type === "Teaser"
        )[0];
        return teaser;
      }
      return openingCredits;
    } else {
      return trailer;
    }
  };
  const base_img = "https://image.tmdb.org/t/p/w500";
  const backdrop_img = "https://image.tmdb.org/t/p/original";
  const buildDate = (date) => {
    return date.split("-").reverse().join("/");
  };
  const percent =
    data.vote_average > 0 ? Math.round(data.vote_average * 10) : null;
  const circle = (percent / 100) * 359;
  const color = () => {
    if (percent >= 73) {
      return {
        l: "green",
        b: "#1d3222",
      };
    } else if (percent < 73 && percent > 50) {
      return { l: "#fbfdc2", b: "#796f05" };
    } else if (percent > 50) return { l: "#C60000", b: "#D55448" };
    else {
      return { l: "#fbfdc2", b: "#796f05" };
    }
  };
  const showRatings = () => {
    return data.content_ratings.results[0].rating;
  };
  return {
    showRatings,
    color,
    percent,
    circle,
    buildDate,
    base_img,
    backdrop_img,
    base_youtube,
    searchVideo,
    style,
    videoUrl,
    setVideoUrl,
    open,
    setOpen,
  };
};
export const useMovieMedia = (data) => {
  const base_youtube = "https://www.youtube.com/watch?v=";
  const backdrop_img = "https://image.tmdb.org/t/p/original";
  const base_img = "https://image.tmdb.org/t/p/w500";
  const [crew, setCrew] = useState(null);
  const [videoUrl, setVideoUrl] = useState({ url: null });
  const [open, setOpen] = useState(false);
  const certification = (dates) => {
    const usDate = dates.results.filter((c) => c.iso_3166_1 === "US");
    if (usDate[0].release_dates[0].certification)
      return usDate[0].release_dates[0].certification;
    else return "NA";
  };
  const style = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(0, 0, 0)",
    minWidth: "90px",
    minHeight: "50px",
    width: "984px",
    height: "553px",
    zIndex: "300",
  };

  useEffect(() => {
    takeCrew();
    setVideoUrl({
      url: data.videos.results.filter((vid) => vid.type === "Trailer")[1],
    });
  }, []);
  useEffect(() => window.scrollTo(0, 0), []);

  const percent =
    data.vote_average > 0 ? Math.round(data.vote_average * 10) : null;

  const circle = (percent / 100) * 359;
  const color = () => {
    if (percent >= 73) {
      return {
        l: "green",
        b: "#1d3222",
      };
    } else if (percent < 73 && percent > 50) {
      return { l: "#fbfdc2", b: "#796f05" };
    } else if (percent > 50) return { l: "#C60000", b: "#D55448" };
    else {
      return { l: "#fbfdc2", b: "#796f05" };
    }
  };

  const takeCrew = () => {
    const director = data.credits.crew.filter(
      (job) => job.department === "Directing"
    );
    const writings = data.credits.crew.filter(
      (job) => job.department === "Writing"
    );

    return setCrew({
      dir: director,
      writ: writings,
    });
  };

  const constructCrew = (dir, cr) => {
    return dir.filter((data) => data.job === cr);
  };
  const buildDate = (date) => {
    if (date) {
      return date.split("-").reverse().join("/");
    }
  };
  return {
    buildDate,
    constructCrew,
    takeCrew,
    circle,
    color,
    percent,
    base_img,
    base_youtube,
    backdrop_img,
    crew,
    setCrew,
    open,
    setOpen,
    videoUrl,
    setVideoUrl,
    certification,
    style,
  };
};
