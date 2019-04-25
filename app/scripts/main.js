let map = L.map('mapid').setView([51.505, -0.09], 13);
let newMarker;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// responsive map size
document.getElementById('btnMap').addEventListener('click', () => {
  setTimeout(() => {
    map.invalidateSize();
  }, 600);
});

// markers
newMarkerGroup = new L.LayerGroup();
map.on('click', addMarker);

function addMarker(e) {
  newMarker = new L.marker(e.latlng, {
      draggable: 'true'
    })
    .addTo(map);
}
