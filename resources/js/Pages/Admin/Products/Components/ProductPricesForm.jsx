import React, { useState, useEffect } from "react";
import { Tag, Package, Hash, Archive, Plus, AlertCircle } from "lucide-react";

const ProductPricesForm = ({ onSubmit, initialData = null }) => {
    const [price, setPrice] = useState("");
    const [prices, setPrices] = useState(initialData ? initialData.prices : []);

    const [errors, setErrors] = useState({});

    const addPrice = () => {
        if (price) {
            // Validate price format
            const priceValue = parseFloat(price);
            if (isNaN(priceValue) || priceValue <= 0) {
                setErrors({ price: "El precio debe ser un número válido" });
                return;
            }
            setErrors({}); // Clear errors if validation passes
            // validate if price already exists
            if (prices.some((p) => parseFloat(p.price) === priceValue)) {
                // If the price already exists, set an error
                setErrors({ price: "El precio ya existe" });
                return;
            }

            // change prices active state to false
            setPrices((prevPrices) =>
                prevPrices.map((p) => ({ ...p, active: false }))
            );

            // Add the new price to the list
            setPrices((prevPrices) => [
                ...prevPrices,
                { price: priceValue, active: true },
            ]);
            setPrice("");
            
            const url = route('admin.products.prices.store');
            const data = {
                price: priceValue,
                product_id: initialData.id
            };
            axios.post(url, data)
                .then(response => {
                    console.log("Price added successfully:", response.data);
                    getPrices(); // Refresh the prices list
                })
                .catch(error => {
                    console.error("There was an error adding the price!", error);
                });
        } else {
            setErrors({ price: "El precio es requerido" });
        }
    };

    const handleActivatePrice = (id) => {
        const url = route('admin.products.prices.activate', { id });
        axios.post(url)
            .then(response => {
                console.log("Price activated successfully:", response.data);
                getPrices(); // Refresh the prices list
            })
            .catch(error => {
                console.error("There was an error activating the price!", error);
            });
    };

    const handleDeletePrice = (id) => {
        const url = route('admin.products.prices.delete', { id });
        axios.delete(url)
            .then(response => {
                console.log("Price deleted successfully:", response.data);
                getPrices(); // Refresh the prices list
            })
            .catch(error => {
                console.error("There was an error deleting the price!", error);
            });
    };

    const getPrices = () => {
        const url = route('admin.products.prices.get', { id: initialData.id });
        axios.get(url, {
            params: { all: true } // Fetch all prices
            })
            .then(response => {
                console.log(response.data);
                setPrices(response.data || []);
            })
            .catch(error => {
                console.error("There was an error fetching the prices!", error);
            });
    };

    useEffect(() => {
        getPrices();
    }, [initialData]);

    return (
        <>
            <div className="space-y-6">
                {/* Table prices */}

                <h3 className="text-lg font-semibold mb-2">Precios</h3>
                <div className="">
                    <label className="block text-sm font-medium text-gray-700">
                        Precio
                    </label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    />
                    <button
                        type="button"
                        onClick={addPrice}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-2"
                    >
                        Agregar Precio
                    </button>
                </div>
                <div>
                    {errors.price && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.price}
                        </p>
                    )}
                </div>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b">Precio</th>
                            <th className="px-4 py-2 border-b">Estado</th>
                            <th className="px-4 py-2 border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(prices || []).map((price, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border-b text-center">
                                    {parseFloat(price.price).toFixed(2)}
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    {price.active ? "Activo" : ""}
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    {!price.active && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleActivatePrice(price.id)}
                                                className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                                            >
                                                Activar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeletePrice(price.id)}
                                                className="ml-2 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProductPricesForm;
