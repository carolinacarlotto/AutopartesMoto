import React, { useState, useEffect } from "react";
import { X, AlertTriangle, Package, TrendingDown } from "lucide-react";
import { getProductsLowStock } from "@/Services/products.js";

const NotificationSystem = () => {
    const [notifications, setNotifications] = useState([]);

    const [products, setProducts] = useState([]);

    const fetchLowStockProducts = async () => {
        try {
            const lowStockProducts = await getProductsLowStock();
            setProducts(lowStockProducts);
        } catch (error) {
            console.error(
                "There was an error fetching low stock products!",
                error
            );
        }
    };
    
    useEffect(() => {
        fetchLowStockProducts();
    }, [])

    useEffect(() => {
        // Generate notifications based on stock levels
        generateStockNotifications();
    }, [products]);

    useEffect(() => {
        notifications.forEach((notification) => {
            if (notification.duration) {
                setTimeout(() => {
                    removeNotification(notification.id);
                }, notification.duration);
            }
        });
    }, [notifications]);

    // Función para generar notificaciones basadas en el stock
    const generateStockNotifications = () => {
        const newNotifications = [];

        products.forEach((product) => {
            if (product.stock <= product.minimum_stock) {
                const notification = {
                    id: `stock-${product.id}-${Date.now()}`,
                    type: product.stock === 0 ? "error" : "warning",
                    title:
                        product.stock === 0
                            ? "Producto Agotado"
                            : "Stock Mínimo Alcanzado",
                    message: `${product.name} ${
                        product.stock === 0
                            ? "está agotado"
                            : `tiene solo ${product.stock} unidades disponibles`
                    }`,
                    product: product,
                    timestamp: new Date(),
                    duration: 4000,
                };
                newNotifications.push(notification);
            }
        });
        
        setNotifications((prev) => [...prev, ...newNotifications]);
    };

    const removeNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== id)
        );
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case "warning":
                return <AlertTriangle className="w-5 h-5" />;
            case "error":
                return <Package className="w-5 h-5" />;
            case "success":
                return <TrendingDown className="w-5 h-5 rotate-180" />;
            case "info":
                return <Package className="w-5 h-5" />;
            default:
                return <AlertTriangle className="w-5 h-5" />;
        }
    };

    const getNotificationStyles = (type) => {
        const baseStyles = "transform transition-all duration-300 ease-in-out";

        switch (type) {
            case "warning":
                return `${baseStyles} bg-yellow-50 border-l-4 border-yellow-400 shadow-lg`;
            case "error":
                return `${baseStyles} bg-red-50 border-l-4 border-red-500 shadow-lg`;
            case "success":
                return `${baseStyles} bg-green-50 border-l-4 border-green-500 shadow-lg`;
            case "info":
                return `${baseStyles} bg-blue-50 border-l-4 border-blue-500 shadow-lg`;
            default:
                return `${baseStyles} bg-gray-50 border-l-4 border-gray-400 shadow-lg`;
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case "warning":
                return "text-yellow-600";
            case "error":
                return "text-red-600";
            case "success":
                return "text-green-600";
            case "info":
                return "text-blue-600";
            default:
                return "text-gray-600";
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
    <div>
            {/* Container de notificaciones - posición fija */}
            <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
                {notifications.map((notification, index) => (
                    <div
                        key={notification.id}
                        className={`${getNotificationStyles(
                            notification.type
                        )} p-4 rounded-lg max-w-sm animate-slide-in-right`}
                        style={{
                            animationDelay: `${index * 100}ms`,
                            marginBottom: "12px",
                        }}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                                <div
                                    className={`${getIconColor(
                                        notification.type
                                    )} mt-0.5`}
                                >
                                    {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-sm">
                                        {notification.title}
                                    </h4>
                                    <p className="text-gray-700 text-sm mt-1">
                                        {notification.message}
                                    </p>
                                    {notification.product && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            Stock disponible:{" "}
                                            {notification.product.stock}{" "}
                                            unidades
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-400 mt-2">
                                        {formatTime(notification.timestamp)}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    removeNotification(notification.id)
                                }
                                className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style >{`
                @keyframes slide-in-right {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out forwards;
                }
            `}</style>
        
    </div>);
};

export default NotificationSystem;
