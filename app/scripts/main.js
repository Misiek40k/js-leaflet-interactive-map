let map = L.map('mapid').setView([51.505, -0.09], 13);
let newMarker;
var coArr = [];

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

  addTable();

  newMarker.on("dragend", function (e) {
    let changedPos = e.target.getLatLng();
    this.bindPopup(changedPos.toString()).openPopup();
    updateTable(newMarker._leaflet_id, changedPos.toString());
  });
}

function addTable() {
  coArr.push({
    id: `${newMarker._leaflet_id}`,
    coords: `${newMarker.getLatLng()}`
  });
}

function updateTable(id, coords) {
  for (var j = 0; j < coArr.length; j++) {
    if (coArr[j].id == id) {
      coArr[j].coords = coords
    }
  }
}
