import React, { useEffect, useState, useRef } from 'react';
import '../styles/Homess.css';
import { FaBell, FaArrowLeft, FaHome, FaPlus, FaExclamationTriangle, FaRegEye, FaSearch, FaUserCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const accidentIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2783/2783449.png',
  iconSize: [32, 32],
});

const crimeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2783/2783464.png',
  iconSize: [32, 32],
});

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState('');
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });

          const map = L.map('map').setView([latitude, longitude], 13);
          mapRef.current = map;

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
          }).addTo(map);

          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup('Your current location')
            .openPopup();

          addIncidentsToMap(map, latitude, longitude);

          return () => {
            map.remove();
          };
        },
        (error) => {
          alert("Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const addIncidentsToMap = async (map, userLat, userLng) => {
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    try {
      // Fetch weather incidents from Open-Meteo API
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${userLat}&longitude=${userLng}&current_weather=true&alerts=true`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather incidents');
      }
      const weatherData = await response.json();
      const weatherAlerts = weatherData.alerts || [];

      // Mocked traffic incidents (replace with a real API if available)
      const trafficIncidents = [
        {
          lat: userLat + 0.001,
          lng: userLng + 0.001,
          description: "Sample traffic congestion on Main St.",
          startTime: new Date().toISOString(),
        },
      ];

      // Mocked crime incidents (replace with a real API if available)
      const crimeIncidents = [
        {
          lat: userLat - 0.001,
          lon: userLng - 0.001,
          description: "Reported burglary near Elm Street",
          date: new Date().toISOString(),
        },
      ];

      // Combine all incidents
      const allIncidents = [
        ...trafficIncidents.map((incident) => ({
          type: "Traffic",
          lat: incident.lat,
          lng: incident.lng,
          description: incident.description || "Traffic incident",
          time: incident.startTime || "Unknown time",
        })),
        ...weatherAlerts.map((alert) => ({
          type: "Weather",
          lat: userLat,
          lng: userLng,
          description: alert.description || "Weather alert",
          time: alert.effective || "Unknown time",
        })),
        ...crimeIncidents.map((incident) => ({
          type: "Crime",
          lat: incident.lat,
          lng: incident.lon,
          description: incident.description || "Crime incident",
          time: incident.date || "Unknown time",
        })),
        {
          type: "Accident",
          lat: -26.2041,
          lng: 28.0473,
          description: "Accident on Main Street",
          time: "2025-05-10T08:00:00Z",
        },
      ];

      // Add incidents to the map
      allIncidents.forEach((incident) => {
        const icon =
          incident.type === "Traffic"
            ? accidentIcon
            : incident.type === "Crime"
              ? crimeIcon
              : L.icon({
                iconUrl:
                  "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
                iconSize: [32, 32],
              });

        const marker = L.marker([incident.lat, incident.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <b>${incident.type}</b><br/>
            ${incident.description}<br/>
            <small>${incident.time}</small>
          `);
        markersRef.current.push(marker);
      });
    } catch (error) {
      console.error("Error fetching incidents:", error);
      alert("Could not load incidents. Please try again later.");
    }
  };

  const calculateRoute = () => {
    if (!destinations || !userLocation || !mapRef.current) {
      alert('Please enter destinations (e.g., Shoprite, Hospital)');
      return;
    }

    const places = destinations.split(',').map(p => p.trim());

    Promise.all(
      places.map(place =>
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`)
          .then(res => res.json())
          .then(data => {
            if (data.length === 0) throw new Error(`${place} not found`);
            return L.latLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
          })
      )
    )
      .then(waypoints => {
        if (routingControlRef.current) {
          mapRef.current.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(userLocation.lat, userLocation.lng),
            ...waypoints
          ],
          routeWhileDragging: true,
          addWaypoints: true,
          draggableWaypoints: true,
          showAlternatives: false,
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          }),
          createMarker: function (i, wp, nWps) {
            return L.marker(wp.latLng, {
              draggable: true
            });
          }
        }).addTo(mapRef.current);

        mapRef.current.fitBounds([
          [userLocation.lat, userLocation.lng],
          ...waypoints.map(wp => [wp.lat, wp.lng])
        ]);
      })
      .catch(err => {
        console.error(err);
        alert(err.message || 'Error calculating route');
      });
  };

  const startNavigation = () => {
    if (!routingControlRef.current) {
      alert('Please calculate a route first');
      return;
    }

    const routes = routingControlRef.current.getPlan().getWaypoints();
    if (!routes || routes.length === 0) {
      alert('No route available');
      return;
    }

    const instructions = routingControlRef.current._routes[0].instructions;
    instructions.forEach((instruction, index) => {
      setTimeout(() => {
        speak(instruction.text);
      }, index * 5000); // Adjust timing as needed
    });

    alert("Navigation started. Follow the route shown on the map.");
  };

  return (
    <div className="home-page">
      <header className="header">
        <FaArrowLeft className="icon-left" onClick={() => navigate(-1)} />
        <h1>Road Safety Map</h1>
        <FaBell className="icon-right" onClick={() => navigate('/alerts')} />
      </header>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter destinations (e.g., Mall, Hospital)"
          value={destinations}
          onChange={(e) => setDestinations(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && calculateRoute()}
        />
        <button onClick={calculateRoute}><FaSearch /></button>
      </div>

      <div className="map-area" id="map" style={{ height: 'calc(100vh - 220px)', width: '100%' }}></div>

      {routeInfo && (
        <div className="route-info">
          <p>{routeInfo}</p>
        </div>
      )}

      <div className="action-buttons">
        <button className="nav-button" onClick={startNavigation}>Start Navigation</button>
        <button className="floating-button" onClick={() => navigate('/report')}><FaPlus /></button>
      </div>


      <footer className="footer">
        <div className="nav-item active"><FaHome /><span>Home</span></div>
        <div className="nav-item" onClick={() => navigate('/report')}><FaExclamationTriangle /><span>Report</span></div>
        <div className="nav-item" onClick={() => navigate('/alerts')}><FaRegEye /><span>Alerts</span></div>
        <div className="nav-item" onClick={() => navigate('/viewprofile')}><FaUserCog /><span>Account Settings</span></div>
      </footer>
    </div>
  );
};

export default HomeScreen;
