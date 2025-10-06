import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Package,
    Tag,
    Calendar,
    Users,
    DollarSign,
    Warehouse,
    AlertTriangle,
    Star,
} from "lucide-react";

const ProductSheet = ({ product }) => {
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.multimedia.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.multimedia.length - 1 : prev - 1
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatPrice = (price) => {
        return `S/ ${parseFloat(price).toFixed(2)}`;
    };

    const getStockStatus = () => {
        if (product.stock <= product.minimum_stock) {
            return {
                status: "low",
                color: "text-red-600",
                bgColor: "bg-red-100",
                text: "Stock Bajo",
            };
        } else if (product.stock <= product.minimum_stock * 2) {
            return {
                status: "medium",
                color: "text-yellow-600",
                bgColor: "bg-yellow-100",
                text: "Stock Medio",
            };
        }
        return {
            status: "good",
            color: "text-green-600",
            bgColor: "bg-green-100",
            text: "Stock Disponible",
        };
    };

    const stockStatus = getStockStatus();

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white">
            {/* Header */}
            <div className="mb-8 border-b pb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1">
                                <Tag className="w-4 h-4" />
                                Código: {product.code}
                            </span>
                            <span className="flex items-center gap-1">
                                <Package className="w-4 h-4" />
                                {product.category?.name || "Sin categoría"}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                            {formatPrice(product.price_sale)}
                        </div>
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${stockStatus.bgColor} ${stockStatus.color}`}
                        >
                            {product.stock <= product.minimum_stock && (
                                <AlertTriangle className="w-4 h-4" />
                            )}
                            <Warehouse className="w-4 h-4" />
                            {stockStatus.text} ({product.stock} unidades)
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Carousel de imágenes */}
                <div className="space-y-4">
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                        {product.multimedia && product.multimedia.length > 0 ? (
                            <>
                                <img
                                    src={
                                        product.multimedia[currentImageIndex]
                                            .complete_file_path
                                    }
                                    alt={
                                        product.multimedia[currentImageIndex]
                                            .name
                                    }
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src =
                                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTUwSDE1MFYxNzVIMTc1VjE1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+";
                                    }}
                                />

                                {/* Controles del carousel */}
                                {product.multimedia.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                                        >
                                            <ChevronRight className="w-6 h-6 text-gray-700" />
                                        </button>

                                        {/* Indicadores */}
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                            {product.multimedia.map(
                                                (_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            setCurrentImageIndex(
                                                                index
                                                            )
                                                        }
                                                        className={`w-3 h-3 rounded-full transition-all ${
                                                            index ===
                                                            currentImageIndex
                                                                ? "bg-white"
                                                                : "bg-white bg-opacity-50"
                                                        }`}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <Package className="w-16 h-16 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Miniaturas */}
                    {product.multimedia && product.multimedia.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {product.multimedia.map((media, index) => (
                                <button
                                    key={media.id}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        index === currentImageIndex
                                            ? "border-blue-500"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <img
                                        src={media.complete_file_path}
                                        alt={media.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src =
                                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNyAxNUgxNVYxN0gxN1YxNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Información del producto */}
                <div className="space-y-6">
                    {/* Información básica */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Información General
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    ID del Producto
                                </label>
                                <p className="text-gray-900 font-medium">
                                    #{product.id}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Categoría
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {product.category?.name || "Sin categoría"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Marca
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {product.brand_name || "Sin marca"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Medida
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {product.measure_name || "Sin medida"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Stock Actual
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {product.stock} unidades
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Stock Mínimo
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {product.minimum_stock} unidades
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Precio de Venta
                                </label>
                                <p className="text-gray-900 font-medium text-lg">
                                    {formatPrice(product.price_sale)}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Precio Base
                                </label>
                                <p className="text-gray-900 font-medium">
                                    {formatPrice(product.price)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Especificaciones técnicas */}
                    {product.technical_specifications &&
                        product.technical_specifications.length > 0 && (
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-blue-600" />
                                    Especificaciones Técnicas
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                                    {product.technical_specifications.map(
                                        (spec) => (
                                            <div
                                                key={spec.id}
                                                className="bg-white rounded-lg p-2 border border-blue-200"
                                            >
                                                <div className="font-medium text-gray-700 text-sm mb-1">
                                                    {spec.key}
                                                </div>
                                                <div className="text-black">
                                                    {spec.value}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                    {/* Historial de precios */}
                    {product.prices && product.prices.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                Historial de Precios
                            </h3>
                            <div className="space-y-2">
                                {product.prices.map((priceItem) => (
                                    <div
                                        key={priceItem.id}
                                        className={`flex justify-between items-center p-3 rounded-lg ${
                                            priceItem.active
                                                ? "bg-green-100 border border-green-300"
                                                : "bg-white border border-gray-200"
                                        }`}
                                    >
                                        <span className="font-medium">
                                            {formatPrice(priceItem.price)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {priceItem.active ? (
                                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                    Activo
                                                </span>
                                            ) : ('')}
                                            <span className="text-sm text-gray-600">
                                                {formatDate(
                                                    priceItem.created_at
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fechas */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-600" />
                            Fechas
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Creado:</span>
                                <span className="font-medium">
                                    {formatDate(product.created_at)}
                                </span>
                            </div>
                            {/*<div className="flex justify-between">
                                <span className="text-gray-600">
                                    Última actualización:
                                </span>
                                <span className="font-medium">
                                    {formatDate(product.updated_at)}
                                </span>
                            </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSheet;