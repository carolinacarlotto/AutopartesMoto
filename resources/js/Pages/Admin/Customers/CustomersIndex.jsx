import React, { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { Edit, Trash2, ShoppingCart } from "lucide-react";

import AdminLayout from "../../../Layouts/AdminLayout/AdminLayout.jsx";
import DynamicTable from "../../../Components/Tables/DynamicTable.jsx";
import Modal from "../../../Components/Modals/Modal.jsx";
import CustomerForm from "./Components/CustomerForm.jsx";

import { getCustomers, createCustomer } from "@/Services/customer.js";

import { useNotification } from "@/Providers/NotificationProvider.jsx";
import { downloadExcel } from "@/Utils/downloadExcel.js";

export default function CustomersIndex() {
    const auth = usePage().props.auth;
    const { success, error, warning, info } = useNotification();

    const [customers, setCustomers] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(5);
    const [lastPage, setLastPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);
    const [search, setSearch] = React.useState("");

    const [createCustomerModal, setCreateCustomerModal] = React.useState(false);

    const handleSave = async (data) => {
        try {
            await createCustomer(data);
            success("Cliente creado exitosamente");
            setCreateCustomerModal(false);
            fetchCustomers(); // Refresh the customer list
        } catch (err) {
            console.error("There was an error creating the customer!", err);
            const errors = err.response?.data?.errors || {};
            for (const [field, messages] of Object.entries(errors)) {
                messages.forEach((message) => {
                    error(message);
                });
            }
        }
    };

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers({
                page,
                perPage,
                search,
            });
            setCustomers(data.data);
            setTotal(data.total);
            setLastPage(data.last_page);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const downloadExcelCustomers = async () => {
        try {
            const data = await getCustomers({
                all: true,
            });
            /**
             * convert to matrix of arrays
             */

            const dataMatrix = data.map((item, index) => [
                index + 1,
                item.name,
                item.document_type,
                item.document_number,
                item.email,
                item.phone,
                item.address,
            ]);

            console.log(dataMatrix);

            const dataExcel = {
                fileName: "Reporte Clientes",
                title: "Reporte de Clientes",
                headers: ["Nro","Nombre", "Documento", "Nro. Documento",  "Email", "Teléfono", "Dirección"],
                headerColor: "4472C4",
                data: dataMatrix,
                sheetName: "Clientes",
            };
            downloadExcel(dataExcel);

            
        } catch (error) {
            console.error("Error downloading customers report:", error);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [page, perPage, search]);

    const headers = [
        //{ key: "code", label: "Código" },
        {
            key: "name",
            label: "Nombre",
        },
        {
            key: "document_number",
            label: "Documento",
            render: (value, row) => (
                <>
                    <p className="m-0">
                        {row.document_type || "N/A"}:{" "}
                        {row.document_number || "N/A"}
                    </p>
                </>
            ),
        },
        {
            key: "email",
            label: "Email",
            render: (value) => value || "N/A",
        },
        {
            key: "phone",
            label: "Teléfono",
            render: (value) => value || "N/A",
        },
        {
            key: "address",
            label: "Dirección",
            render: (value) => value || "N/A",
        }
    ];

    const actions = [
        /*{
            key: "edit",
            label: "Editar",
            icon: Edit,
            onClick: (row) => alert(`Editar ${row.name}`),
        },*/
        {
            key: "sales",
            label: "Ventas",
            icon: ShoppingCart,
            onClick: (row) =>
                router.visit(
                    route("admin.sales.index") +
                        `?search=${row.document_number}`
                ),
        },
        /*{ divider: true },
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
        },*/
    ];

    return (
        <AdminLayout auth={auth}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Clientes</h2>
                <div>
                    {/** Download Button **/}
                    <button
                        onClick={() => downloadExcelCustomers()}
                        className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-2"
                    >
                        Exportar
                    </button>

                    {/** Add Customer Button **/}
                    <button
                        onClick={() => setCreateCustomerModal(true)}
                        className="px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Agregar Cliente
                    </button>
                </div>
            </div>

            <DynamicTable
                enableSorting={false}
                headers={headers}
                data={customers}
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
                searchPlaceholder="Buscar clientes..."
                onChangeSearch={setSearch}
            />

            <Modal
                isOpen={createCustomerModal}
                onClose={() => setCreateCustomerModal(false)}
                title="Crear Cliente"
                size="large"
                closeOnOverlay={false}
            >
                <div
                    style={{
                        maxHeight: "calc(100vh - 200px)",
                        overflowY: "auto",
                    }}
                >
                    <CustomerForm
                        onSave={handleSave}
                        onCancel={() => setCreateCustomerModal(false)}
                    />
                </div>
            </Modal>
        </AdminLayout>
    );
}
