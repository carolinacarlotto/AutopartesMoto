import React, { useState, useEffect } from "react";
import { Plus, FileText, X } from "lucide-react";

import { 
    getProductTechnicalSpecifications,
    storeProductTechnicalSpecification,
    deleteProductTechnicalSpecification
} from "@/Services/products.js";

const ProductTechnicalSpecifications = ({ initialData }) => {
    const productId = initialData.id;
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ key: "", value: "" });
    const [isAdding, setIsAdding] = useState(false);

    const handleAddItem = async () => {
        /*if (newItem.key.trim() && newItem.value.trim()) {
            setItems([
                ...items,
                {
                    id: Date.now(),
                    key: newItem.key.trim(),
                    value: newItem.value.trim(),
                },
            ]);
            setNewItem({ key: "", value: "" });
            setIsAdding(false);
        }*/
        
        if (newItem.key.trim() && newItem.value.trim()) {

            await storeProductTechnicalSpecification(productId, newItem);
            setNewItem({ key: "", value: "" });
            setIsAdding(false);

            await fetchSpecifications();
        }
        
    };

    const handleRemoveItem = async (id) => {
        await deleteProductTechnicalSpecification(id);
        await fetchSpecifications();
    };

    const handleCancel = () => {
        setNewItem({ key: "", value: "" });
        setIsAdding(false);
    };

    const fetchSpecifications = async () => {
        try {
            const data = await getProductTechnicalSpecifications(productId);
            setItems(data);
        } catch (error) {
            console.error("Error fetching product technical specifications:", error);
        }
    };

    useEffect(() => {
        fetchSpecifications();
    }, []);

    return (
        <div className="">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">
                        Especificaciones Técnicas
                    </h1>
                </div>

                {/* Formulario para agregar nuevo item */}
                {!isAdding ? (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Agregar Item
                    </button>
                ) : (
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">
                            Nuevo Item
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={newItem.key}
                                    onChange={(e) =>
                                        setNewItem({
                                            ...newItem,
                                            key: e.target.value,
                                        })
                                    }
                                    placeholder="Ej: Dimensiones, Material, Peso..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    value={newItem.value}
                                    onChange={(e) =>
                                        setNewItem({
                                            ...newItem,
                                            value: e.target.value,
                                        })
                                    }
                                    placeholder="Descripción detallada del item..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddItem}
                                    disabled={
                                        !newItem.key.trim() ||
                                        !newItem.value.trim()
                                    }
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Lista de items */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Especificaciones ({items.length})
                </h2>

                {items.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                            No hay items en la ficha técnica
                        </p>
                        <p className="text-gray-400">
                            Agrega el primer item para comenzar
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Especificación
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Descripción
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {items.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-gray-50"
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.key}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700">
                                                {item.value}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() =>
                                                    handleRemoveItem(item.id)
                                                }
                                                className="text-red-600 hover:text-red-800 transition-colors p-1"
                                                title="Eliminar item"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTechnicalSpecifications;
