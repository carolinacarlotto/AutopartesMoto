import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

// Componente individual de notificación
const Notify = ({ notification, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        // Animación de entrada
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Auto-dismiss después del tiempo especificado
        if (notification.duration > 0) {
            const timer = setTimeout(() => {
                handleRemove();
            }, notification.duration);
            return () => clearTimeout(timer);
        }
    }, [notification.duration]);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => {
            onRemove(notification.id);
        }, 300);
    };

    const getIcon = () => {
        switch (notification.type) {
            case "success":
                return <CheckCircle className="w-5 h-5" />;
            case "error":
                return <AlertCircle className="w-5 h-5" />;
            case "warning":
                return <AlertTriangle className="w-5 h-5" />;
            case "info":
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getStyles = () => {
        const baseStyles =
            "flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out min-w-80 max-w-md";

        switch (notification.type) {
            case "success":
                return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
            case "error":
                return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
            case "warning":
                return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
            case "info":
            default:
                return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
        }
    };

    const getIconColor = () => {
        switch (notification.type) {
            case "success":
                return "text-green-500";
            case "error":
                return "text-red-500";
            case "warning":
                return "text-yellow-500";
            case "info":
            default:
                return "text-blue-500";
        }
    };

    return (
        <div
            className={`
        ${getStyles()}
        transform transition-all duration-300 ease-in-out
        ${
            isVisible && !isRemoving
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
        }
        ${isRemoving ? "scale-95" : "scale-100"}
      `}
        >
            <div className={`${getIconColor()} flex-shrink-0`}>{getIcon()}</div>

            <div className="flex-1 min-w-0">
                {notification.title && (
                    <h4 className="text-sm font-semibold mb-1">
                        {notification.title}
                    </h4>
                )}
                <p className="text-sm opacity-90">{notification.message}</p>
            </div>

            <button
                onClick={handleRemove}
                className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors duration-200"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Notify;