import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = "medium",
    showCloseButton = true,
    closeOnOverlay = true,
    className = "",
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        small: "max-w-sm",
        medium: "max-w-lg",
        large: "max-w-2xl",
        xlarge: "max-w-4xl",
        full: "w-full h-full",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                onClick={closeOnOverlay ? onClose : undefined}
            />
            <div
                className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className} transform transition-all`}
            >
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
                {title && (
                    <div className="border-b px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h2>
                    </div>
                )}
                <div className="px-6 py-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
