import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MaterialMarker = ({ position, name, address }) => {
  const map = useMap();

  useEffect(() => {
    const markerDiv = L.divIcon({
      className: '',
      html: `
        <div class="group relative flex size-[50px] items-center justify-center rounded-full border-2 border-brown bg-card shadow-md">
          <span class="sr-only">${name}</span>
          <span class="size-4 rounded-full bg-primary"></span>
          <div class="pointer-events-none absolute bottom-14 left-1/2 hidden w-56 -translate-x-1/2 rounded-lg bg-popover p-3 text-center text-sm text-popover-foreground shadow-lg group-hover:block">
            <strong>${name}</strong><br />
            <span>${address}</span>
          </div>
        </div>
      `,
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });

    const marker = L.marker(position, { icon: markerDiv }).addTo(map);

    return () => {
      map.removeLayer(marker);
    };
  }, [address, map, name, position]);

  return null;
};

const officeLocation = {
  coords: [31.461641805135102, 74.38984993375294],
  name: 'Robotronics Pakistan',
  address: 'Sector FF DHA Phase 4, Lahore, Punjab 54000, Pakistan',
};

const ContactMap = () => {
  useEffect(() => {
    // Fix default icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div
      className="flex bg-background"
      data-aos="fade-up"


    >
      <div className="lg:p-32 py-32 relative h-screen w-screen">
        <MapContainer
          center={officeLocation.coords}
          zoom={15}
          className="bg-map h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <MaterialMarker
            position={officeLocation.coords}
            name={officeLocation.name}
            address={officeLocation.address}
          />
        </MapContainer>
        <div className="absolute bottom-8 right-8 rounded-lg bg-overlay p-4 text-white shadow-lg">
          <h1 className="text-xl font-bold mb-2">Our Footprint</h1>
          <h2 className="text-3xl font-bold text-gold">In Lahore</h2>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
