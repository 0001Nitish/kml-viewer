import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDisplay = ({ kmlData }) => {
  const lines = kmlData.filter(
    (feature) =>
      feature.type === "LineString" || feature.type === "MultiLineString"
  );

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {lines.map((line, index) => (
        <Polyline key={index} positions={line.coordinates} color="blue" />
      ))}
    </MapContainer>
  );
};

export default MapDisplay;
