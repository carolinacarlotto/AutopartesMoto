import React, { useState, useEffect } from "react";
import {
    Search,
    ShoppingCart,
    Plus,
    Minus,
    X,
    User,
    UserPlus,
    Package,
    DollarSign,
    Trash2,
    Check,
    AlertCircle,
    Building,
} from "lucide-react";

// Customer Form Component
const CustomerForm = ({ onSave, onCancel }) => {
    const [customerType, setCustomerType] = useState("individual"); // 'individual' or 'business'
    const [customerData, setCustomerData] = useState({
        type: "individual",
        name: "",
        email: "",
        phone: "",
        address: "",
        documentType: "dni",
        document: "",
        companyName: "",
        contactName: "",
    });
    const [errors, setErrors] = useState({});

    const handleTypeChange = (type) => {
        setCustomerType(type);
        setCustomerData((prev) => ({
            ...prev,
            type,
            documentType: type === "business" ? "ruc" : "dni",
            document: "",
        }));
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (customerType === "individual") {
            if (!customerData.name.trim())
                newErrors.name = "El nombre es requerido";
        } else {
            if (!customerData.companyName.trim())
                newErrors.companyName = "La razón social es requerida";
            if (!customerData.contactName.trim())
                newErrors.contactName = "El nombre de contacto es requerido";
        }

        if (!customerData.document.trim()) {
            newErrors.document = "El documento es requerido";
        } else {
            // Validate document format based on type
            if (
                customerData.documentType === "dni" &&
                customerData.document.length !== 8
            ) {
                newErrors.document = "El DNI debe tener 8 dígitos";
            } else if (
                customerData.documentType === "ruc" &&
                customerData.document.length !== 11
            ) {
                newErrors.document = "El RUC debe tener 11 dígitos";
            } else if (
                customerData.documentType === "passport" &&
                customerData.document.length < 6
            ) {
                newErrors.document =
                    "El pasaporte debe tener al menos 6 caracteres";
            }
        }

        /*if (!customerData.phone.trim())
            newErrors.phone = "El teléfono es requerido";*/

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            const saveData = {
                /*...customerData,
                id: Date.now(),*/
                name:
                    customerType === "individual"
                        ? customerData.name
                        : customerData.companyName,
                type: customerData.type,
                email: customerData.email,
                phone: customerData.phone,
                address: customerData.address,
                document_type: customerData.documentType,
                document_number: customerData.document,
                company_name:
                    customerType === "business"
                        ? customerData.companyName
                        : null,
                contact_name:
                    customerType === "business"
                        ? customerData.contactName
                        : null,
            };
            onSave(saveData);
        }
    };

    const getDocumentLabel = () => {
        switch (customerData.documentType) {
            case "dni":
                return "DNI";
            case "passport":
                return "Pasaporte";
            case "ruc":
                return "RUC";
            default:
                return "Documento";
        }
    };

    const getDocumentPlaceholder = () => {
        switch (customerData.documentType) {
            case "dni":
                return "12345678";
            case "passport":
                return "AB123456";
            case "ruc":
                return "20123456789";
            default:
                return "";
        }
    };

    return (
        <div className="space-y-4">
            {/* Customer Type Selector */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => handleTypeChange("individual")}
                    className={`flex-1 py-2 px-4 rounded-md border-2 transition-all ${
                        customerType === "individual"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                    <User className="inline mr-2" size={16} />
                    Persona Natural
                </button>
                <button
                    onClick={() => handleTypeChange("business")}
                    className={`flex-1 py-2 px-4 rounded-md border-2 transition-all ${
                        customerType === "business"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                    <Building className="inline mr-2" size={16} />
                    Empresa
                </button>
            </div>

            {customerType === "individual" ? (
                <>
                    {/* Person Fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre Completo{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={customerData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="Ej: Juan Pérez García"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.name}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/* Company Fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Razón Social <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={customerData.companyName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.companyName
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="Ej: Empresa ABC S.A.C."
                        />
                        {errors.companyName && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.companyName}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de Contacto{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="contactName"
                            value={customerData.contactName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.contactName
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="Ej: María García"
                        />
                        {errors.contactName && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.contactName}
                            </p>
                        )}
                    </div>
                </>
            )}

            {/* Document Type and Number */}
            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Documento
                    </label>
                    <select
                        name="documentType"
                        value={customerData.documentType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={customerType === "business"} // Disable for business type
                    >
                        {customerType === "individual" ? (
                            <>
                                <option value="dni">DNI</option>
                                <option value="passport">Pasaporte</option>
                                <option value="ruc">RUC</option>
                            </>
                        ) : (
                            <option value="ruc">RUC</option>
                        )}
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {getDocumentLabel()}{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="document"
                        value={customerData.document}
                        onChange={handleChange}
                        maxLength={
                            customerData.documentType === "ruc"
                                ? 11
                                : customerData.documentType === "dni"
                                ? 8
                                : 20
                        }
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.document
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder={getDocumentPlaceholder()}
                    />
                    {errors.document && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.document}
                        </p>
                    )}
                </div>
            </div>

            {/* Common Fields */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono {/*<span className="text-red-500">*</span>*/}
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ej: +51 999 999 999"
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="correo@ejemplo.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                </label>
                <textarea
                    name="address"
                    value={customerData.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Dirección completa"
                />
            </div>

            <div className="flex gap-3 justify-end pt-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    Guardar Cliente
                </button>
            </div>
        </div>
    );
};

export default CustomerForm;