function calcular() {
  var PrecioP = parseInt(document.getElementById("PrecioP").value);
  var DescSis = parseInt(document.getElementById("DescSis").value);
  var valor = ((PrecioP/((100-DescSis)/100))+1).toFixed(0);;
  document.getElementById("ValorFinal").innerHTML = valor;
}

function volver(){
  location.href="../index.html"
}
