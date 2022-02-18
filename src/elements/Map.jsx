import React from 'react'
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function Map(props) {
  return (
    <div>
        <MapContainer
            style={{ height: "400px" }}
            center={[
              props.res.address.coord[1],
              props.res.address.coord[0],
            ]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                props.res.address.coord[1],
                props.res.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
    </div>
  )
}

export default Map