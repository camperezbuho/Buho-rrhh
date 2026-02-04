document.addEventListener("DOMContentLoaded", () => {

  // -------- ELEMENTOS --------
  const button = document.getElementById("clockButton");
  const status = document.getElementById("status");

  const adminAccess = document.getElementById("adminAccess");
  const adminPanel = document.getElementById("adminPanel");
  const historyDiv = document.getElementById("history");
  const exportCSVBtn = document.getElementById("exportCSV");

  // -------- CONFIG --------
  const ADMIN_PASSWORD = "buhoadmin";
  let isEntry = true;

  let logs = JSON.parse(localStorage.getItem("logs")) || [];

  // -------- FICHAJE --------
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

  // -------- ADMIN --------
  adminAccess.addEventListener("click", () => {
    const pass = prompt("Clave de administrador:");

    if (pass === ADMIN_PASSWORD) {
      adminPanel.classList.remove("hidden");
      renderHistory();
    } else {
      alert("Clave incorrecta");
    }
  });

  function renderHistory() {
    historyDiv.innerHTML = "";
    logs.forEach(log => {
      const p = document.createElement("p");
      p.textContent = `${log.date} - ${log.time} - ${log.user} - ${log.type}`;
      historyDiv.appendChild(p);
    });
  }

  // -------- EXPORT CSV --------
  exportCSVBtn.addEventListener("click", () => {
    let csv = "Usuario,Cargo,Tipo,Fecha,Hora\n";

    logs.forEach(log => {
      csv += `${log.user},${log.role},${log.type},${log.date},${log.time}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "historial_fichaje.csv";
    a.click();

    URL.revokeObjectURL(url);
  });

});
