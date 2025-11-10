class CalculadoraIMC {
  calcularIMC(pesoKg, alturaCm) {
    const alturaM = alturaCm / 100;
    if (alturaM <= 0) {
      return NaN;
    }
    const imc = pesoKg / (alturaM * alturaM);
    return Math.round(imc * 100) / 100;
  }

  categoriaDe(imc) {
    if (isNaN(imc)) {
      return {
        nombre: "Datos inválidos",
        clase: "bad",
        consejo: "Revisa que los números sean correctos.",
      };
    }

    if (imc < 18.5) {
      return {
        nombre: "Bajo peso",
        clase: "warn",

        consejo: "come mas bajo de peso",
      };
    } else if (imc >= 18.5 && imc < 25) {
      return {
        nombre: "Normal",
        clase: "ok",
        consejo: "Bien! sigue asi de saludable.",
      };
    } else if (imc >= 25 && imc < 30) {
      return {
        nombre: "Sobrepeso",
        clase: "warn",
        consejo: "cuidate un poco mas",
      };
    } else {
      return {
        nombre: "Obesidad",
        clase: "bad",
        consejo: "CHECATE Pa!!",
      };
    }
  }
}

const formIMC = document.getElementById("formIMC");
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");
const salida = document.getElementById("salida");

const calc = new CalculadoraIMC();

formIMC.addEventListener("submit", function (ev) {
  ev.preventDefault();

  const pesoTxt = inputPeso.value;
  const alturaTxt = inputAltura.value;

  const peso = parseFloat(pesoTxt);
  const altura = parseFloat(alturaTxt);

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    salida.innerHTML = `<p class="bad">ingresa datos validos</p>`;
    return;
  }

  const imc = calc.calcularIMC(peso, altura);
  const info = calc.categoriaDe(imc);

  salida.innerHTML = `
    <div class="card">
      
      <div>
        <h3>IMC: ${isNaN(imc) ? "-" : imc}</h3>
        <p class="${info.clase}"><strong>Categoría:</strong> ${info.nombre}</p>
        <p class="msg">${info.consejo}</p>
      </div>
    </div>
  `;
});
