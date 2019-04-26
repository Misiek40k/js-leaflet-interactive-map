const map = L.map('mapid').setView([51.505, -0.09], 13);
let newMarker;
const coArr = [];

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
    .addTo(map)
    .bindPopup(e.latlng.toString())
    .openPopup();

  addNewMarkerArr();

  newMarker.on("dragend", function (e) {
    const changedPos = e.target.getLatLng();
    this.bindPopup(changedPos.toString()).openPopup();
    updateMarkerArr(newMarker._leaflet_id, changedPos.toString());
  });
}

function addNewMarkerArr() {
  coArr.push({
    id: `${newMarker._leaflet_id}`,
    coords: `${newMarker.getLatLng()}`
  });
}

function updateMarkerArr(id, coords) {
  for (var i = 0; i < coArr.length; i++) {
    if (coArr[i].id == id) {
      coArr[i].coords = coords;
      break;
    }
  }
}

function populateTable() {

}