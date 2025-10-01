import React, { useState, useEffect } from "react";
import {
    Package,
    TrendingUp,
    TrendingDown,
    Calendar,
    DollarSign,
    Printer,
    Filter,
    Download,
    Eye,
    Hash,
    Truck,
    AlertCircle,
    FileText,
} from "lucide-react";
import * as XLSX from "xlsx";

const Inventory = ({ _movements, product = null }) => {
    const [movements, setMovements] = useState(_movements || []);
    const [filterType, setFilterType] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState("all");
    const [selectedBatch, setSelectedBatch] = useState("all");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [showPrintPreview, setShowPrintPreview] = useState(false);

    // Get unique products
    const uniqueProducts = [...new Set(movements.map((m) => m.product.id))].map(
        (id) => {
            const product = movements.find((m) => m.product.id === id).product;
            return { id, name: product.name, code: product.code };
        }
    );

    // Get unique batches
    const uniqueBatches = [
        ...new Set(movements.map((m) => m.product_batch.batch_number)),
    ];

    // Filter movements
    const filteredMovements = movements.filter((movement) => {
        if (filterType !== "all" && movement.type !== filterType) return false;
        if (
            selectedProduct !== "all" &&
            movement.product.id !== parseInt(selectedProduct)
        )
            return false;
        if (
            selectedBatch !== "all" &&
            movement.product_batch.batch_number !== selectedBatch
        )
            return false;

        if (dateRange.start) {
            const movementDate = new Date(movement.movement_date);
            const startDate = new Date(dateRange.start);
            if (movementDate < startDate) return false;
        }

        if (dateRange.end) {
            const movementDate = new Date(movement.movement_date);
            const endDate = new Date(dateRange.end);
            endDate.setHours(23, 59, 59);
            if (movementDate > endDate) return false;
        }

        return true;
    });

    // Calculate statistics
    const stats = {
        totalIncome: filteredMovements
            .filter((m) => m.type === "income")
            .reduce((acc, m) => acc + m.quantity, 0),
        totalSales: filteredMovements
            .filter((m) => m.type === "sales")
            .reduce((acc, m) => acc + m.quantity, 0),
        totalIncomeValue: filteredMovements
            .filter((m) => m.type === "income")
            .reduce(
                (acc, m) => acc + m.quantity * parseFloat(m.purchase_price),
                0
            ),
        totalSalesValue: filteredMovements
            .filter((m) => m.type === "sales")
            .reduce((acc, m) => acc + m.quantity * parseFloat(m.unit_price), 0),
        totalProfit: filteredMovements
            .filter((m) => m.type === "sales")
            .reduce(
                (acc, m) =>
                    acc +
                    m.quantity *
                        (parseFloat(m.unit_price) -
                            parseFloat(m.purchase_price)),
                0
            ),
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (amount) => {
        return `s/.${parseFloat(amount).toFixed(2)}`;
    };

    const formatCurrency2 = (amount) => {
        return parseFloat(amount).toFixed(2);
    };

    const handlePrint = () => {
        window.print();
    };

    const exportToExcel = () => { 
        const headers = [
            "Fecha",
            "Tipo",
            "Producto",
            "Código",
            "Lote",
            "Cantidad",
            "Precio Compra",
            "Precio Venta",
            "Total",
        ];
        const rows = filteredMovements.map((m) => [
            formatDate(m.movement_date),
            m.type === "income" ? "Ingreso" : "Venta",
            m.product.name,
            m.product.code,
            m.product_batch.batch_number,
            m.quantity,
            Number(formatCurrency2(m.purchase_price)),
            m.type === "sales" ? Number(formatCurrency2(m.unit_price)) : "-",
            m.type === "sales"
                ? Number(formatCurrency2(m.quantity * parseFloat(m.unit_price)))
                : Number(
                      formatCurrency2(m.quantity * parseFloat(m.purchase_price))
                  ),
        ]);

        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Movimientos");
        XLSX.writeFile(workbook, `inventario_${new Date().toISOString().split("T")[0]}.xlsx`);
    }

    const exportToCSV = () => {
        const headers = [
            "Fecha",
            "Tipo",
            "Producto",
            "Código",
            "Lote",
            "Cantidad",
            "Precio Compra",
            "Precio Venta",
            "Total",
        ];
        const rows = filteredMovements.map((m) => [
            formatDate(m.movement_date),
            m.type === "income" ? "Ingreso" : "Venta",
            m.product.name,
            m.product.code,
            m.product_batch.batch_number,
            m.quantity,
            formatCurrency2(m.purchase_price),
            m.type === "sales" ? formatCurrency2(m.unit_price) : "-",
            m.type === "sales"
                ? formatCurrency2(m.quantity * parseFloat(m.unit_price))
                : formatCurrency2(m.quantity * parseFloat(m.purchase_price)),
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `inventario_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <style>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    .print-only {
                        display: block !important;
                    }
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    .page-break {
                        page-break-after: always;
                    }
                }
                .print-only {
                    display: none;
                }
            `}</style>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {product ? product.name : "General"} - Control de
                                Inventario
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Movimientos de productos y lotes
                            </p>
                        </div>
                        <div className="flex gap-3 no-print">
                            <button
                                onClick={exportToExcel}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                            >
                                <Download size={20} />
                                Exportar CSV
                            </button>
                            {/*<button
                                onClick={handlePrint}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                            >
                                <Printer size={20} />
                                Imprimir
                            </button>*/}
                        </div>
                    </div>

                    {/* Print Header */}
                    <div className="print-only text-center mb-4">
                        <h1 className="text-2xl font-bold">
                            Reporte de Inventario
                        </h1>
                        <p className="text-gray-600">
                            Fecha de impresión:{" "}
                            {new Date().toLocaleDateString("es-ES")}
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Ingresos
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.totalIncome}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatCurrency(stats.totalIncomeValue)}
                                </p>
                            </div>
                            <TrendingUp className="text-green-500" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Ventas</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {stats.totalSales}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatCurrency(stats.totalSalesValue)}
                                </p>
                            </div>
                            <TrendingDown className="text-red-500" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Stock Actual
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.totalIncome - stats.totalSales}
                                </p>
                                <p className="text-sm text-gray-500">
                                    unidades
                                </p>
                            </div>
                            <Package className="text-blue-500" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Ganancia Bruta
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {formatCurrency(stats.totalProfit)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    en ventas
                                </p>
                            </div>
                            <DollarSign className="text-purple-500" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Movimientos
                                </p>
                                <p className="text-2xl font-bold text-gray-700">
                                    {filteredMovements.length}
                                </p>
                                <p className="text-sm text-gray-500">
                                    registros
                                </p>
                            </div>
                            <FileText className="text-gray-500" size={32} />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 no-print">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Filter size={20} />
                        Filtros
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo
                            </label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Todos</option>
                                <option value="income">Ingresos</option>
                                <option value="sales">Ventas</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lote
                            </label>
                            <select
                                value={selectedBatch}
                                onChange={(e) =>
                                    setSelectedBatch(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">Todos</option>
                                {uniqueBatches.map((batch) => (
                                    <option key={batch} value={batch}>
                                        Lote {batch}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Desde
                            </label>
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) =>
                                    setDateRange({
                                        ...dateRange,
                                        start: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hasta
                            </label>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) =>
                                    setDateRange({
                                        ...dateRange,
                                        end: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Movements Table */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold">
                            Movimientos de Inventario
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tipo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Producto
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lote
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cantidad
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        P. Compra
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        P. Venta
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMovements.map((movement) => (
                                    <tr
                                        key={movement.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(movement.movement_date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    movement.type === "income"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {movement.type === "income" ? (
                                                    <>
                                                        <TrendingUp size={12} />
                                                        Ingreso
                                                    </>
                                                ) : (
                                                    <>
                                                        <TrendingDown
                                                            size={12}
                                                        />
                                                        Venta
                                                    </>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {movement.product.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Código:{" "}
                                                    {movement.product.code}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1 text-sm text-gray-900">
                                                <Hash size={14} />
                                                {
                                                    movement.product_batch
                                                        .batch_number
                                                }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                            {movement.type === "income"
                                                ? "+"
                                                : "-"}
                                            {movement.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                            {formatCurrency(
                                                movement.purchase_price
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                            {movement.type === "sales"
                                                ? formatCurrency(
                                                      movement.unit_price
                                                  )
                                                : "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {movement.type === "sales" ? (
                                                <span className="text-green-600">
                                                    {formatCurrency(
                                                        movement.quantity *
                                                            parseFloat(
                                                                movement.unit_price
                                                            )
                                                    )}
                                                </span>
                                            ) : (
                                                <span className="text-red-600">
                                                    {formatCurrency(
                                                        movement.quantity *
                                                            parseFloat(
                                                                movement.purchase_price
                                                            )
                                                    )}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-50 font-semibold">
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-4 text-right"
                                    >
                                        Totales:
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        +{stats.totalIncome} / -
                                        {stats.totalSales}
                                    </td>
                                    <td
                                        colSpan="2"
                                        className="px-6 py-4 text-right"
                                    >
                                        Ganancia:
                                    </td>
                                    <td className="px-6 py-4 text-right text-green-600">
                                        {formatCurrency(stats.totalProfit)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Stock Alert */}
                {uniqueProducts.map((product) => {
                    const productMovements = movements.filter(
                        (m) => m.product.id === product.id
                    );
                    const currentStock =
                        productMovements
                            .filter((m) => m.type === "income")
                            .reduce((acc, m) => acc + m.quantity, 0) -
                        productMovements
                            .filter((m) => m.type === "sales")
                            .reduce((acc, m) => acc + m.quantity, 0);
                    const minimumStock =
                        productMovements[0]?.product.minimum_stock || 0;

                    if (currentStock <= minimumStock) {
                        return (
                            <div
                                key={product.id}
                                className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 no-print"
                            >
                                <div className="flex items-center gap-2">
                                    <AlertCircle
                                        className="text-yellow-600"
                                        size={20}
                                    />
                                    <p className="text-sm text-yellow-800">
                                        <strong>{product.name}</strong> tiene
                                        stock bajo: {currentStock} unidades
                                        (mínimo requerido: {minimumStock})
                                    </p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Inventory;
