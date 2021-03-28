import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker";
import styles from "./styles";
import { emit } from "../../pages/map/mediator";
import { useMapStore } from "../../pages/map/store";

const bydgoszczPosition = {
  lat: 53.1154252,
  lng: 18.0219906,
};

const defaultZoom = 14;

export default function GoogleMap() {
  const [{ markers }] = useMapStore();

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY,
          libraries: ["places"],
        }}
        defaultCenter={bydgoszczPosition}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => emit("mapLoaded", map)}
        options={{
          styles: styles.gray,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.pageid}
            lat={marker.lat}
            lng={marker.lng}
            title={marker.title}
            color={marker.color}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
