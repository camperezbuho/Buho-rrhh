const button = document.getElementById("clockButton");
const statusText = document.getElementById("status");

let isWorking = false;
let history = [];

button.addEventListener("click", () => {
  const now = new Date().toLocaleString();

  if (!isWorking) {
    // ENTRADA
    isWorking = true;
    button.textContent = "SALIDA";
    statusText.textContent = `Entrada registrada: ${now}`;

    history.push({
      usuario: "Perez Camila",
      cargo: "Office Manager",
      tipo: "Entrada",
      fecha: now
    });
  } else {
    // SALIDA
    isWorking = false;
    button.textContent = "ENTRADA";
    statusText.textContent = `Salida registrada: ${now}`;

    history.push({
      usuario: "Perez Camila",
      cargo: "Office Manager",
      tipo: "Salida",
      fecha: now
    });
  }

  console.log(history);
});

 
