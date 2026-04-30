document.addEventListener('DOMContentLoaded', () => {
    // Coordenadas de la Ciudad de México
    const CDMX_CENTER = [19.4326, -99.1332]; // Leaflet usa [lat, lng]
    const ZOOM_LEVEL = 13;

    // Punto de origen fijo (CDMX)
    const COORD_ORIGEN = [19.4325, -99.1334]; // Palacio Nacional

    // Arrays para almacenar marcadores y coordenadas
    let marcadores = [];
    let coordenadas = [];
    let routingControl = null;
    let routeLayer = null; // Capa para la línea de ruta

    // ------------------------------------
    // 1. INICIALIZACIÓN DEL MAPA CON LEAFLET
    // ------------------------------------
    const map = L.map('mapa', {
        center: CDMX_CENTER,
        zoom: ZOOM_LEVEL
    });

    // CartoDB Dark Matter - Estilo oscuro, completamente gratuito y sin API key
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        minZoom: 2,
        attribution: '© <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // ------------------------------------
    // 2. MARCADOR DE ORIGEN (FIJO)
    // ------------------------------------
    const startMarker = L.marker(COORD_ORIGEN, {
        title: "Punto de Origen"
    }).addTo(map)
      .bindPopup('<b>Punto de Origen (CDMX)</b><br>Palacio Nacional<br>Lat: ' + COORD_ORIGEN[0].toFixed(4) + '<br>Lng: ' + COORD_ORIGEN[1].toFixed(4))
      .openPopup();

    // Actualizar información del origen
    document.getElementById('origen-info').innerHTML = `<strong>Origen:</strong> ${COORD_ORIGEN[0].toFixed(4)}, ${COORD_ORIGEN[1].toFixed(4)}`;

    // ------------------------------------
    // 3. FUNCIÓN PARA AGREGAR MARCADOR AL HACER CLIC
    // ------------------------------------
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const coord = [lat, lng];
        
        // Agregar coordenada al array
        coordenadas.push(coord);
        
        // Crear marcador
        const marker = L.marker(coord, {
            title: `Punto ${coordenadas.length}`
        }).addTo(map)
          .bindPopup(`<b>Punto ${coordenadas.length}</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`);
        
        marcadores.push(marker);
        
        // Actualizar panel
        actualizarPanel();
        
        // Actualizar ruta
        actualizarRuta();
    });

    // ------------------------------------
    // 4. FUNCIÓN PARA ACTUALIZAR EL PANEL
    // ------------------------------------
    function actualizarPanel() {
        document.getElementById('puntos-info').innerHTML = `<strong>Puntos agregados:</strong> ${coordenadas.length}`;
        
        // Mostrar lista de coordenadas
        const lista = document.getElementById('coordenadas-lista');
        if (coordenadas.length > 0) {
            lista.innerHTML = '<strong>Coordenadas:</strong>';
            coordenadas.forEach((coord, index) => {
                const item = document.createElement('div');
                item.className = 'coordenada-item';
                item.innerHTML = `${index + 1}. [${coord[0].toFixed(4)}, ${coord[1].toFixed(4)}]`;
                lista.appendChild(item);
            });
        } else {
            lista.innerHTML = '';
        }
        
        // Actualizar campo de texto con el arreglo
        actualizarCoordenadasArray();
    }
    
    // ------------------------------------
    // 4.1 FUNCIÓN PARA ACTUALIZAR EL ARREGLO EN EL TEXTAREA
    // ------------------------------------
    function actualizarCoordenadasArray() {
        const textarea = document.getElementById('coordenadas-array');
        let texto = 'const coordenadas = [\n';
        texto += `    [${COORD_ORIGEN[0]}, ${COORD_ORIGEN[1]}], // Origen\n`;
        coordenadas.forEach((coord, index) => {
            texto += `    [${coord[0]}, ${coord[1]}], // Punto ${index + 1}\n`;
        });
        texto += '];';
        textarea.value = texto;
    }

    // ------------------------------------
    // 5. FUNCIÓN PARA ACTUALIZAR LA RUTA
    // ------------------------------------
    async function actualizarRuta() {
        // Eliminar capa de ruta anterior si existe
        if (routeLayer) {
            map.removeLayer(routeLayer);
            routeLayer = null;
        }

        // Eliminar control anterior si existe
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }

        // Si hay puntos, crear ruta desde origen hasta todos los puntos
        if (coordenadas.length > 0) {
            // Usar modo de transporte fijo: driving (coche/automóvil)
            const modoTransporte = 'driving';
            
            // Construir array de coordenadas para la API (formato: lng,lat)
            const allCoords = [COORD_ORIGEN, ...coordenadas];
            const coordString = allCoords.map(coord => `${coord[1]},${coord[0]}`).join(';');
            
            // Construir URL de la API de OSRM
            const url = `https://router.project-osrm.org/route/v1/${modoTransporte}/${coordString}?overview=full&geometries=geojson`;
            
            try {
                // Llamar directamente a la API de OSRM
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
                    const route = data.routes[0];
                    
                    // Dibujar la ruta en el mapa
                    const routeGeometry = route.geometry;
                    routeLayer = L.geoJSON(routeGeometry, {
                        style: {
                            color: '#3b82f6',
                            weight: 6,
                            opacity: 0.8
                        }
                    }).addTo(map);
                    
                    // Actualizar información de la ruta
                    const distanceKm = (route.distance / 1000).toFixed(2);
                    const timeFormatted = formatTime(route.duration);
                    
                    document.getElementById('route-distance').innerHTML = `<strong>Distancia Total:</strong> ${distanceKm} km`;
                    document.getElementById('route-time').innerHTML = `<strong>Tiempo Total:</strong> ${timeFormatted}`;
                } else {
                    console.error('Error en la respuesta de OSRM:', data);
                    document.getElementById('route-distance').innerHTML = `<strong>Distancia Total:</strong> Error`;
                    document.getElementById('route-time').innerHTML = `<strong>Tiempo Total:</strong> Error`;
                }
            } catch (error) {
                console.error('Error al obtener la ruta:', error);
                document.getElementById('route-distance').innerHTML = `<strong>Distancia Total:</strong> Error`;
                document.getElementById('route-time').innerHTML = `<strong>Tiempo Total:</strong> Error`;
            }
        } else {
            // Si no hay puntos, limpiar información
            document.getElementById('route-distance').innerHTML = `<strong>Distancia Total:</strong> ---`;
            document.getElementById('route-time').innerHTML = `<strong>Tiempo Total:</strong> ---`;
        }
    }

    // ------------------------------------
    // 6. BOTÓN PARA LIMPIAR MARCADORES
    // ------------------------------------
    document.getElementById('btn-limpiar').addEventListener('click', function() {
        // Eliminar todos los marcadores
        marcadores.forEach(marker => {
            map.removeLayer(marker);
        });
        
        // Limpiar arrays
        marcadores = [];
        coordenadas = [];
        
        // Eliminar capa de ruta
        if (routeLayer) {
            map.removeLayer(routeLayer);
            routeLayer = null;
        }
        
        // Eliminar control de ruta
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }
        
        // Actualizar panel
        actualizarPanel();
        
        // Limpiar información de ruta
        document.getElementById('route-distance').innerHTML = `<strong>Distancia Total:</strong> ---`;
        document.getElementById('route-time').innerHTML = `<strong>Tiempo Total:</strong> ---`;
    });

    // Inicializar panel
    actualizarPanel();

});

// Función auxiliar para convertir segundos en formato legible (ej. 1h 30m)
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);

    let parts = [];
    if (h > 0) parts.push(h + 'h');
    if (m > 0) parts.push(m + 'm');
    if (s > 0 && h === 0 && m === 0) parts.push(s + 's');
    if (parts.length === 0) return '0s';
    return parts.join(' ');
}
