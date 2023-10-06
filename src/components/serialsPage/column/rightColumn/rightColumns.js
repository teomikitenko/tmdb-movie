const RightColumnSerials = ({ data }) => {
    const logo_network_base = "https://image.tmdb.org/t/p/h30";
    return (
      <div class="right_grey_column">
        <div class="info_status_links">
          <div class="social_links">
            <div class="fb_block">
              <a
                href={`http://www.facebook.com/${data.external_ids.facebook_id}`}
              >
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-2c5718e4ece8eb3a3cc49ae97000e541c0aad50869b419b5aa579693bc0ad059.svg"
                  alt=""
                />
              </a>
            </div>
            <div class="twitter_block">
              <a href={`https://twitter.com/${data.external_ids.twitter_id}`}>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg"
                  alt=""
                />
              </a>
            </div>
            <div class="inst_block">
              <a
                href={`https://www.instagram.com/${data.external_ids.instagram_id}`}
              >
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg"
                  alt=""
                />
              </a>
            </div>
            <div class="homepage_block">
              <a href={data.homepage}>
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div class="status_movie_info">
            <div className="facts_serials">
              <strong>Facts</strong>
            </div>
            <div class="status">
              <strong>Status</strong>
              <p>{data.status}</p>
            </div>
            <div className="network">
              <strong>Network</strong>
              <div className="for_network_img">
                <img
                  src={logo_network_base + data.networks[0].logo_path}
                  alt=""
                />
              </div>
            </div>
  
            <div class="type_scenario">
              <strong>Type</strong>
              <p>{data.type}</p>
            </div>
            <div class="original_language">
              <strong>Original Language</strong>
              <p>{data.original_language}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default RightColumnSerials