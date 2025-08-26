import React from "react";
import { usePage } from "@inertiajs/react";
import * as XLSX from "xlsx";

import AdminLayout from "../Layouts/AdminLayout/AdminLayout.jsx";
import TopSellingProduct from "./Admin/Products/Components/TopSellingProduct.jsx";
import SalesCard from "./Admin/Sales/Components/SalesCard.jsx";

import { getSalesAnalytics } from "@/Services/sale.js";
import { getTopSellingProducts } from "@/Services/products.js";



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
        const formattedData = data.map((item) => ({
            //ID: item.id,
            "Número de Documento": item.document_number,
            "Fecha de Venta": item.sale_date,
            "Subtotal": Number(item.subtotal || 0).toFixed(2),
            "Ganancia": Number(item.discount || 0).toFixed(2),
            "Impuesto": Number(item.tax || 0).toFixed(2),
            "Total": Number(item.total || 0).toFixed(2),
            "Método de Pago": item.payment_method,
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Venta");

        XLSX.writeFile(workbook, "venta.xlsx");
    };

    const downloadExcelProducts = (data = []) => {
        const formattedData = data.map((item) => ({
            Producto: item.product?.name || "",
            Categoria: item.product?.category_name || "",
            Cantidad: item.total_quantity || 0,
            Ganancia: Number(item.total_profit || 0).toFixed(2),
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

        XLSX.writeFile(workbook, "productos.xlsx");
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
