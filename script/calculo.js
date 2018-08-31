function calcular() {
  var PrecioP = parseInt(document.getElementById("PrecioP").value);
  var DescProm = parseInt(document.getElementById("DescProm").value);
  var DescSis = parseInt(document.getElementById("DescSis").value);
  var valor = ((PrecioP*((100-DescProm)/100))/((100-DescSis)/100)).toFixed(0);;
  document.getElementById("ValorFinal").innerHTML = valor;
}
