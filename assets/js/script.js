let data = ''
function conversor() {
    const monedas = document.querySelector("#monedas");
    const monto = document.querySelector("#monto");
    const resultados = document.querySelector("#resultados");

    let mr = parseFloat(monto.value) * parseInt(monedas.value);
    resultados.innerHTML = currencyFormatDE(mr);
}

function currencyFormatDE(Number) {
    return(
      Number
      .toFixed(0)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " CLP "
    );
}

async function getDatos() {
    try {
      const res = await fetch("https://api.gael.cloud/general/public/monedas");
      data = await res.json();
  
      let e = document.querySelector("#monedas");
  
      let html = "";
      for (let moneda of data) {
        html += `<option value="${moneda.Valor}">${moneda.Nombre}</option>`;
      }
  
      e.innerHTML = html;
      renderGrafica(data);
    } catch (e) {}
}
  
function prepararConfiguracionParaLaGrafica(monedas) {
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.map((moneda) => moneda.Codigo);
    const titulo = "Monedas";
    const colorDeLinea = "red";
    const valores = monedas.map((moneda) => {
        const valor = moneda.Valor.replace(",", ".");
        return Number(valor);
    });
  
  
    const config = {
        type: tipoDeGrafica,
        data: {
            labels: nombresDeLasMonedas,
            datasets: [{
                label: titulo,
                backgroundColor: colorDeLinea,
                data: valores
            }
            ]
        }
    };
 return config;
}
  
  
  
async function renderGrafica(valores) {
  
    const config = await prepararConfiguracionParaLaGrafica(valores);
    const chartDOM = document.getElementById("myChart");
    
   new Chart(chartDOM, config);
}
  
  
getDatos();

