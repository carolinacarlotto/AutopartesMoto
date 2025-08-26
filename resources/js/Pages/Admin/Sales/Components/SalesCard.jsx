import React from "react";
import { TrendingUp, Calendar, DollarSign, BarChart3 } from "lucide-react";

const SalesCard = ({
    data = {
        today: { sales: 0, total: 0, data: [] },
        this_week: { sales: 0, total: 0, data: [] },
        this_month: { sales: 0, total: 0, data: [] },
        range: { sales: 0, total: 0, data: [] },
    },
    onDateRangeChange,
    onDownloadExcel
}) => {
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat("es-PE").format(num);
    };

    const periods = [
        {
            key: "today",
            title: "Hoy",
            icon: Calendar,
            color: "bg-blue-500",
            lightColor: "bg-blue-50",
            textColor: "text-blue-600",
        },
        {
            key: "this_week",
            title: "Esta Semana",
            icon: BarChart3,
            color: "bg-green-500",
            lightColor: "bg-green-50",
            textColor: "text-green-600",
        },
        {
            key: "this_month",
            title: "Este Mes",
            icon: TrendingUp,
            color: "bg-purple-500",
            lightColor: "bg-purple-50",
            textColor: "text-purple-600",
        },
        {
            key: "range",
            title: "Rango Personalizado",
            icon: DollarSign,
            color: "bg-orange-500",
            lightColor: "bg-orange-50",
            textColor: "text-orange-600",
        },
    ];

    return (
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Resumen de Ventas
                </h2>
                <p className="text-gray-600">
                    Resumen de rendimiento por períodos
                </p>

                {/* Range */}
                <div className="mt-4 bg-gray-100 p-4 rounded-lg flex flex-col space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seleccionar Rango de Fechas
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="date"
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (onDateRangeChange) {
                                onDateRangeChange(startDate, endDate);
                            }
                        }}
                        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Filtrar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {periods.map((period) => {
                    const periodData = data[period.key] || {
                        sales: 0,
                        total: 0,
                    };
                    const Icon = period.icon;

                    return (
                        <div
                            key={period.key}
                            className={`${period.lightColor} rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className={`${period.color} p-3 rounded-lg`}
                                >
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-right">
                                    <div
                                        className={`text-xs font-medium ${period.textColor} uppercase tracking-wider`}
                                    >
                                        {period.title}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="text-xs text-gray-500 font-medium mb-1">
                                        Número de Ventas
                                    </div>
                                    <div
                                        className={`text-2xl font-bold ${period.textColor}`}
                                    >
                                        {formatNumber(periodData.sales)}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-500 font-medium mb-1">
                                        Total Recaudado
                                    </div>
                                    <div
                                        className={`text-2xl font-bold ${period.textColor}`}
                                    >
                                        {formatCurrency(periodData.total)}
                                    </div>
                                </div>

                                {periodData.sales > 0 && (
                                    <div className="pt-2 border-t border-gray-200">
                                        <div className="text-xs text-gray-500 font-medium mb-1">
                                            Promedio por Venta
                                        </div>
                                        <div className="text-lg font-semibold text-gray-700">
                                            {formatCurrency(
                                                periodData.total /
                                                    periodData.sales
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2 border-t border-gray-200 flex items-center justify-center">
                                    <button
                                        disabled={(periodData.data || []).length === 0}
                                        className={"bg-blue-500 text-white px-3 py-1 rounded-md text-sm "+(periodData.data && periodData.data.length > 0 ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed")}
                                        onClick={() =>
                                            onDownloadExcel(periodData.data)
                                        }
                                    >
                                        Descargar Excel
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <div className="text-center text-sm text-gray-600">
                    <span className="font-medium">Última actualización:</span>{" "}
                    {new Date().toLocaleDateString("es-PE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            </div>
        </div>
    );
};

export default SalesCard;
