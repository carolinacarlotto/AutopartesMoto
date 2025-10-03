import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/**
 * Descarga un archivo Excel con título, headers personalizados y datos
 * @param {Object} options - Opciones de configuración
 * @param {string} options.fileName - Nombre del archivo (sin extensión)
 * @param {string} options.title - Título que aparecerá en la primera fila
 * @param {Array<string>} options.headers - Array con los nombres de las columnas
 * @param {string} options.headerColor - Color hexadecimal para el header (ej: "4472C4")
 * @param {Array<Object>|Array<Array>} options.data - Array de objetos o matriz de arrays con los datos
 * @param {string} options.sheetName - Nombre de la hoja (opcional, default: "Datos")
 */
export const downloadExcel = async ({
    fileName = "archivo",
    title = "",
    headers = [],
    headerColor = "4472C4",
    data = [],
    sheetName = "Datos",
}) => {
    // Crear un nuevo workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    let currentRow = 1;

    // Agregar título si existe
    if (title) {
        const titleRow = worksheet.getRow(currentRow);
        titleRow.getCell(1).value = title;

        // Merge del título para abarcar todas las columnas
        worksheet.mergeCells(currentRow, 1, currentRow, headers.length);

        // Estilos del título
        titleRow.getCell(1).font = {
            size: 16,
            bold: true,
            color: { argb: "FF000000" },
        };
        titleRow.getCell(1).alignment = {
            horizontal: "center",
            vertical: "middle",
        };
        titleRow.getCell(1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFE7E6E6" },
        };
        titleRow.height = 25;

        currentRow += 2; // Saltar una fila después del título
    }

    // Agregar headers
    const headerRow = worksheet.getRow(currentRow);
    headers.forEach((header, index) => {
        const cell = headerRow.getCell(index + 1);
        cell.value = header;

        // Estilos del header
        cell.font = {
            bold: true,
            color: { argb: "FFFFFFFF" },
            size: 11,
        };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: `FF${headerColor}` },
        };
        cell.alignment = {
            horizontal: "center",
            vertical: "middle",
        };
        cell.border = {
            top: { style: "thin", color: { argb: "FF000000" } },
            left: { style: "thin", color: { argb: "FF000000" } },
            bottom: { style: "thin", color: { argb: "FF000000" } },
            right: { style: "thin", color: { argb: "FF000000" } },
        };
    });
    headerRow.height = 20;
    currentRow++;

    // Verificar si la data es array de arrays o array de objetos
    const isArrayOfArrays = data.length > 0 && Array.isArray(data[0]);

    // Agregar datos
    data.forEach((row) => {
        const dataRow = worksheet.getRow(currentRow);

        if (isArrayOfArrays) {
            // Si es array de arrays, usar directamente
            row.forEach((value, index) => {
                const cell = dataRow.getCell(index + 1);
                cell.value = value;

                // Estilos de las celdas de datos
                cell.border = {
                    top: { style: "thin", color: { argb: "FF000000" } },
                    left: { style: "thin", color: { argb: "FF000000" } },
                    bottom: { style: "thin", color: { argb: "FF000000" } },
                    right: { style: "thin", color: { argb: "FF000000" } },
                };
                cell.alignment = {
                    vertical: "middle",
                };
            });
        } else {
            // Si es array de objetos, mapear según headers
            headers.forEach((header, index) => {
                const key = Object.keys(row).find(
                    (k) => k.toLowerCase() === header.toLowerCase()
                );
                const value =
                    row[key] !== undefined ? row[key] : row[header] || "";

                const cell = dataRow.getCell(index + 1);
                cell.value = value;

                // Estilos de las celdas de datos
                cell.border = {
                    top: { style: "thin", color: { argb: "FF000000" } },
                    left: { style: "thin", color: { argb: "FF000000" } },
                    bottom: { style: "thin", color: { argb: "FF000000" } },
                    right: { style: "thin", color: { argb: "FF000000" } },
                };
                cell.alignment = {
                    vertical: "middle",
                };
            });
        }

        currentRow++;
    });

    // Auto-ajustar ancho de columnas
    headers.forEach((header, index) => {
        let maxLength = header.length;

        if (isArrayOfArrays) {
            const columnValues = data.map((row) => row[index]);
            const columnMaxLength = Math.max(
                ...columnValues.map((val) => (val ? String(val).length : 0))
            );
            maxLength = Math.max(maxLength, columnMaxLength);
        } else {
            const columnMaxLength = Math.max(
                ...data.map((row) => {
                    const key = Object.keys(row).find(
                        (k) => k.toLowerCase() === header.toLowerCase()
                    );
                    const val = row[key] !== undefined ? row[key] : row[header];
                    return val ? String(val).length : 0;
                })
            );
            maxLength = Math.max(maxLength, columnMaxLength);
        }

        worksheet.getColumn(index + 1).width = Math.min(maxLength + 2, 50);
    });

    // Generar el archivo y descargarlo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
};

// Ejemplo de uso con objetos:
/*
const dataObjetos = [
  { nombre: "Juan Pérez", edad: 30, ciudad: "Lima" },
  { nombre: "María García", edad: 25, ciudad: "Arequipa" },
  { nombre: "Carlos López", edad: 35, ciudad: "Cusco" }
];

downloadExcel({
  fileName: "reporte-usuarios",
  title: "REPORTE DE USUARIOS 2024",
  headers: ["nombre", "edad", "ciudad"],
  headerColor: "4472C4",
  data: dataObjetos,
  sheetName: "Usuarios"
});
*/

// Ejemplo de uso con arrays:
/*
const dataArrays = [
  ["Juan Pérez", 30, "Lima"],
  ["María García", 25, "Arequipa"],
  ["Carlos López", 35, "Cusco"]
];

downloadExcel({
  fileName: "reporte-usuarios",
  title: "REPORTE DE USUARIOS 2024",
  headers: ["Nombre", "Edad", "Ciudad"],
  headerColor: "4472C4",
  data: dataArrays,
  sheetName: "Usuarios"
});
*/
