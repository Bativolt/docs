// src/pages/filterElectricians.js

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const tableRows = document.querySelectorAll("#electricianTable tbody tr");
  
    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
  
      tableRows.forEach((row) => {
        const communeCell = row.querySelector("td:nth-child(2)"); // Assurez-vous que c'est la bonne colonne pour la commune
        const commune = communeCell ? communeCell.textContent.toLowerCase() : "";
  
        // Vérifie si la commune contient le texte filtré
        if (commune.includes(filter)) {
          row.style.display = ""; // Afficher la ligne
        } else {
          row.style.display = "none"; // Masquer la ligne
        }
      });
    });
  });
  