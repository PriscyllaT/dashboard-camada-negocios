
function pegarCasosArboviroses(mes) {
    var xhttp = new XMLHttpRequest();
    var semana = 1;
    var resultado = []
    var mesInicio = mes
    var mesFim = parseInt(mes) + 1
         requisicao(mesInicio,mesFim,xhttp,semana)
        
        xhttp.onreadystatechange = function (){
            if (xhttp.readyState == 4) {
                if (xhttp.status = 200)
                       
                       if(semana == 5){
                         console.log(resultado)
                          exibirOcorrencias(resultado)
                        }else{

                            var jsonResposta = JSON.parse(this.responseText)
                            var ocorrencias = jsonResposta.feeds
                            console.log(ocorrencias)
                            resultado = resultado.concat(ocorrencias)
                            requisicao(mesInicio,mesFim,xhttp,semana)
                            semana++
                       }
                  }
            }
        }
       

function requisicao(mesInicio, mesFim,xhttp,semana){

        var url = "";
        switch(semana) {
            case 1:
            url = "http://api.thingspeak.com/channels/581830/feeds.json?start=2015-" + mesInicio.toString() + "-01%2000:00:00&end=2015-"
                                                                                 + mesInicio.toString() + "-08%2000:00:00";
                                                                              
            break;
            case 2:
            url = "http://api.thingspeak.com/channels/581830/feeds.json?start=2015-" + mesInicio.toString() + "-09%2000:00:00&end=2015-"
                                                                                 + mesInicio.toString() + "-16%2000:00:00";
            break;
            case 3:
            url = "http://api.thingspeak.com/channels/581830/feeds.json?start=2015-" + mesInicio.toString() + "-17%2000:00:00&end=2015-"
                                                                                 + mesInicio.toString() + "-24%2000:00:00";
            break;
            case 4:
            url = "http://api.thingspeak.com/channels/581830/feeds.json?start=2015-" + mesInicio.toString() + "-25%2000:00:00&end=2015-"
                                                                                 + mesFim.toString() + "-01%2000:00:00";
            break;
        }
        
        console.log(url)
        xhttp.open("GET", url, true)

        xhttp.send()       
}

function pegarDadosPluviometria(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function (){
        if (xhttp.readyState == 4) {
            if (xhttp.status = 200)
                exibirOcorrencias(this.responseText)
        }
    }
    url = "http://api.thingspeak.com/channels/616353/feeds.json?start=2015-05-01%2000:00:00&end=2015-06-01%2000:00:00"
    xhttp.open("GET", url, true)

    xhttp.send()
}

function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function pici(jsonRegionais, map){
    //r1, r3, centro,
        map.addSource("regionaisContornoPici", {
        type: "geojson",
        data: {
        type: "FeatureCollection",
        totalFeatures: 3,
        features: [jsonRegionais.features[0],jsonRegionais.features[2],jsonRegionais.features[6]],
         }
        });

        map.addLayer({
            'id': 'pici',
            'type': 'fill',
            'source':'regionaisContornoPici',
            'layout': {},
            'paint': {
                'fill-color': '#111ddf',
                'fill-opacity': 0.8
            }
        });

        

 }
function edq(jsonRegionais, map){
    //r2, r6 cima
        map.addSource("regionaisContornoEdQ", {
        type: "geojson",
        data: {
        type: "FeatureCollection",
        totalFeatures: 2,
        features: [jsonRegionais.features[1],jsonRegionais.features[5]],
         }
        });

        map.addLayer({
            'id': 'edq',
            'type': 'fill',
            'source':'regionaisContornoEdQ',
            'layout': {},
            'paint': {
                'fill-color': '#111ddf',
                'fill-opacity': 0.8
            }
        });
 }


 function messejana(jsonRegionais, map){
    //6
        map.addSource("regionaisContornoMessejana", {
        type: "geojson",
        data: jsonRegionais.features[5],
       

        });

        map.addLayer({
            'id': 'messejana',
            'type': 'fill',
            'source':'regionaisContornoMessejana',
            'layout': {},
            'paint': {
                'fill-color': '#3399ff',
                'fill-opacity': 0.8
            }
        });
 }
function castelao(jsonRegionais, map){//itaperi
    //r4, r5
        map.addSource("regionaisContornoCastelao", {
        type: "geojson",
        data: {
        type: "FeatureCollection",
        totalFeatures: 2,
        features: [jsonRegionais.features[3],jsonRegionais.features[4]],
         }
        });

        map.addLayer({
            'id': 'castelao',
            'type': 'fill',
            'source':'regionaisContornoCastelao',
            'layout': {},
            'paint': {
                'fill-color': '#bce8fa',
                'fill-opacity': 0.8
            }
        });
 }

function carregarContornosBairroRegional(map){
    var regionaisJson;
    var regionais = 'https://raw.githubusercontent.com/PriscyllaT/dashboard/master/bairrosregionais.json';
    loadJSON(regionais, function(response) {
        var regionaisJson = JSON.parse(response);
        map.addLayer({
          'id': 'regionais',
          'type': 'line',
          'source': {
              'type': 'geojson',
              'data': regionaisJson
          },
          'layout': {},
          'paint':{
              'line-width': 3
          }
      });  

        pici(regionaisJson, map);
        castelao(regionaisJson, map);
        messejana(regionaisJson, map);
        edq(regionaisJson, map);  
    });


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
          
    
}


function exibirOcorrencias(responseText){
    
   // var jsonResposta = JSON.parse(responseText)
   // console.log(jsonResposta)
  //  var ocorrencias = jsonResposta.feeds
    var ocorrencias = responseText
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

    //console.log(json)
   
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
                500,
                "#f1f075",
                1000,
                "#f28cb1"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                500,
                30,
                1000,
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
setTimeout(carregarContornosBairroRegional(map), 10000);
}   