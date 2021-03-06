import { createStore, createHook } from "react-sweet-state";
import { defaults } from "react-sweet-state";
import { produce } from "immer";

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const Store = createStore({
  initialState: {
    markers: [],
    googleApiLoaded: false,
    modalVisible: false,
    currentArticle: {
      url: "",
      title: "",
    },
  },
  actions: {
    addMarkers: markers => ({ setState, getState }) => {
      const state = getState();
      const existingMarkers = state.markers.map(marker => marker.pageid);
      const newMarkers = markers.filter(
        marker => !existingMarkers.includes(marker.pageid)
      );

      setState(draft => {
        draft.markers.push(...newMarkers);
      });
    },
    setGoogleApiLoaded: value => ({ setState, getState }) => {
      setState(draft => {
        draft.googleApiLoaded = value;
      });
    },
    setModalVisible: value => ({ setState, getState }) => {
      setState(draft => {
        draft.modalVisible = value;
      });
    },
    setCurrentArticle: ({ url, title }) => ({ setState, getState }) => {
      setState(draft => {
        draft.currentArticle = { url, title };
      });
    },
    setMarkerColor: ({ title, color }) => ({ setState, getState }) => {
      const { markers } = getState();
      const markerIndex = markers.findIndex(marker => marker.title === title);

      setState(draft => {
        draft.markers[markerIndex].color = color;
      });
    },
  },
});

export const useMapStore = createHook(Store);
