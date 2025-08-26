import React from "react";
import {
    Crown,
    TrendingUp,
    Package,
    DollarSign,
    Award,
    ShoppingCart,
} from "lucide-react";

const TopSellingProduct = ({
    products = [],
    onDownloadExcel
}) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
            minimumFractionDigits: 2,
        }).format(parseFloat(amount));
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat("es-PE").format(parseInt(num));
    };

    // Encontrar el producto más vendido (por cantidad)
    const topProduct =
        products.length > 0
            ? products.reduce((prev, current) =>
                  parseInt(current.total_quantity) >
                  parseInt(prev.total_quantity)
                      ? current
                      : prev
              )
            : null;

    if (!topProduct) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">
                        Sin datos disponibles
                    </h3>
                    <p className="text-gray-400">
                        No hay productos para mostrar
                    </p>
                </div>
            </div>
        );
    }

    const totalProducts = products.length;
    const totalQuantitySold = products.reduce(
        (sum, product) => sum + parseInt(product.total_quantity),
        0
    );
    const marketShare =
        totalQuantitySold > 0
            ? (
                  (parseInt(topProduct.total_quantity) / totalQuantitySold) *
                  100
              ).toFixed(1)
            : 0;

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
                        <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Producto Más Vendido
                        </h2>
                        <p className="text-gray-600">
                            Líder en ventas por cantidad
                        </p>
                    </div>
                </div>
                <div className="bg-yellow-50 px-3 py-1 rounded-full">
                    <span className="text-yellow-600 font-semibold text-sm">
                        #1
                    </span>
                </div>
            </div>

            {onDownloadExcel && (
                <div className="mb-4">
                    <button
                        onClick={() => onDownloadExcel(products)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Descargar Excel
                    </button>
                </div>
            )}

            {/* Main Product Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {topProduct.product.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                {topProduct.product.category_name}
                            </span>
                        </div>
                    </div>
                    <div className="bg-blue-500 p-3 rounded-lg">
                        <Award className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                        <div className="flex items-center space-x-2 mb-2">
                            <ShoppingCart className="w-5 h-5 text-blue-500" />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Cantidad Vendida
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                            {formatNumber(topProduct.total_quantity)}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                        <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Ganancia Total
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(topProduct.total_profit)}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                        <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-purple-500" />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Participación
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                            {marketShare}%
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                        <div className="flex items-center space-x-2 mb-2">
                            <Package className="w-5 h-5 text-orange-500" />
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Ganancia/Unidad
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                            {formatCurrency(
                                parseFloat(topProduct.total_profit) /
                                    parseInt(topProduct.total_quantity)
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                            <span className="font-semibold">
                                Total de productos:
                            </span>{" "}
                            {totalProducts}
                        </span>
                    </div>
                    <div className="text-gray-500">
                        Actualizado: {new Date().toLocaleDateString("es-PE")}
                    </div>
                </div>
            </div>

            {/* Top 3 Ranking */}
            {products.length > 1 && (
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Ranking de Ventas
                    </h4>
                    <div className="space-y-3">
                        {products
                            .sort(
                                (a, b) =>
                                    parseInt(b.total_quantity) -
                                    parseInt(a.total_quantity)
                            )
                            .slice(0, 3)
                            .map((product, index) => (
                                <div
                                    key={product.product_id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                                index === 0
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : index === 1
                                                    ? "bg-gray-100 text-gray-600"
                                                    : "bg-orange-100 text-orange-600"
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">
                                                {product.product.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {product.product.category_name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-800">
                                            {formatNumber(
                                                product.total_quantity
                                            )}{" "}
                                            unidades
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {formatCurrency(
                                                product.total_profit
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopSellingProduct;
