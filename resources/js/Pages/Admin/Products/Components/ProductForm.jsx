import React, { useState, useEffect } from "react";
import { Tag, Package, Hash, Archive, Plus, AlertCircle } from "lucide-react";
import CategoryModal from "./CategoryModal.jsx";

const ProductForm = ({ onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        category_id: "",
        name: "",
        description: "",
        code: "",
        price: "",
        minimum_stock: "",
    });

    const [categories, setCategories] = useState([]);

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        let url = route("admin.products.categories.get") + "?isSelect=true";
        axios.get(url)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        //if (!formData.category_id)
//            newErrors.category_id = "La categoría es requerida";
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
        if (!formData.code.trim()) newErrors.code = "El código es requerido";
        if (!formData.price || formData.price < 0)
            newErrors.price = "El precio debe ser un número válido";
        if (!formData.minimum_stock || formData.minimum_stock < 0)
            newErrors.minimum_stock =
                "El stock mínimo debe ser un número válido";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleAddCategory = (newCategory) => {
        /*setCategories((prev) => [...prev, newCategory]);
        setFormData((prev) => ({
            ...prev,
            category_id: newCategory.id.toString(),
        }));*/
        let url = route("admin.products.categories.store");
        axios.post(url, newCategory)
            .then((response) => {
                fetchCategories();
                setShowCategoryModal(false);
            })
            .catch((error) => {
                console.error("Error adding category:", error);
            });
    };

    return (
        <>
            <div className="space-y-6">
                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Tag className="inline w-4 h-4 mr-1" />
                        Categoría {/*<span className="text-red-500">*</span>*/}
                    </label>
                    <div className="flex gap-2">
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.category_id
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowCategoryModal(true)}
                            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-1"
                        >
                            <Plus size={16} />
                            Nueva
                        </button>
                    </div>
                    {errors.category_id && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.category_id}
                        </p>
                    )}
                </div>

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Package className="inline w-4 h-4 mr-1" />
                        Nombre del Producto{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Ej: Laptop Dell XPS 13"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe las características del producto..."
                    />
                </div>

                {/* Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Hash className="inline w-4 h-4 mr-1" />
                        Código <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.code ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Ej: PROD-001"
                    />
                    {errors.code && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle size={14} />
                            {errors.code}
                        </p>
                    )}
                </div>

                {/* Stock Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Archive className="inline w-4 h-4 mr-1" />
                            Precio <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.price
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="0"
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stock Mínimo <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="minimum_stock"
                            value={formData.minimum_stock}
                            onChange={handleChange}
                            min="0"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.minimum_stock
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="0"
                        />
                        {errors.minimum_stock && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.minimum_stock}
                            </p>
                        )}
                    </div>
                </div>

                {/* Stock Alert */}
                {/*formData.stock &&
                    formData.minimum_stock &&
                    parseInt(formData.stock) <=
                        parseInt(formData.minimum_stock) && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                            <p className="text-sm text-yellow-800 flex items-center gap-2">
                                <AlertCircle size={16} />
                                El stock actual está en o por debajo del stock
                                mínimo
                            </p>
                        </div>
                    )*/}

                {/* Form Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                    <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                category_id: "",
                                name: "",
                                description: "",
                                code: "",
                                //stock: "",
                                minimum_stock: "",
                            })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Limpiar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Guardar Producto
                    </button>
                </div>
            </div>

            {/* Category Modal */}
            <CategoryModal
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                onSave={handleAddCategory}
            />
        </>
    );
};

export default ProductForm;
