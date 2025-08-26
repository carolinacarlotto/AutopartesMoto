import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, Edit, Plus, Trash2, Check, X } from 'lucide-react';

const CompanyForm = ({ company, onSave }) => {
    console.log("CompanyForm mounted", company);
    const [formData, setFormData] = useState({
        company_name: company?.company_name || "",
        company_ruc: company?.company_ruc || "",
        phone: company?.phone || "",
        email: company?.email || "",
        web: company?.web || "",
        address: company?.address || "",
    });

    const [isEditing, setIsEditing] = useState(!company);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        onSave(formData);
        setIsEditing(false);
    };

    useEffect(() => {
        if (company) {
            setFormData({
                company_name: company.company_name || "",
                company_ruc: company.company_ruc || "",
                phone: company.phone || "",
                email: company.email || "",
                web: company.web || "",
                address: company.address || "",
            });
        }
    }, [company]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Información de Empresa
                </h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        <Edit size={16} />
                        Editar
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de la Empresa
                        </label>
                        <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            RUC
                        </label>
                        <input
                            type="text"
                            name="company_ruc"
                            value={formData.company_ruc}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sitio Web
                        </label>
                        <input
                            type="url"
                            name="web"
                            value={formData.web}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://ejemplo.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ingrese la dirección completa"
                            required
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                            <Save size={16} />
                            Guardar
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                        >
                            <X size={16} />
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            Empresa:
                        </span>
                        <p className="text-gray-800">{formData.company_name}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            RUC:
                        </span>
                        <p className="text-gray-800">{formData.company_ruc}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            Teléfono:
                        </span>
                        <p className="text-gray-800">{formData.phone}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            Email:
                        </span>
                        <p className="text-gray-800">{formData.email}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            Web:
                        </span>
                        <p className="text-gray-800">
                            {formData.web || "No especificado"}
                        </p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            Dirección:
                        </span>
                        <p className="text-gray-800 whitespace-pre-wrap">
                            {formData.address || "No especificado"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyForm;