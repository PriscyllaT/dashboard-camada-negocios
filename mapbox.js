
function pegarCasosArboviroses() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function (){
        if (xhttp.readyState == 4) {
            if (xhttp.status = 200)
                exibirOcorrencias(this.responseText)
        }
    }
    xhttp.open("GET", "https://api.thingspeak.com/channels/494997/feeds.json?results=30000", true)

    xhttp.send()

}

function carregarContornosBairroRegional(map){
    var regionais = 'https://raw.githubusercontent.com/PriscyllaT/dashboard/master/bairrosregionais.json';
    var bairros = 'https://raw.githubusercontent.com/PriscyllaT/dashboard/master/limitebairro.json';
    map.addLayer({
            'id': 'bairros',
            'type': 'line',
            'source': {
                'type': 'geojson',
                'data': bairros
            },
            'layout': {},
            'paint':{
                'line-color': '#F7455D' // red
            }
        });
          
    map.addLayer({
          'id': 'regionais',
          'type': 'line',
          'source': {
              'type': 'geojson',
              'data': regionais
          },
          'layout': {},
          'paint':{
              'line-width': 3
          }
      });       
}


function exibirOcorrencias(responseText){
  
    var jsonResposta = JSON.parse(responseText)
    console.log(jsonResposta)
    var ocorrencias = jsonResposta.feeds
    var arrayLocalizacaoOcorrencias = []
    var mensagem = "Ponto"
    
    for(i = 0; i < ocorrencias.length; i++){
       
        var latitude  = parseFloat(ocorrencias[i].field7)
        var longitude = parseFloat(ocorrencias[i].field6)
        var json = {
                "type": "Feature",
                "properties": {
                    "message": mensagem,
                    "iconSize": [60, 60]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [longitude,latitude]
                }
        }
         arrayLocalizacaoOcorrencias.push(json)
    }

    console.log(json)
   
    var geojson = { 
        "type": "FeatureCollection",
        "features": arrayLocalizacaoOcorrencias};


    mapboxgl.accessToken = 'pk.eyJ1IjoicHJpc2N5bGxhdCIsImEiOiJjamxqZG9nM3gwYXMzM3ZteGFpMDI3dHdsIn0.r_t2Hf1KDlHe9iA8cwF11w'; 
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-38.530723,-3.791678],
        zoom:10
    });

map.on('load', function () {

carregarContornosBairroRegional(map)

map.addSource("ocorrencias", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

map.addLayer({
        id: "clusters",
        type: "circle",
        source: "ocorrencias",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });
map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "ocorrencias",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

});


}   