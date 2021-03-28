import api from "../../services/api/wikipedia";
import articlesDatabase from "../../services/articlesDatabase";
import { useMapStore } from "./store";
import debounce from "lodash/debounce";

const listeners = {};
let map;

const defaultArticleColor = "orange";
const readArticleColor = "blue";

const callGetArticlesAfterLastInvocationMs = 1000;

export function emit(event, ...args) {
  const listener = listeners[event];

  if (listener) {
    listener(...args);
  }
}

function attachListener(eventName, listener) {
  listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles) {
  return articles.map(({ lat, lon, pageid, title }) => ({
    pageid,
    lat,
    lng: lon,
    title,
  }));
}

function mapReadArticles(articles) {
  return articles.map(({ title, ...rest }) => ({
    ...rest,
    title,
    color: articlesDatabase.isArticleRead(title)
      ? readArticleColor
      : defaultArticleColor,
  }));
}

function useMapMediator() {
  const [
    ,
    {
      addMarkers,
      setGoogleApiLoaded,
      setModalVisible,
      setCurrentArticle,
      setMarkerColor,
    },
  ] = useMapStore();

  const debouncedGetArticles = debounce(
    getArticlesForMapCenter,
    callGetArticlesAfterLastInvocationMs
  );

  async function getArticlesForMapCenter() {
    const response = await api.getArticles({
      coord: map.center.toJSON(),
      limit: 100,
    });
    let articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    articles = mapReadArticles(articles);
    addMarkers(articles);
  }

  function mapLoaded(mapInstance) {
    map = mapInstance;
    setGoogleApiLoaded(true);

    map.addListener("idle", debouncedGetArticles);
  }

  function searchBoxPlacesSelected(position) {
    if (map) {
      map.setCenter(position);
    }
  }

  async function markerClicked(title) {
    const { query } = await api.getArticle({ title });
    const articles = Object.values(query.pages);
    const article = articles[0];
    setCurrentArticle({ url: article.fullurl, title });
    setModalVisible(true);
    setMarkerColor({ title, color: readArticleColor });

    articlesDatabase.setArticleAsRead(title);
  }

  attachListener("mapLoaded", mapLoaded);
  attachListener("searchBoxPlacesSelected", searchBoxPlacesSelected);
  attachListener("markerClicked", markerClicked);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
