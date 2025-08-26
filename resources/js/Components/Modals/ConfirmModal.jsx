import React from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import Modal from "./Modal.jsx";

// Componente para modales de confirmación
const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmar acción",
    message = "¿Estás seguro de que deseas continuar?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    type = "warning",
}) => {
    const icons = {
        warning: <AlertTriangle className="text-yellow-500" size={48} />,
        danger: <AlertCircle className="text-red-500" size={48} />,
        info: <Info className="text-blue-500" size={48} />,
        success: <CheckCircle className="text-green-500" size={48} />,
    };

    const buttonColors = {
        warning: "bg-yellow-500 hover:bg-yellow-600",
        danger: "bg-red-500 hover:bg-red-600",
        info: "bg-blue-500 hover:bg-blue-600",
        success: "bg-green-500 hover:bg-green-600",
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="small"
            closeOnOverlay={false}
        >
            <div className="text-center">
                <div className="flex justify-center mb-4">{icons[type]}</div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 text-white rounded-md ${buttonColors[type]} transition-colors`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
