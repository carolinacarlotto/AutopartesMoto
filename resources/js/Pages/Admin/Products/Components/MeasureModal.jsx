import React, { useState } from "react";
import Modal from '../../../../Components/Modals/Modal.jsx';

const MeasureModal = ({ isOpen, onClose, onSave }) => {
    const [measureName, setMeasureName] = useState("");
    const [measureDescription, setMeasureDescription] = useState("");

    const handleSave = () => {
        if (measureName.trim()) {
            onSave({
                id: Date.now(), // Simple ID generation
                name: measureName,
                description: measureDescription,
            });
            setMeasureName("");
            setMeasureDescription("");
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nueva Medida"
            size="small"
            closeOnOverlay={false}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de la medida{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={measureName}
                        onChange={(e) => setMeasureName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: unidad"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        value={measureDescription}
                        onChange={(e) => setMeasureDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descripción opcional de la categoría"
                    />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!measureName.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        Guardar Medida
                    </button>
                </div>
            </div>
        </Modal>
    );
};
export default MeasureModal;