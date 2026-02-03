const button = document.getElementById("clockButton");
const statusText = document.getElementById("status");

let isWorking = false;
let history = [];

button.addEventListener("click", () => {
  const now = new Date().toLocaleTimeString();

  if (!isWorking) {
    // ENTRADA
    isWorking = true;
    button.textContent = "SALIDA";
    statusText.textContent = `Entrada registrada a las ${now}`;

    history.push({
      usuario: "Perez Camila",
      puesto: "Office Manager",
      tipo: "Entrada",
      hora: now
    });

  } else {
    // SALIDA
    isWorking = false;
    button.textContent = "ENTRADA";
    statusText.textContent = `Salida registrada a las ${now}`;

    history.push({
      usuario: "Perez Camila",
      puesto: "Office Manager",
      tipo: "Salida",
      hora: now
    });

    console.log("Historial de fichaje:", history);
  }
});
