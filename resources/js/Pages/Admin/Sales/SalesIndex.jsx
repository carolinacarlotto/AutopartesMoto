import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Eye, FlipHorizontal2, Trash2 } from "lucide-react";
import axios from "axios";

import AdminLayout from "../../../Layouts/AdminLayout/AdminLayout.jsx";
import DynamicTable from "../../../Components/Tables/DynamicTable.jsx";
import Modal from "../../../Components/Modals/Modal.jsx";
import SaleForm from "./Components/SaleForm.jsx";
import SaleInvoice from "./Components/SaleInvoice.jsx";
import SalesCard from "./Components/SalesCard.jsx";

import { getSales, getSale, getSalesAnalytics } from "@/Services/sale.js";
import { downloadExcel } from "@/Utils/downloadExcel.js";

export default function SalesIndex() {
    const auth = usePage().props.auth;

    const [salesAnalytics, setSalesAnalytics] = useState({});
    const [sales, setSales] = useState([]);
    const [saleDetails, setSaleDetails] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState(usePage().props.search || "");

    const [selectedSale, setSelectedSale] = useState(null);
    const [createProductModal, setCreateProductModal] = useState(false);
    const [viewSaleModal, setViewSaleModal] = useState(false);

    const fetchSales = async () => {
        try {
            const data = await getSales({
                page,
                perPage,
                search,
            });
            setSales(data.data);
            setTotal(data.total);
            setLastPage(data.last_page);
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    };

    const downloadExcelSales = async () => {
        try {
            const data = await getSales({
                all: true,
            });
            /**
             * convert to matrix of arrays
             */
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
                title: "Reporte de Ventas",
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
        } catch (error) {
            console.error("Error fetching sales:", error);
            return;
        }
    };

    const fetchSaleDetails = async (id) => {
        try {
            const response = await getSale(id);
            setViewSaleModal(true);
            setSaleDetails(response);
        } catch (error) {
            setViewSaleModal(false);
            console.error("Error fetching sale details:", error);
        }
    };

    const fetchSaleAnalytics = async (startDate, endDate) => {
        try {
            const params = {
                //25-07-2024 00:00 to 01-08-2024 00:00
                start_date: startDate,
                end_date: endDate,
            }; // Add any parameters if needed
            const data = await getSalesAnalytics(params);
            setSalesAnalytics(data);
        } catch (error) {
            console.error("Error fetching sales analytics:", error);
        }
    };

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

    useEffect(() => {
        fetchSales();
        fetchSaleAnalytics();
    }, [page, perPage, search]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "PEN",
            minimumFractionDigits: 2,
        }).format(parseFloat(amount));
    };

    const headers = [
        {
            key: "customer",
            label: "Cliente",
            render: (value) => (
                <>
                    {value ? (
                        <>
                            <p className="m-0">{value.name}</p>
                            <p className="m-0">
                                {value.document_type}: {value.document_number}
                            </p>
                            {value.type === "business" && (
                                <p className="m-0">Empresa</p>
                            )}
                            {value.type === "individual" && (
                                <p className="m-0">Persona</p>
                            )}
                        </>
                    ) : (
                        "N/A"
                    )}
                </>
            ),
        },
        {
            key: "sale_date",
            label: "Fecha de Venta",
            render: (value) =>
                /*value ?
                    new Date(value).toLocaleDateString("es-PE") + " " +
                    new Date(value).toLocaleTimeString("es-PE") : "N/A",*/
                value ? (
                    <div>
                        <p className="m-0">
                            {new Date(value).toLocaleDateString("es-PE")}
                        </p>
                        <p className="m-0">
                            {new Date(value).toLocaleTimeString("es-PE")}
                        </p>
                    </div>
                ) : (
                    "N/A"
                ),
        },
        {
            key: "document_number",
            label: "Número de Documento",
        },
        {
            key: "total",
            label: "Total",
            render: (value) => formatCurrency(value),
        },
    ];

    const actions = [
        {
            key: "view",
            label: "Ver detalles",
            icon: Eye,
            onClick: (row) => fetchSaleDetails(row.id),
        },
        /*{
            key: "sale",
            label: "Registrar venta",
            icon: ShoppingCart,
            onClick: (row) => alert(`Registrar venta de ${row.document_number}`),
            //show: (row) => row.activo, // Solo mostrar si está activo
        },*/
        { divider: true },
        {
            key: "delete",
            label: "Eliminar",
            icon: Trash2,
            onClick: (row) => {
                if (confirm(`¿Eliminar a ${row.nombre}?`)) {
                    alert(`${row.nombre} eliminado`);
                }
            },
            className: "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
        },
    ];

    return (
        <AdminLayout auth={auth}>
            {/*<div className="mb-6">
                <SalesCard
                    data={salesAnalytics}
                    onDateRangeChange={onDateRangeChange}
                />
            </div>*/}

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Ventas
                </h2>

                <div>

                    {/** Download Button **/}

                    <button
                        onClick={() => downloadExcelSales()}
                        className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-2"
                    >
                        Descargar
                    </button>

                    {/** Add Sale Button **/}
                    <button
                        onClick={() => setCreateProductModal(true)}
                        className="px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Agregar Venta
                    </button>
                </div>
            </div>

            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <DynamicTable
                    enableSorting={false}
                    headers={headers}
                    data={sales}
                    actions={actions}
                    page={page}
                    lastPage={lastPage}
                    itemsPerPage={perPage}
                    total={total}
                    onChangeItemsPerPage={setPerPage}
                    onChangePage={setPage}
                    actionsConfig={{
                        position: "right",
                    }}
                    searchable={true}
                    search={search}
                    searchPlaceholder="Buscar ventas..."
                    onChangeSearch={setSearch}
                />
            </div>

            <Modal
                isOpen={createProductModal}
                onClose={() => setCreateProductModal(false)}
                title="Crear Venta"
                size="full"
            >
                <div
                    style={{
                        maxHeight: "calc(100vh - 200px)",
                        overflowY: "auto",
                    }}
                >
                    <SaleForm
                        onSaleCreated={(saleData) => {
                            fetchSales();
                            setCreateProductModal(false);
                        }}
                    />
                </div>
            </Modal>

            <Modal
                isOpen={viewSaleModal}
                onClose={() => setViewSaleModal(false)}
                title="Detalles de la Venta"
                size="xlarge"
            >
                <div
                    style={{
                        maxHeight: "calc(100vh - 200px)",
                        overflowY: "auto",
                    }}
                >
                    {saleDetails ? (
                        <SaleInvoice saleData={saleDetails} />
                    ) : (
                        <p>Cargando detalles de la venta...</p>
                    )}
                </div>
            </Modal>
        </AdminLayout>
    );
}
