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
  populateTable();

  newMarker.on("dragend", function (e) {
    const changedPos = e.target.getLatLng();
    this.bindPopup(changedPos.toString()).openPopup();
    updateMarkerArr(newMarker._leaflet_id, changedPos.toString());
    updateTable(newMarker._leaflet_id, changedPos.toString());
  });
}

function addNewMarkerArr() {
  coArr.push({
    id: `${newMarker._leaflet_id}`,
    coords: `${newMarker.getLatLng()}`
  });
}

function updateMarkerArr(id, coords) {
  for (let i = 0; i < coArr.length; i++) {
    if (coArr[i].id == id) {
      coArr[i].coords = coords;
      break;
    }
  }
}

// add marker coords to table
function populateTable() {

  let myTable = `
    <table>
      <tr>
        <th>#</th>
        <th>Coordinates</th>
      </tr>`;

  for (let i = 0; i < coArr.length; i++) {
    myTable += `
      <tr>
        <td>${i+1}</td>
        <td id="coords${coArr[i].id}">${coArr[i].coords}</td>
      </tr>`;
  }

  myTable += `</table>`;
  console.log(myTable);
  document.getElementById('table').innerHTML = myTable;
}

function updateTable(id, coords) {
  console.log(coords);
  console.log(id);
  document.getElementById(`coords${id}`).innerHTML = coords;
}
