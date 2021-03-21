import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { emit } from "../pages/map/mediator";

const bydgoszczPosition = {
  lat: 53.1154252,
  lng: 18.0219906,
};

const defaultZoom = 11;

export default function GoogleMap() {
  useEffect(() => {
    //emit('mapLoaded', startPosition)
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={bydgoszczPosition}
        defaultZoom={defaultZoom}
        onChange={event => emit("mapDragged", event.center)}
      ></GoogleMapReact>
    </div>
  );
}
