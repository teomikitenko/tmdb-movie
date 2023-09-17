import { Outlet, Link } from "react-router-dom";
import "./HeadPage.css";
import Footer from "../footer/footer";

export default function HeadPage() {
  return (
    <div className="wrapper_all">
      <header className="wrapper_head">
        <div className="wrapper_conteiner">
          <div className="conteiner_for_head ">
            <div className="menu_head">
              <div className="logo">
                <Link to="/">
                  <span>My logo</span>
                </Link>
              </div>
              <div className="nav_bar_menu">
                <ul>
                  <li className="li_movies">
                    <span className="movies_category category_menu">
                      Фільми
                    </span>
                    <div className="drop_movies">
                      <ul className="drop_menu_movies">
                        <li className="drop_items_movies">
                          <Link to={"/popular-films"}>
                            <span className="drop_text">Популярні</span>
                          </Link>
                        </li>
                        <li className="drop_items_movies">
                          <Link to={"/now-playing"}>
                            <span className="drop_text">Зараз у кіно</span>
                          </Link>
                        </li>
                        <li className="drop_items_movies">
                          <Link to={"/upcoming-films"}>
                            <span className="drop_text">Очікувані</span>{" "}
                          </Link>
                        </li>
                        <li className="drop_items_movies">
                          <Link to={"/top-rated-movies"}>
                            <span className="drop_text">Рейтингові</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="li_serials">
                    <span className="serials_category category_menu">
                      Серіали
                    </span>
                    <div className="drop_serials">
                      <ul className="drop_menu_serials">
                        <li className="drop_items_serials">
                          <Link to={"/popular-serials"}>
                            <span className="drop_text">Популярні</span>
                          </Link>
                        </li>
                        <li className="drop_items_serials">
                          <Link to={'/on-air-today'}>
                          <span className="drop_text">Cьогодні в ефірі</span>
                          </Link>
                          
                        </li>
                        <li className="drop_items_serials">
                          <Link to={'/on-tv'}>
                          <span className="drop_text">Зараз на ТБ</span>
                          </Link>
                          
                        </li>
                        <li className="drop_items_serials">
                          <Link to={"/top-rated-serials"}>
                            <span className="drop_text">Рейтингові</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="li_persons">
                    <span className="persons_category category_menu">
                      Персони
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
