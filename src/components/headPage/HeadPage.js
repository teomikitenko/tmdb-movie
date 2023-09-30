import { Outlet, Link } from "react-router-dom";
import "./HeadPage.css";
import Footer from "../footer/footer";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";

export default function HeadPage() {
  const movies = [
    { id: uuidv4(), path: "/popular-films", title: "Популярні" },
    { id: uuidv4(), path: "/now-playing", title: "Зараз у кіно" },
    { id: uuidv4(), path: "/upcoming-films", title: "Очікувані" },
    { id: uuidv4(), path: "/top-rated-movies", title: "Рейтингові" },
  ];
  const serials = [
    { id: uuidv4(), path: "/popular-serials", title: "Популярні" },
    { id: uuidv4(), path: "/on-air-today", title: "Cьогодні в ефірі" },
    { id: uuidv4(), path: "/on-tv", title: "Зараз на ТБ" },
    { id: uuidv4(), path: "/top-rated-serials", title: "Рейтингові" },
  ];
  return (
    <div className="wrapper_all">
      <header className="wrapper_head">
        <div className="wrapper_conteiner">
          <div className="conteiner_for_head ">
            <div className="menu_head">
              <div className="logo">
                <Link to="/">
                  <div className="container_header_logo">
                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="" />
                  </div>
                </Link>
              </div>
              <div className="nav_bar_menu">
                <ul>
                  <li className="li_movies">
                    <span className="movies_category category_menu">
                      <Typography variant="h4">Фільми</Typography>
                    </span>
                    <div className="drop_movies">
                      <ul className="drop_menu_movies">
                        {movies.map((movie) => (
                          <li key={movie.id} className="drop_items_movies">
                            <Link to={movie.path}>
                              <span className="drop_text">{movie.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="li_serials">
                    <span className="serials_category category_menu">
                     
                      <Typography variant="h4">Серіали</Typography>
                    </span>
                    <div className="drop_serials">
                      <ul className="drop_menu_serials">
                        {serials.map((serial) => (
                          <li key={serial.id} className="drop_items_serials">
                            <Link to={serial.path}>
                              <span className="drop_text">{serial.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="li_persons">
                    <span className="persons_category category_menu">
                    <Typography variant="h4">Персони</Typography>
                    </span>
                    <div className="drop_persons">
                      <ul className="drop_menu_persons">
                        <li className="drop_items_persons">
                          <span className="drop_text">
                            <Link to={"persons"}>Популярні</Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
