import api from "../../services/api/wikipedia";

const listeners = {};

export function emit(event, ...args) {
  listeners[event](...args);
}

function attachListener(eventName, listener) {
  listeners[eventName] = listener;
}

function useMapMediator() {
  async function mapDragged(center) {
    // fetch articles
    console.log("map dragged", center);
    const articles = await api.getArticles({ coord: center });
    console.log(articles);
  }

  attachListener("mapDragged", mapDragged);
}

export default function MapMediator() {
  useMapMediator();

  return null;
}
