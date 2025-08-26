import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Save, Edit, Plus, Trash2, Check, X } from "lucide-react";

const TaxesManager = ({
    taxes = [],
    onSave,
    onActiveChange,
}) => {
    console.log('taxes', taxes);

    const [taxesList, setTaxesList] = useState(taxes);
    const [isAdding, setIsAdding] = useState(false);
    const [newTax, setNewTax] = useState({ rate: "", active: false });

    const handleAddTax = () => {
        if (!newTax.rate) return;

        const taxToAdd = {
            id: Date.now(),
            rate: parseFloat(newTax.rate),
            active: newTax.active ? 1 : 0,
            created_at: new Date().toLocaleDateString(),
        };
        
        onSave(taxToAdd);
        setNewTax({ rate: "", active: false });
        setIsAdding(false);
    };

    const handleToggleActive = (id) => {
        const updatedTaxes = taxesList.map((tax) => ({
            ...tax,
            active: tax.id === id ? 1 : 0,
        }));
        setTaxesList(updatedTaxes);
        onSave(updatedTaxes);
    };

    const handleDeleteTax = (id) => {
        const updatedTaxes = taxesList.filter((tax) => tax.id !== id);
        setTaxesList(updatedTaxes);
        onSave(updatedTaxes);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("es-ES", options);
    };

    useEffect(() => {
        setTaxesList(taxes);
    }, [taxes]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Gestión de Impuestos
                </h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    <Plus size={16} />
                    Agregar Impuesto
                </button>
            </div>

            {isAdding && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tasa de Impuesto (%)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={newTax.rate}
                                onChange={(e) =>
                                    setNewTax({
                                        ...newTax,
                                        rate: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            onClick={handleAddTax}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                            <Save size={16} />
                        </button>
                        <button
                            onClick={() => {
                                setIsAdding(false);
                                setNewTax({ rate: "", active: false });
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {taxesList.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No hay impuestos configurados
                    </p>
                ) : (
                    taxesList.map((tax) => (
                        <div
                            key={tax.id}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                                tax.active
                                    ? "bg-green-50 border-green-200"
                                    : "bg-gray-50 border-gray-200"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="font-medium text-gray-800">
                                        {Number(tax.rate).toFixed(2)}%
                                    </span>
                                    {tax.active ? (
                                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                            Inactivo
                                        </span>
                                    )}
                                </div>
                                {tax.created_at && (
                                    <span className="text-sm text-gray-500">
                                        Creado: {formatDate(tax.created_at)}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => onActiveChange(tax.id)}
                                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm transition-colors ${
                                        tax.active
                                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                            : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                                >
                                    <Check size={14} />
                                    {tax.active ? "Desactivar" : "Activar"}
                                </button>
                                <button
                                    onClick={() => handleDeleteTax(tax.id)}
                                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 size={14} />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaxesManager;
