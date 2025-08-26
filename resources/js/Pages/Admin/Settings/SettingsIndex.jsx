import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

import AdminLayout from "../../../Layouts/AdminLayout/AdminLayout.jsx";

import CompanyForm from "./Components/CompanyForm.jsx";
import UserForm from "./Components/UserForm.jsx";
import TaxesManager from "./Components/TaxesManager.jsx";

import {
    getSettings,
    storeSettings,
    updateUser,
    storeTax,
    changeActiveTax,
} from "../../../Services/settings.js";

export default function SettingsIndex() {
    const { auth } = usePage().props;

    const [company, setCompany] = useState(null);
    const [user, setUser] = useState(null);
    const [taxes, setTaxes] = useState([]);

    const handleCompanySave = async (companyData) => {
        setCompany(companyData);
        console.log("Empresa guardada:", companyData);
        try {
            const response = await storeSettings(companyData);
            console.log("Configuraciones de empresa guardadas en el servidor:", response);
        } catch (error) {
            console.error("Error al guardar configuraciones de empresa:", error);
        }
    };

    const handleUserSave = async (userData) => {
        setUser(userData);
        console.log("Usuario guardado:", userData);
        try {
            const response = await updateUser(userData);
            console.log("Configuraciones de usuario guardadas en el servidor:", response);
        } catch (error) {
            console.error("Error al guardar configuraciones de usuario:", error);
        }
    };

    const handleTaxesSave = async (taxesData) => {
        console.log("Impuestos actualizados:", taxesData);
        try {
            const response = await storeTax(taxesData);
            console.log("Configuraciones de impuestos guardadas en el servidor:", response);
            setTaxes(response);
        } catch (error) {
            console.error("Error al guardar configuraciones de impuestos:", error);
        }
    };

    const fetchData = async () => {
        const response = await getSettings();
        console.log("Configuraciones obtenidas:", response);
        console.log("Configuraciones:", response.settings);
        console.log("Usuario:", response.user);
        console.log("Impuestos:", response.taxes);
        setCompany(response.settings);
        setUser(response.user);
        setTaxes(response.taxes);
    };

    const handleChangeActiveTax = async (id) => {
        try {
            const response = await changeActiveTax(id);
            fetchData();
        } catch (error) {
            console.error("Error al cambiar estado de impuesto:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AdminLayout auth={auth}>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Configuraciones
            </h2>
            <div className="space-y-6">
                <CompanyForm company={company} onSave={handleCompanySave} />

                <UserForm user={user} onSave={handleUserSave} />

                <TaxesManager
                    taxes={taxes}
                    onSave={handleTaxesSave}
                    onActiveChange={handleChangeActiveTax}
                />
            </div>
        </AdminLayout>
    );
}
