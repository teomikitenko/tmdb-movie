import { useState } from "react";
import Video from "./videoFiles/video";
import Backdrops from "./backdrops/backdrops";
import Posters from "./posters/posters";
const Media = ({ data }) => {
    const [type, setType] = useState("videos");
    const currentType = (name) => {
      switch (name) {
        case "posters":
          return <Posters data={data} />;
        case "backdrops":
          return <Backdrops data={data} />;
        case "videos":
          return <Video data={data} />;
        default:
          return null;
      }
    };
    return (
      <section class="media">
        <div class="media_menu">
          <h3>Media</h3>
          <ul>
            <li style={{ cursor: "pointer" }} onClick={() => setType("videos")}>
              Videos
              <span>{data.videos.results.length}</span>
              {type === "videos" && <span class="active_class"></span>}
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setType("backdrops")}
            >
              Backdrops
              <span>{data.images.backdrops.length}</span>
              {type === "backdrops" && <span class="active_class"></span>}
            </li>
            <li style={{ cursor: "pointer" }} onClick={() => setType("posters")}>
              Posters
              <span>{data.images.posters.length}</span>
              {type === "posters" && <span class="active_class"></span>}
            </li>
          </ul>
        </div>
        <div class="media_content">
          <div class="media_scroller">{currentType(type)}</div>
        </div>
      </section>
    );
  };
  export default Media