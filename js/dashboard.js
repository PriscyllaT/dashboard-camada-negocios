function mostrarGraficoChuva(){
   	document.getElementById('chuva').innerHTML += '<iframe width="455" height="300" style="border: 1px solid #cccccc;" src="https://thingspeak.com/apps/matlab_visualizations/230418"></iframe>'
}

function mostrarGraficoTemperatura(){
	document.getElementById('chuva').innerHTML += '<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/apps/matlab_visualizations/228591"></iframe>'
}

function mostrarMapa(){
	document.getElementById('mapa').innerHTML += '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-120.67382812500001%2C-41.11246878918086%2C-22.587890625000004%2C1.142502403706165&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=4/-21.49/-71.63">Ver Mapa Ampliado</a></small>'
}

function inicializar(){
    var slider = document.getElementById("range");
            var output = document.getElementById("mes");
            output.innerHTML = slider.value;

            slider.oninput = function() {
               output.innerHTML = this.value;
                mostrarGraficoCasos()
               requisicaoDadosArbovirosesPluviometria(slider.value)
            }

}

function mostrarGraficoCasos() {
    var grafico = document.getElementById('grafico').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'arial';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#FFFFF';

    var massPopChart = new Chart(grafico, {
        type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho'],
            datasets:[{
                label:'Population',
                data:[

                    231,
                    580,
                    1300,
                    3023,
                    9100,
                    6200,
                    2600
                ],
                //backgroundColor:'green',
                backgroundColor:[
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 99, 132, 0.8)'
                ],
                borderWidth:1,
                borderColor:'#777',
                hoverBorderWidth:3,
                hoverBorderColor:'#000'
            }]
        },
        options:{
            title:{
                display:true,
                text:'Casos',
                fontSize:25
            },
            legend:{
                display:true,
                position:'right',
                labels:{
                    fontColor:'#000'
                }
            },
            layout:{
                padding:{
                    left:0,
                    right:0,
                    bottom:0,
                    top:0
                }
            },
            tooltips:{
                enabled:true
            }
        }
    });
}

