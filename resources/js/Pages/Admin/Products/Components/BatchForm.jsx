import React, { useState, useEffect } from "react";
import { Package, Hash, Calendar, DollarSign, Truck, FileText, AlertCircle } from 'lucide-react';


const BatchForm = ({ onSubmit, initialData = null, product = null }) => {
    const [formData, setFormData] = useState({
        product_id: product ? product.id : "",
        //batch_number: "",
        manufacture_date: "",
        expiry_date: "",
        quantity_received: "",
        purchase_price: "",
        //sale_price: "",
        supplier: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }

        // Validate dates
        if (name === "manufacture_date" && formData.expiry_date) {
            if (value > formData.expiry_date) {
                setErrors((prev) => ({
                    ...prev,
                    manufacture_date:
                        "La fecha de fabricación no puede ser posterior a la fecha de vencimiento",
                }));
            }
        }

        if (name === "expiry_date" && formData.manufacture_date) {
            if (value < formData.manufacture_date) {
                setErrors((prev) => ({
                    ...prev,
                    expiry_date:
                        "La fecha de vencimiento no puede ser anterior a la fecha de fabricación",
                }));
            }
        }
    };

    const validateForm = () => {
        const newErrors = {};

        /*if (!formData.batch_number.trim())
            newErrors.batch_number = "El número de lote es requerido";*/
        if (!formData.quantity_received || formData.quantity_received <= 0)
            newErrors.quantity_received = "La cantidad debe ser mayor a 0";
        if (!formData.purchase_price || formData.purchase_price < 0)
            newErrors.purchase_price = "El precio de compra debe ser válido";
        /*if (!formData.sale_price || formData.sale_price < 0)
            newErrors.sale_price = "El precio de venta debe ser válido";*/

        // Date validations only if both dates are provided
        if (formData.manufacture_date && formData.expiry_date) {
            if (formData.manufacture_date > formData.expiry_date) {
                newErrors.manufacture_date =
                    "La fecha de fabricación no puede ser posterior a la fecha de vencimiento";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    // Calculate days until expiry
    const calculateDaysUntilExpiry = () => {
        if (formData.expiry_date) {
            const today = new Date();
            const expiryDate = new Date(formData.expiry_date);
            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return null;
    };

    const daysUntilExpiry = calculateDaysUntilExpiry();

    return (
        <>
            <div className="space-y-6">
                {/* Product Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Package className="inline w-4 h-4 mr-1" />
                        Producto <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="product_name"
                        value={product ? product.name : ""}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Batch Number */}
                {/*<div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Hash className="inline w-4 h-4 mr-1" />
                        Número de Lote <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="batch_number"
                        value={formData.batch_number}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.batch_number
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Ej: BATCH-2024-001"
                    />
                    {errors.batch_number && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.batch_number}
                        </p>
                    )}
                </div>*/}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Calendar className="inline w-4 h-4 mr-1" />
                            Fecha de Fabricación
                        </label>
                        <input
                            type="date"
                            name="manufacture_date"
                            value={formData.manufacture_date}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.manufacture_date
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.manufacture_date && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.manufacture_date}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Calendar className="inline w-4 h-4 mr-1" />
                            Fecha de Vencimiento
                        </label>
                        <input
                            type="date"
                            name="expiry_date"
                            value={formData.expiry_date}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.expiry_date
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.expiry_date && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.expiry_date}
                            </p>
                        )}
                    </div>
                </div>

                {/* Expiry Alert */}
                {daysUntilExpiry !== null && (
                    <div
                        className={`rounded-md p-3 ${
                            daysUntilExpiry <= 30
                                ? "bg-red-50 border border-red-200"
                                : daysUntilExpiry <= 90
                                ? "bg-yellow-50 border border-yellow-200"
                                : "bg-green-50 border border-green-200"
                        }`}
                    >
                        <p
                            className={`text-sm flex items-center gap-2 ${
                                daysUntilExpiry <= 30
                                    ? "text-red-800"
                                    : daysUntilExpiry <= 90
                                    ? "text-yellow-800"
                                    : "text-green-800"
                            }`}
                        >
                            <AlertCircle size={16} />
                            {daysUntilExpiry > 0
                                ? `Este lote vencerá en ${daysUntilExpiry} días`
                                : "Este lote ya ha vencido"}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cantidad Recibida{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="quantity_received"
                            value={formData.quantity_received}
                            onChange={handleChange}
                            min="1"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.quantity_received
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="0"
                        />
                        {errors.quantity_received && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.quantity_received}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <DollarSign className="inline w-4 h-4 mr-1" />
                            Precio de Compra <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                $
                            </span>
                            <input
                                type="number"
                                name="purchase_price"
                                value={formData.purchase_price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.purchase_price
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.purchase_price && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.purchase_price}
                            </p>
                        )}
                    </div>
                </div>

                {/* Prices */}
                {/*<div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <DollarSign className="inline w-4 h-4 mr-1" />
                            Precio de Compra{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                $
                            </span>
                            <input
                                type="number"
                                name="purchase_price"
                                value={formData.purchase_price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.purchase_price
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.purchase_price && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.purchase_price}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <DollarSign className="inline w-4 h-4 mr-1" />
                            Precio de Venta{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                $
                            </span>
                            <input
                                type="number"
                                name="sale_price"
                                value={formData.sale_price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.sale_price
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="0.00"
                            />
                        </div>
                        {errors.sale_price && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.sale_price}
                            </p>
                        )}
                    </div>
                </div>*/}

                {/* Profit Margin */}
                {formData.purchase_price && formData.sale_price && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-sm text-blue-800">
                            Margen de ganancia: $
                            {(
                                formData.sale_price - formData.purchase_price
                            ).toFixed(2)}
                            (
                            {(
                                ((formData.sale_price -
                                    formData.purchase_price) /
                                    formData.purchase_price) *
                                100
                            ).toFixed(2)}
                            %)
                        </p>
                    </div>
                )}

                {/* Supplier */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Truck className="inline w-4 h-4 mr-1" />
                        Proveedor
                    </label>
                    <input
                        type="text"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Distribuidora ABC"
                    />
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FileText className="inline w-4 h-4 mr-1" />
                        Notas
                    </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Información adicional sobre este lote..."
                    />
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                    <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                product_id: "",
                                //batch_number: "",
                                manufacture_date: "",
                                expiry_date: "",
                                quantity_received: "",
                                purchase_price: "",
                                sale_price: "",
                                supplier: "",
                                notes: "",
                            })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Limpiar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Guardar Lote
                    </button>
                </div>
            </div>
        </>
    );
};

export default BatchForm;
