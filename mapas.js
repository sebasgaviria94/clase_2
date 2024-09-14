//inicio el mapa en la coordenada xx, y con zomm 5
var map = L.map('map').setView([6.257257, -75.575508], 5);



//inicio mapa base de un proveedor (OSM)

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);


//Información cartográfica
var marker = L.marker([6.257257, -75.575508]).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var circle = L.circle([6.257257, -75.575508], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
});
circle.bindPopup("I am a circle.");

// var polygon = L.polygon([
//     [6.274280, -75.583493],
//     [6.263364, -75.553984],
//     [6.249038, -75.563493]
//     [6.261822, -75.596359],
// ],).addTo(map);

// polygon.bindPopup("I am a polygon.");

//Agregar basemap

var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "Esri": Esri_WorldImagery
};

var overlayMaps = {
    "Marker": marker,
    "Circle": circle,
    // "Polygon": polygon
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// // Cargar el archivo GeoJSON
// fetch('barrios_y_veredasgeoj.geojson')
//     .then(response => response.json())
//     .then(data => {
//         // Añadir el GeoJSON al mapa con estilos y eventos
//         L.geoJSON(data, {
//             //añadoel estilo de una variable
//             style: stilo_barrios_med
//         }).addTo(map);
//     })
//     .catch(err => console.error('Error cargando el archivo GeoJSON: ', err));
// //variable que contiene el estilo
// var stilo_barrios_med = {

//     radius: 8,
//     fillColor: "#20c0bd",
//     color: "#17c0bd",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.7

// };

// Cargar el archivo GeoJSON
fetch('/barrios_y_veredasgeoj.geojson')
    .then(response => response.json())
    .then(data => {
        // Añadir el GeoJSON al mapa con estilos y eventos
        L.geoJSON(data, {
            style: estiloBarrio,  // Aplica la función de estilo
            onEachFeature: function (feature, layer) {
              // Añadir popups para los barrios
              if (feature.properties && feature.properties.nombre) {
                layer.bindPopup("Barrio: " + feature.properties.nombre);
              }
            }
        }).addTo(map);
    })
    .catch(err => console.error('Error cargando el archivo GeoJSON: ', err));

// Función de estilo para personalizar el color de los barrios
function estiloBarrio(feature) {
    var baseStyle = {
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
    };

    // Ajustar el color en función del nombre del barrio
    switch (feature.properties.nombre) {
        case 'Laureles':   // Cambia 'Laureles' por el nombre real del barrio en el GeoJSON
            baseStyle.color = '#ff0000';  // Color rojo para el borde
            baseStyle.fillColor = '#ffb3b3';  // Color de relleno rojo claro
            break;
        case 'La Floresta':
            baseStyle.color = '#00ff00';  // Color verde para el borde
            baseStyle.fillColor = '#b3ffb3';  // Color de relleno verde claro
            break;
        case 'Las Palmas':
            baseStyle.color = '#0000ff';  // Color azul para el borde
            baseStyle.fillColor = '#b3b3ff';  // Color de relleno azul claro
            break;
        default:
            baseStyle.color = '#cccccc';  // Color gris para el borde
            baseStyle.fillColor = '#e6e6e6';  // Color de relleno gris claro
    }
    return baseStyle;
};

var camaras;
// Cargar el archivo GeoJSON
fetch('camaras_movilidad.geojson')
    .then(response => response.json())
    .then(data => {
        // Añadir el GeoJSON al mapa con estilos y eventos
        frontera=L.geoJSON(data, {
            style: estiloBarrio,  // Aplica la función de estilo
            onEachFeature: function (feature, layer) {
                // Añadir popups para los barrios
                if (feature.properties && feature.properties.link_foto) {
                    layer.bindPopup('<img src="' + feature.properties.link_foto + '" alt="" style="width: 300px;"><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt reiciendis eius quia vel unde harum cum omnis cumque eaque praesentium consequuntur aperiam, quo facere, ut vitae ex repellendus aut ad?</p>');
                }
            }
        }).addTo(map);
                // Agregar la capa GeoJSON al control de capas
                layerControl.addOverlay(frontera, 'CCTV Medellín');
    })
    .catch(err => console.error('Error cargando el archivo GeoJSON: ', err));