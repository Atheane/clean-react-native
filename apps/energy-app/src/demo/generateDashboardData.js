const fs = require('fs');

const parentData = [
  ['Jan', 89.5, 'month', 'jan'],
  ['Feb', 80.5, 'month', 'feb'],
  ['Mar', 70.5, 'month', 'mar'],
  ['Apr', 65.5, 'month', 'apr'],
  ['May', 64.5, 'month', 'may'],
  ['Jun', 64.5, 'month', 'jun'],
  ['Jul', 60.5, 'month', 'jul'],
  ['Aug', 50.5, 'month', 'aug'],
  ['Sep', 55.5, 'month', 'sep'],
  ['Oct', 68.5, 'month', 'oct'],
  ['Nov', 90.5, 'month', 'nov'],
  ['Dec', 100.5, 'month', 'dec'],
];

// function generateRandomValue(baseValue, variance = 0.2) {
//   return baseValue + (Math.random() - 0.5) * baseValue * variance;
// }

// function generateDaysData(month, baseValue, monthCode) {
//   const daysInMonth = new Date(2023, month + 1, 0).getDate();
//   return Array.from({ length: daysInMonth }, (_, i) => {
//     const dayValue = generateRandomValue(baseValue / daysInMonth);
//     return [`${i + 1}`, dayValue, monthCode, `${monthCode}_${i + 1}`];
//   });
// }

// function generateHoursData(day, month, baseValue, dayCode) {
//   return Array.from({ length: 24 }, (_, i) => {
//     const hourValue = generateRandomValue(baseValue / 24);
//     return [`${i.toString().padStart(2, '0')}:00`, hourValue, dayCode, `${dayCode}_${i}`];
//   });
// }

// const monthsData = {};
// const daysData = {};

// parentData.forEach(([monthName, monthValue, _, monthCode], monthIndex) => {
//   monthsData[monthCode] = generateDaysData(monthIndex, monthValue, monthCode);

//   monthsData[monthCode].forEach(([day, dayValue, _, dayCode]) => {
//     daysData[dayCode] = generateHoursData(day, monthIndex, dayValue, dayCode);
//   });
// });

// const allData = [parentData, ...Object.values(monthsData), ...Object.values(daysData)];

// // Convertir les données en JSON
// const jsonData = JSON.stringify(allData, null, 2);

// // Écrire les données dans un fichier
// fs.writeFile('generated_data_2023.json', jsonData, (err) => {
//   if (err) {
//     console.error("Une erreur est survenue lors de l'écriture du fichier :", err);
//   } else {
//     console.log('Les données ont été exportées avec succès dans generated_data.json');
//   }
// });

function generateTableData(parentData) {
  const tableHead = ['      kWh', 'Green\n euros', 'Comfort\nprice'];
  const tableData = parentData.map(([month, consumption]) => {
    const eG = (consumption * 0.035).toFixed(1); // Exemple de calcul pour €G
    const comfortPrice = Math.round(consumption * 12); // Exemple de calcul pour Comfort price
    return [consumption.toString(), `${eG} €G`, comfortPrice.toString()];
  });
  const rowLabels = parentData.map(([month]) => month);

  return {
    tableHead,
    tableData,
    rowLabels,
  };
}

const tableFormatData = generateTableData(parentData);

// Convertir les données en JSON
const tableJsonData = JSON.stringify(tableFormatData, null, 2);

// Écrire les données dans un fichier séparé
fs.writeFile('table_data_2023.json', tableJsonData, (err) => {
  if (err) {
    console.error("Une erreur est survenue lors de l'écriture du fichier table_data :", err);
  } else {
    console.log('Les données du tableau ont été exportées avec succès dans table_data_2023.json');
  }
});
