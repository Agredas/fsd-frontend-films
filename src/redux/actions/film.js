import axios from 'axios';
import store from '../store';
import { UPDATE_FILMS, SET_FILMS, SET_FILMS_BY_TITLE, UPDATE_FILMS_BY_TITLE, SET_FILMS_BY_GENRE, UPDATE_FILMS_BY_GENRE, SET_FILMS_BY_ACTOR, UPDATE_FILMS_BY_ACTOR } from '../types/filmTypes';

export const getAllFilms = async() => {
    const offset = !store.getState().filmReducer.films.stored ? 0 : store.getState().filmReducer.films.stored;
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/films/film/fulldata/?offset=${offset}`)
    res.data.stored = res.data.rows.length;
    !offset ? store.dispatch({ type: SET_FILMS, payload: res.data }) : store.dispatch({ type: UPDATE_FILMS, payload: res.data });
}
export const getFilmsByName = async(name) => {
    const offset = !store.getState().filmReducer.films.stored ? 0 : store.getState().filmReducer.films.stored;
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/films/title/${name}/`)
    res.data.stored = res.data.rows.length;
    const films = {
        count: res.data?.count,
        stored: res.data?.rows?.length,
        rows: res.data?.rows,
      }; console.log(films)
    !offset ? store.dispatch({ type: SET_FILMS_BY_TITLE, payload: films }) : store.dispatch({ type: UPDATE_FILMS_BY_TITLE, payload: films });
}
 
export const getFilmsByGenre = async(genre) => {
    const offset = !store.getState().filmReducer.films.stored ? 0 : store.getState().filmReducer.films.stored;
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/films/genre/name/${genre}/`)
    res.data.stored = res.data.rows.length;
    const films = {
        count: res.data?.count,
        stored: res.data?.rows?.length,
        rows: res.data?.rows,
      }; console.log(films)
    !offset ? store.dispatch({ type: SET_FILMS_BY_GENRE, payload: films }) : store.dispatch({ type: UPDATE_FILMS_BY_GENRE, payload: films });
}

export const getFilmsByActor = async(actor) => {
    const offset = !store.getState().filmReducer.films.stored ? 0 : store.getState().filmReducer.films.stored;
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/films/actor/name/${actor}/`)
    res.data.stored = res.data.rows.length;
    const films = {
        count: res.data?.count,
        stored: res.data?.rows?.length,
        rows: res.data?.rows,
      }; console.log(films)
    !offset ? store.dispatch({ type: SET_FILMS_BY_ACTOR, payload: films }) : store.dispatch({ type: UPDATE_FILMS_BY_ACTOR, payload: films });
}
 