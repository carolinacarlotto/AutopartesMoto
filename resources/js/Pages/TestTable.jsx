import React from "react";
import { router, usePage } from "@inertiajs/react";
import DynamicTable from "../Components/Tables/DynamicTable.jsx";
import {
    Eye,
    Edit,
    Trash2,
    Copy,
    Mail,
    Download,
    MoreHorizontal,
    MoreVertical,
} from "lucide-react";


export default function TestTable() {
    const props = usePage().props;

    const logoutUser = () => {
        console.log("Logging out user");

        // Here you would typically send a logout request to your backend
        router.post(
            "/logout",
            {
                _token: props.csrfToken, // Include CSRF token for security
            },
            {
                onSuccess: () => {
                    console.log("User logged out successfully");
                    // Redirect to the login page or home page
                    // router.visit('/login');
                },
                onError: (errors) => {
                    console.error("Logout failed:", errors);
                },
            }
        );
    };

    const headers = [
        { key: "id", label: "ID" },
        { key: "nombre", label: "Nombre" },
        { key: "email", label: "Email" },
        { key: "edad", label: "Edad" },
        {
            key: "activo",
            label: "Estado",
            render: (value) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        value
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {value ? "Activo" : "Inactivo"}
                </span>
            ),
        },
    ];

    // Datos de ejemplo
    const data = [
        {
            id: 1,
            nombre: "Juan Pérez",
            email: "juan@example.com",
            edad: 28,
            activo: true,
        },
        {
            id: 2,
            nombre: "María García",
            email: "maria@example.com",
            edad: 34,
            activo: false,
        },
        {
            id: 3,
            nombre: "Carlos López",
            email: "carlos@example.com",
            edad: 45,
            activo: true,
        },
        {
            id: 4,
            nombre: "Ana Martínez",
            email: "ana@example.com",
            edad: 29,
            activo: true,
        },
        {
            id: 5,
            nombre: "Pedro Rodríguez",
            email: "pedro@example.com",
            edad: 38,
            activo: false,
        },
        {
            id: 6,
            nombre: "Lucía Fernández",
            email: "lfer@example.com",
            edad: 26,
            activo: true,
        },
        {
            id: 7,
            nombre: "Sofía Sánchez",
            email: "sofia@example.com",
            edad: 30,
            activo: true,
        },
        {
            id: 8,
            nombre: "Diego Torres",
            email: "diego@example.com",
            edad: 40,
            activo: true,
        },
        {
            id: 9,
            nombre: "Laura Ramírez",
            email: "laura@example.com",
            edad: 35,
            activo: false
        },
        {
            id: 10,
            nombre: "Andrés Jiménez",
            email: "andres@example.com",
            edad: 50,
            activo: true
        },
        {
            id: 11,
            nombre: "Clara Morales",
            email: "clara@example.com",
            edad: 29,
            activo: true
        },
        {
            id: 12,
            nombre: "Javier Díaz",
            email: "javier@example.com",
            edad: 45,
            activo: true
        },
        {
            id: 13,
            nombre: "Patricia Herrera",
            email: "patricia@example.com",
            edad: 32,
            activo: true
        },
        {
            id: 14,
            nombre: "Roberto Castro",
            email: "roberto@example.com",
            edad: 37,
            activo: true
        },
        {
            id: 15,
            nombre: "Isabel Ruiz",
            email: "isabel@example.com",
            edad: 29,
            activo: true
        },
        {
            id: 16,
            nombre: "Fernando Gómez",
            email: "fernando@example.com",
            edad: 42,
            activo: true
        }
    ];

    // Definir acciones
    const actions = [
        {
            key: "view",
            label: "Ver detalles",
            icon: Eye,
            onClick: (row) => alert(`Ver detalles de ${row.nombre}`),
        },
        {
            key: "edit",
            label: "Editar",
            icon: Edit,
            onClick: (row) => alert(`Editar ${row.nombre}`),
            show: (row) => row.activo, // Solo mostrar si está activo
        },
        {
            key: "copy",
            label: "Copiar",
            icon: Copy,
            onClick: (row) => alert(`Copiar ${row.nombre}`),
        },
        { divider: true }, // Separador
        {
            key: "email",
            label: "Enviar email",
            icon: Mail,
            onClick: (row) => alert(`Enviar email a ${row.email}`),
            disabled: (row) => !row.activo, // Deshabilitar si no está activo
        },
        {
            key: "download",
            label: "Descargar",
            icon: Download,
            onClick: (row) => alert(`Descargar datos de ${row.nombre}`),
        },
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

    const CustomActions = ({ row }) => (
        <div className="flex justify-center gap-2">
            <button
                onClick={() => alert(`Ver ${row.nombre}`)}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            >
                <Eye className="w-4 h-4" />
            </button>
            <button
                onClick={() => alert(`Editar ${row.nombre}`)}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
                <Edit className="w-4 h-4" />
            </button>
            <button
                onClick={() =>
                    confirm(`¿Eliminar a ${row.nombre}?`) && alert("Eliminado")
                }
                className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );

    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                    Welcome to Inertia with React!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    Your React frontend is now seamlessly integrated with
                    Laravel.
                </p>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={logoutUser}
                >
                    Logout
                </button>
            </div>
            <div className="p-6">
                <div className="min-h-screen bg-gray-100 p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900  mb-2">
                                Tabla con Dropdown de Acciones
                            </h1>
                            <p className="text-gray-600  mb-8">
                                Usa un array de acciones para generar
                                automáticamente el dropdown
                            </p>

                            <DynamicTable
                                headers={headers}
                                data={data}
                                actions={actions}
                                actionsConfig={{
                                    buttonIcon: MoreVertical,
                                    position: "left",
                                }}
                                enableSorting={true}
                                enableFiltering={true}
                                enablePagination={true}
                                striped={true}
                                hover={true}
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Tabla con Acciones Personalizadas
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Usa un componente personalizado para las
                                acciones
                            </p>

                            <DynamicTable
                                headers={headers}
                                data={data}
                                actions={<CustomActions />}
                                enableSorting={true}
                                enableFiltering={true}
                                enablePagination={true}
                                striped={true}
                                hover={true}
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Dropdown con Icono Horizontal
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Ejemplo con diferente icono y posición
                            </p>

                            <DynamicTable
                                headers={headers}
                                data={data}
                                actions={actions}
                                actionsConfig={{
                                    buttonIcon: MoreHorizontal,
                                    position: "right",
                                }}
                                enableSorting={true}
                                enableFiltering={true}
                                enablePagination={true}
                                striped={true}
                                hover={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
