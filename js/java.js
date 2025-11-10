class ConvertidorDivisas {
  constructor() {
    this.rates = {
      MXN: 1,
      USD: 0.055,
      EUR: 0.05,
      JPY: 8.2,
    };

    this.symbols = {
      MXN: { flag: "MX", sym: "$" },
      USD: { flag: "US", sym: "$" },
      EUR: { flag: "EU", sym: "€" },
      JPY: { flag: "JP", sym: "¥" },
    };
  }

  convertir(from, to, cantidad) {
    if (from === to) {
      return cantidad;
    }

    let enMXN;
    if (from === "MXN") {
      enMXN = cantidad;
    } else {
      const unoFromEnMXN = 1 / this.rates[from];
      enMXN = cantidad * unoFromEnMXN;
    }

    const resultado = enMXN * this.rates[to];
    return resultado;
  }

  formatear(moneda, valor) {
    const s = this.symbols[moneda]?.sym || "";
    return s + valor.toFixed(2) + " " + moneda;
  }

  etiquetaMoneda(moneda) {
    const data = this.symbols[moneda];
    if (data) {
      return `${data.flag} ${moneda}`;
    }
    return moneda;
  }
}

// DOM y eventos
const form = document.getElementById("formDivisas");
const inputCantidad = document.getElementById("cantidad");
const selectFrom = document.getElementById("deMoneda");
const selectTo = document.getElementById("aMoneda");
const divResultado = document.getElementById("resultado");

const convertidor = new ConvertidorDivisas();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cantidadTexto = inputCantidad.value;
  const cantidad = parseFloat(cantidadTexto);

  if (isNaN(cantidad) || cantidad < 0) {
    divResultado.innerHTML =
      "<p>Por favor escribe una cantidad válida (>= 0).</p>";
    return;
  }

  const from = selectFrom.value;
  const to = selectTo.value;

  const valorConvertido = convertidor.convertir(from, to, cantidad);

  const etiquetaFrom = convertidor.etiquetaMoneda(from);
  const etiquetaTo = convertidor.etiquetaMoneda(to);
  const txtOriginal = convertidor.formatear(from, cantidad);
  const txtFinal = convertidor.formatear(to, valorConvertido);

  divResultado.innerHTML = `
    <div class="moneda">${etiquetaFrom}</div>
    <span>A :</span>
    <div class="moneda">${etiquetaTo}</div>
    <p style="margin-top:8px;">
      ${txtOriginal} SON <strong>${txtFinal}</strong>.
    </p>
  `;
});
