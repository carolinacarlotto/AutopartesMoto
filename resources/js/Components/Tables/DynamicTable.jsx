import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical, MoreHorizontal, Ellipsis } from 'lucide-react';
import ActionsDropdown from '../Actions/ActionsDropdown.jsx';
import Pagination from '../Paginations/Pagination.jsx';

// Dynamic Table component
const DynamicTable = ({
    headers = [],
    data = [],
    actions = null, // Array de acciones o componente personalizado
    actionsConfig = {}, // Configuración para el dropdown de acciones
    enableSorting = true,
    enablePagination = true,
    striped = true,
    hover = true,
    compact = false,
    className = "",
    itemsPerPageOptions = [5, 10, 25, 50],
    itemsPerPage = 10,
    page = 1,
    lastPage = 1,
    total = 0,
    onChangeItemsPerPage = null,
    onChangePage = null,
    searchable = false,
    search = "",
    searchPlaceholder = "Buscar...",
    onChangeSearch = null,
}) => {
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    //const [filterValue, setFilterValue] = useState("");
    //const [currentPage, setCurrentPage] = useState(1);
    //const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

    // Función para ordenar datos
    const handleSort = (key) => {
        if (!enableSorting) return;

        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // Función para filtrar datos
    /*const filteredData = (data || []).filter((row) => {
        if (!filterValue) return true;

        return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filterValue.toLowerCase())
        );
    });*/

    // Función para ordenar datos filtrados
    /*const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });*/

    // Paginación
    //const totalPages = Math.max(Math.ceil(sortedData.length / itemsPerPage), 1);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, total);
    /*const paginatedData = enablePagination
        ? data.slice(startIndex, endIndex)
        : data;*/

    // Renderizar icono de ordenamiento
    const renderSortIcon = (columnKey) => {
        if (!enableSorting) return null;

        if (sortConfig.key === columnKey) {
            return sortConfig.direction === "asc" ? (
                <ChevronUp className="w-4 h-4 ml-1 inline" />
            ) : (
                <ChevronDown className="w-4 h-4 ml-1 inline" />
            );
        }
        return <ChevronDown className="w-4 h-4 ml-1 inline opacity-30" />;
    };

    // Handlers para paginación
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (items) => {
        setItemsPerPage(items);
        setCurrentPage(1);
    };

    // Determinar si mostrar columna de acciones
    const showActions =
        actions && (Array.isArray(actions) || React.isValidElement(actions));

    return (
        <div className={`w-full ${className}`}>
            {/* Barra de búsqueda */}
            {searchable && (
                <div className="mb-4 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => {
                            onChangeSearch && onChangeSearch(e.target.value);
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 "
                    />
                </div>
            )}

            {/* Tabla */}
            <div className="shadow-sm rounded-lg">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50 ">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    onClick={() => handleSort(header.key)}
                                    className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${
                        enableSorting
                            ? "cursor-pointer hover:bg-gray-100 transition-colors"
                            : ""
                    }
                    ${compact ? "py-2" : "py-3"}
                  `}
                                >
                                    <div className="flex items-center">
                                        {header.label}
                                        {renderSortIcon(header.key)}
                                    </div>
                                </th>
                            ))}
                            {showActions && (
                                <th
                                    className={`px-6 ${
                                        compact ? "py-2" : "py-3"
                                    } text-center text-xs font-medium text-gray-500 uppercase tracking-wider`}
                                >
                                    Acciones
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={
                                        headers.length + (showActions ? 1 : 0)
                                    }
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No se encontraron datos
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`
                    ${striped && rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    ${hover ? "hover:bg-gray-100 transition-colors" : ""}
                    ${compact ? "py-2" : "py-4"}
                  `}
                                >
                                    {headers.map((header, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`
                        px-6 text-sm text-gray-900
                        ${compact ? "py-2" : "py-4"}
                      `}
                                        >
                                            {header.render
                                                ? header.render(
                                                      row[header.key],
                                                      row
                                                  )
                                                : row[header.key] ?? "-"}
                                        </td>
                                    ))}
                                    {showActions && (
                                        <td
                                            className={`px-6 ${
                                                compact ? "py-2" : "py-4"
                                            } text-center relative`}
                                        >
                                            {React.isValidElement(actions) ? (
                                                // Componente personalizado
                                                React.cloneElement(actions, {
                                                    row,
                                                })
                                            ) : (
                                                // Array de acciones - usar ActionsDropdown
                                                <ActionsDropdown
                                                    actions={actions}
                                                    row={row}
                                                    {...actionsConfig}
                                                />
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {enablePagination && (
                <div className="mt-4">
                    <Pagination
                        currentPage={page}
                        totalPages={lastPage || 1}
                        totalItems={total}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={
                            onChangeItemsPerPage || handleItemsPerPageChange
                        }
                        onPageChange={onChangePage || handlePageChange}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        itemsPerPageOptions={itemsPerPageOptions}
                    />
                </div>
            )}
        </div>
    );
};

export default DynamicTable;