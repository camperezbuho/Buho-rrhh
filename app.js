document.addEventListener("DOMContentLoaded", () => {
const button = document.getElementById("clockButton");
const status = document.getElementById("status");

const adminAccess = document.getElementById("adminAccess");
const adminPanel = document.getElementById("adminPanel");
const historyDiv = document.getElementById("history");

const exportExcelBtn = document.getElementById("exportExcel");
const exportCSVBtn = document.getElementById("exportCSV");

const ADMIN_PASSWORD = "buhoadmin"; // después la cambiamos

let isEntry = true;

// Cargar historial
let logs = JSON.parse(localStorage.getItem("logs")) || [];

// ==========================
// FICHAJE
// ==========================
button.addEventListener("click", () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toLocaleTimeString();

  const log = {
    user: "Perez Camila",
    role: "Office Manager",
    type: isEntry ? "ENTRADA" : "SALIDA",
    date,
    time
  };

  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));

  status.textContent = `${log.type} registrada a las ${time}`;

  button.textContent = isEntry ? "SALIDA" : "ENTRADA";
  isEntry = !isEntry;
});

// ==========================
// MODO ADMIN
// ==========================
adminAccess.addEventListener("click", () => {
  const pass = prompt("Clave de administrador:");

  if (pass === ADMIN_PASSWORD) {
    adminPanel.classList.remove("hidden");
    renderHistory();
  } else {
    alert("Clave incorrecta");
  }
});

// ==========================
// MOSTRAR HISTORIAL
// ==========================
function renderHistory() {
  historyDiv.innerHTML = "";

  logs.forEach(log => {
    const p = document.createElement("p");
    p.textContent = `${log.date} - ${log.time} - ${log.user} - ${log.type}`;
    historyDiv.appendChild(p);
  });
}

// ==========================
// EXPORTAR CSV (Google Sheets)
// ==========================
exportCSVBtn.addEventListener("click", () => {
  let csv = "Usuario,Cargo,Tipo,Fecha,Hora\n";

  logs.forEach(log => {
    csv += `${log.user},${log.role},${log.type},${log.date},${log.time}\n`;
  });

  downloadFile(csv, "historial_fichaje.csv", "text/csv");
});

// ==========================
// EXPORTAR EXCEL
// ==========================
exportExcelBtn.addEventListener("click", () => {
  let csv = "Usuario,Cargo,Tipo,Fecha,Hora\n";

  logs.forEach(log => {
    csv += `${log.user},${log.role},${log.type},${log.date},${log.time}\n`;
  });

  downloadFile(csv, "historial_fichaje.xlsx", "application/vnd.ms-excel");
});

// ==========================
// DESCARGA
// ==========================
function downloadFile(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}
});

