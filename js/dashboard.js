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
               mostrarGraficoTemperatura()
               pegarCasosArboviroses(5)
            }
}



