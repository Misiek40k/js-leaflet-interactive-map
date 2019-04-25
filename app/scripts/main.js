/* eslint-disable no-undef */
let map = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// interactive map size
document.getElementById('btnMap').addEventListener('click', () => {
  setTimeout(() => {
    map.invalidateSize();
  }, 600);
});
