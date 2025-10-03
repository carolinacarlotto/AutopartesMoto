import React from "react";
import { usePage } from "@inertiajs/react";
import * as XLSX from "xlsx";

import AdminLayout from "../Layouts/AdminLayout/AdminLayout.jsx";
import TopSellingProduct from "./Admin/Products/Components/TopSellingProduct.jsx";
import SalesCard from "./Admin/Sales/Components/SalesCard.jsx";

import { getSalesAnalytics } from "@/Services/sale.js";
import { getTopSellingProducts } from "@/Services/products.js";
import { downloadExcel } from "@/Utils/downloadExcel.js";


export default function Home() {
    const props = usePage().props;
    const auth = props.auth;

    const [topProducts, setTopProducts] = React.useState([]);
    const [salesAnalytics, setSalesAnalytics] = React.useState({});

    const fetchSaleAnalytics = async (startDate, endDate) => {
            try {
                const params = { //25-07-2024 00:00 to 01-08-2024 00:00
                    start_date: startDate,
                    end_date: endDate,
                }; // Add any parameters if needed
                const data = await getSalesAnalytics(params);
                setSalesAnalytics(data);
            } catch (error) {
                console.error("Error fetching sales analytics:", error);
            }
    }

    const fetchTopSellingProducts = async () => {
        try {
            const response = await getTopSellingProducts();
            setTopProducts(response);
        } catch (error) {
            console.error("There was an error fetching the top selling products!", error);
        }
    }
    
    const onDateRangeChange = (startDate, endDate) => {
        console.log("Selected date range:", startDate, endDate);
        // validate startDate and endDate
        if (!startDate || !endDate) {
            console.error("Invalid date range");
            return;
        }
        // validate startDate and endDate
        if (new Date(startDate) > new Date(endDate)) {
            console.error("Invalid date range");
            return;
        }

        fetchSaleAnalytics(startDate, endDate);
    };

    const downloadExcelSales = (data = []) => {
        const dataMatrix = data.map((item, index) => [
            index + 1,
            "Boleta de Venta", // Hardcoded for now
            item.document_number,
            item.customer ? item.customer.name : "N/A",
            item.customer
                ? `${item.customer.document_type}: ${item.customer.document_number}`
                : "N/A",
            parseFloat(item.total).toFixed(2),
            item.sale_date
                ? new Date(item.sale_date).toLocaleDateString("es-PE") +
                  " " +
                  new Date(item.sale_date).toLocaleTimeString("es-PE")
                : "N/A",
            item.user ? item.user.name : "N/A",
            item.payment_method ? item.payment_method : "N/A",
        ]);
        const dataExcel = {
            fileName: "Reporte Ventas",
            title: "REPORTE DE VENTAS 2024",
            headerColor: "4472C4",
            headers: [
                "Nro",
                "Tipo de Documento",
                "Documento venta",
                "Cliente",
                "Documento",
                "Total",
                "Fecha de Venta",
                "Usuario",
                "Tipo de Pago"
            ],
            data: dataMatrix,
            sheetName: "Ventas",
        };
        downloadExcel(dataExcel);
    };

    const downloadExcelProducts = (data = []) => {
        const dataMatrix = data.map((item, index) => [
            index + 1,
            item.product?.name || "",
            item.product?.category_name || "",
            item.product?.brand_name || "",
            item.total_quantity || 0,
            Number(item.total_profit || 0).toFixed(2),
        ]);
        const dataExcel = {
            fileName: "Reporte Productos",
            title: "REPORTE DE PRODUCTOS MÁS VENDIDOS 2024",
            headerColor: "4472C4",
            headers: ["Nro","Producto", "Categoría", "Marca", "Cantidad Vendida", "Total Ganancia"],
            data: dataMatrix,
            sheetName: "Productos",
        };
        downloadExcel(dataExcel);
    };

    React.useEffect(() => {
        fetchTopSellingProducts();
        fetchSaleAnalytics();
    }, []);

    return (
        <AdminLayout auth={auth}>
            <div className="mb-6">
                <SalesCard
                    data={salesAnalytics}
                    onDateRangeChange={onDateRangeChange}
                    onDownloadExcel={downloadExcelSales}
                />
            </div>
            <TopSellingProduct
                products={topProducts}
                onDownloadExcel={downloadExcelProducts}
            />

        </AdminLayout>
    );
}
