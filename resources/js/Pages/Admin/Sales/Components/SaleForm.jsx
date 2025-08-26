import React, { useState, useEffect } from "react";
import {
    Search,
    ShoppingCart,
    Plus,
    Minus,
    X,
    User,
    UserPlus,
    Package,
    DollarSign,
    Trash2,
    Check,
    AlertCircle,
    Building,
} from "lucide-react";

import Modal from "../../../../Components/Modals/Modal.jsx";
import CustomerForm from "../../Customers/Components/CustomerForm.jsx";

import { getProducts } from "@/Services/products.js";
import { getCustomers, createCustomer } from "@/Services/customer.js";
import { createSale } from "@/Services/sale.js";

// Main Sale Form Component
const SaleForm = ({onSaleCreated}) => {
    // Products data
    const [products, setProducts] = useState([]);

    // Customers data
    const [customers, setCustomers] = useState  ([]);

    // States
    const [searchProduct, setSearchProduct] = useState("");
    const [searchCustomer, setSearchCustomer] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [discount, setDiscount] = useState(0);


    // Fetch products from the service
    const fetchProducts = async () => {
        try {
            const data = await getProducts({all: true});
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Fetch customers from the service
    const fetchCustomers = async () => {
        try {
            const data = await getCustomers({all: true});
            setCustomers(data || []);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCustomers();
    }, []);

    // Filter products based on search
    const filteredProducts = (products || []).filter(
        (product) =>
            product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
            product.code.toLowerCase().includes(searchProduct.toLowerCase()) ||
            product.category.toLowerCase().includes(searchProduct.toLowerCase())
    );

    // Filter customers based on search
    const filteredCustomers = customers.filter((customer) => {
        const searchLower = searchCustomer.toLowerCase();
        return (
            (customer.displayName &&
                customer.displayName.toLowerCase().includes(searchLower)) ||
            (customer.name &&
                customer.name.toLowerCase().includes(searchLower)) ||
            (customer.companyName &&
                customer.companyName.toLowerCase().includes(searchLower)) ||
            (customer.contactName &&
                customer.contactName.toLowerCase().includes(searchLower)) ||
            (customer.email &&
                customer.email.toLowerCase().includes(searchLower)) ||
            (customer.phone && customer.phone.includes(searchCustomer)) ||
            (customer.document && customer.document.includes(searchCustomer))
        );
    });

    // Add product to cart
    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                setCart(
                    cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            } else {
                alert("No hay suficiente stock disponible");
            }
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Update cart item quantity
    const updateQuantity = (productId, newQuantity) => {
        const product = products.find((p) => p.id === productId);

        if (newQuantity === 0) {
            removeFromCart(productId);
        } else if (newQuantity <= product.stock) {
            setCart(
                cart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } else {
            alert("No hay suficiente stock disponible");
        }
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    // Calculate totals
    /*const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const discountAmount = (subtotal * discount) / 100;
    const tax = (subtotal - discountAmount) * 0.18; // 18% tax
    const total = subtotal - discountAmount + tax;*/

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const discountAmount = (total * discount) / 100;
    const tax = (total - discountAmount) * 0.18; // 18% tax
    const subtotal = total - discountAmount - tax;

    // Handle new customer
    const handleNewCustomer = async(customerData) => {
        try {
            const newCustomer = await createCustomer(customerData);
            setCustomers([...customers, newCustomer]);
            setSelectedCustomer(newCustomer);
            setShowCustomerForm(false);
            setSearchCustomer("");
        } catch (error) {
            console.error("Error creating customer:", error);
            alert("Error al crear el cliente. Por favor, inténtalo de nuevo.");
        }
    };

    // Process sale
    const processSale = async () => {
        if (!selectedCustomer) {
            alert("Por favor selecciona un cliente");
            return;
        }

        if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        // Here you would send the sale data to your backend
        const saleData = {
            customer: selectedCustomer,
            items: cart,
            subtotal,
            discount: discountAmount,
            discountPercent: discount,
            tax,
            total,
            paymentMethod,
            date: new Date().toISOString(),
        };

        console.log("Sale processed:", saleData);

        alert("¡Venta procesada exitosamente!");
        try {
            await createSale(saleData);
        } catch (error) {
            console.error("Error creating sale:", error);
            alert("Error al procesar la venta. Por favor, inténtalo de nuevo.");
            return;
        }

        // Reset form
        setCart([]);
        setSelectedCustomer(null);
        setDiscount(0);
        setPaymentMethod("cash");
        setShowCheckout(false);
        setSearchCustomer("");
        setSearchProduct("");
        if (onSaleCreated) {
            onSaleCreated(saleData);
        }
    };

    // Handle PDF generation (mock function)
    const handleGeneratePDF = () => {
        if (cart.length === 0) {
            alert("El carrito está vacío, no se puede generar el PDF")
            return;
        }
        // Here you would implement the logic to generate a PDF
        console.log("Generating PDF...:", cart);
        generatePDF();
    }

    /*const generatePDF = () => {
        const content = `
            <h1>Nota de Venta</h1>
            <p>Cliente: ${selectedCustomer ? selectedCustomer.name : "N/A"}</p>
            <p>Fecha: ${new Date().toLocaleDateString(
                "es-PE"
            )} ${new Date().toLocaleTimeString("es-PE")}</p>
            <h2>Productos</h2>
            <ul>
                ${cart
                    .map(
                        (item) => `
                    <li>${item.name} - Cantidad: ${
                            item.quantity
                        } - Precio: S/. ${item.price.toFixed(2)}</li>
                `
                    )
                    .join("")}
            </ul>
            <p>Subtotal: S/. ${subtotal.toFixed(2)}</p>
            <p>Descuento: S/. ${discountAmount.toFixed(2)}</p>
            <p>IGV (18%): S/. ${tax.toFixed(2)}</p>
            <p>Total: S/. ${total.toFixed(2)}</p>

            <footer>
                <p>Gracias por su compra</p>
            </footer>
        `;

        const printWindow = window.open("", "", "width=800,height=900");
        printWindow.document.write(content);
        printWindow.document.close();

        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };*/
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "PEN",
            minimumFractionDigits: 2,
        }).format(parseFloat(amount));
    };

    const getDocumentTypeLabel = (type) => {
        const types = {
            ruc: "RUC",
            dni: "DNI",
            passport: "Pasaporte",
            other: "Otro",
        };
        return types[type] || type;
    };

    const generatePDF = () => {
        const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Nota de Venta</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #2d3748; margin: 0; }
          .header p { color: #718096; margin: 5px 0; }
          .info-section { margin-bottom: 30px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .info-box { background: #f7fafc; padding: 15px; border-radius: 8px; }
          .info-box h3 { margin-top: 0; color: #2d3748; }
          .info-box p { margin: 5px 0; color: #4a5568; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .table th { background: #2d3748; color: white; padding: 12px; text-align: left; }
          .table td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
          .table tr:last-child td { border-bottom: none; }
          .totals { text-align: right; margin-top: 30px; }
          .totals p { margin: 5px 0; }
          .totals .total { font-size: 1.2em; font-weight: bold; color: #2d3748; margin-top: 10px; }
          .footer { margin-top: 50px; text-align: center; color: #718096; font-size: 0.9em; }
          .cancelled { color: #e53e3e; font-weight: bold; text-align: center; font-size: 1.2em; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>NOTA DE VENTA</h1>
        </div>

        <div class="info-section">
          <div class="info-grid">
            <div class="info-box">
              <h3>Información del Cliente</h3>
              <p><strong>Razón Social:</strong> ${
                  selectedCustomer ? selectedCustomer.name : "No especificado"
              }</p>
              <p><strong>${getDocumentTypeLabel(
                  selectedCustomer ? selectedCustomer.document_type : "Otro"
              )}:</strong> ${selectedCustomer?.document_number || "No especificado"}</p>
              <p><strong>Contacto:</strong> ${
                  selectedCustomer?.contact_name || "No especificado"
              }</p>
              ${
                  selectedCustomer?.phone
                      ? `<p><strong>Teléfono:</strong> ${selectedCustomer.phone}</p>`
                      : ""
              }
              ${
                  selectedCustomer?.email
                      ? `<p><strong>Email:</strong> ${selectedCustomer.email}</p>`
                      : ""
              }
              ${
                  selectedCustomer?.address
                      ? `<p><strong>Dirección:</strong> ${selectedCustomer.address}</p>`
                      : ""
              }
            </div>
            <div class="info-box">
              <p><strong>Fecha:</strong> ${formatDate(new Date())}</p>
            </div>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th style="text-align: center;">Cantidad</th>
              <th style="text-align: right;">P. Unitario</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${cart
                .map(
                    (item) => `
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right;">${formatCurrency(
                        item.price
                    )}</td>
                    <td style="text-align: right;">${formatCurrency(
                        item.price * item.quantity
                    )}</td>
                </tr>
            `
                )
                .join("")}
            </tbody>
        </table>

        <div class="totals">
          <p><strong>Subtotal:</strong> ${formatCurrency(subtotal)}</p>
          <p><strong>Descuento:</strong> -${formatCurrency(discount)}</p>
          <p><strong>Impuestos:</strong> ${formatCurrency(tax)}</p>
          <p class="total"><strong>Total:</strong> ${formatCurrency(total)}</p>
        </div>

        <div class="footer">
          <p>Documento generado el ${formatDate(new Date())}</p>
          <p>Gracias por su compra</p>
        </div>
      </body>
      </html>
    `;

        const printWindow = window.open("", "", "width=800,height=900");
        printWindow.document.write(content);
        printWindow.document.close();

        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    return (
        <div className="">
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Products Section */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Package className="text-blue-500" />
                                Productos
                            </h2>

                            {/* Product Search */}
                            <div className="relative mb-4">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    value={searchProduct}
                                    onChange={(e) =>
                                        setSearchProduct(e.target.value)
                                    }
                                    placeholder="Buscar productos por nombre, código o categoría..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-gray-800">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {product.code}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {product.category_name || "Sin categoría"}
                                                </p>
                                            </div>
                                            <p className="text-lg font-bold text-blue-600">
                                                S/. {product.price}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-600">
                                                Stock: {product.stock}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    addToCart(product)
                                                }
                                                disabled={product.stock === 0}
                                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                                            >
                                                <Plus
                                                    size={16}
                                                    className="inline mr-1"
                                                />
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Customer Section */}
                        <div className="border-t pt-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <User className="text-green-500" />
                                Cliente
                            </h2>

                            {selectedCustomer ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">
                                                {selectedCustomer.name ||
                                                    selectedCustomer.company_name}
                                            </p>
                                            {selectedCustomer.type ===
                                                "business" &&
                                                selectedCustomer.contact_name && (
                                                    <p className="text-sm text-gray-600">
                                                        Contacto:{" "}
                                                        {
                                                            selectedCustomer.contact_name
                                                        }
                                                    </p>
                                                )}
                                            <p className="text-sm text-gray-600">
                                                {selectedCustomer.phone}
                                            </p>
                                            {selectedCustomer.email && (
                                                <p className="text-sm text-gray-600">
                                                    {selectedCustomer.email}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500">
                                                {selectedCustomer.document_type ||
                                                    "Documento"}
                                                :{" "}
                                                {selectedCustomer.document_number || (
                                                    <span className="text-gray-500">
                                                        Sin número de documento
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setSelectedCustomer(null)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="relative mb-4">
                                        <Search
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="text"
                                            value={searchCustomer}
                                            onChange={(e) =>
                                                setSearchCustomer(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Buscar cliente por nombre, email, teléfono o documento..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {searchCustomer && (
                                        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                                            {filteredCustomers.length > 0 ? (
                                                filteredCustomers.map(
                                                    (customer) => (
                                                        <div
                                                            key={customer.id}
                                                            onClick={() => {
                                                                setSelectedCustomer(
                                                                    customer
                                                                );
                                                                setSearchCustomer(
                                                                    ""
                                                                );
                                                            }}
                                                            className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="font-semibold">
                                                                        {
                                                                            customer.name
                                                                        }
                                                                    </p>
                                                                    {customer.type ===
                                                                        "business" &&
                                                                        customer.contactName && (
                                                                            <p className="text-sm text-gray-600">
                                                                                Contacto:{" "}
                                                                                {
                                                                                    customer.contactName
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    <p className="text-sm text-gray-600">
                                                                        {customer.phone && (
                                                                            <>
                                                                                {
                                                                                    customer.phone
                                                                                }
                                                                                {
                                                                                    ", "
                                                                                }
                                                                            </>
                                                                        )}
                                                                        {customer.email && (
                                                                            <>
                                                                                {" "}
                                                                                {
                                                                                    customer.email
                                                                                }
                                                                            </>
                                                                        )}
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {
                                                                            customer.document_type
                                                                        }
                                                                        :{" "}
                                                                        {
                                                                            customer.document_number
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <span className="text-xs text-gray-400 uppercase">
                                                                    {customer.type ===
                                                                    "business"
                                                                        ? "Empresa"
                                                                        : "Persona"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p className="text-gray-500 mb-2">
                                                        No se encontró el
                                                        cliente
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            setShowCustomerForm(
                                                                true
                                                            )
                                                        }
                                                        className="text-blue-500 hover:text-blue-700 flex items-center gap-1 mx-auto"
                                                    >
                                                        <UserPlus size={16} />
                                                        Registrar nuevo cliente
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Cart Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <ShoppingCart className="text-purple-500" />
                            Carrito de Venta
                        </h2>

                        {cart.length === 0 ? (
                            <div className="text-center py-8">
                                <ShoppingCart
                                    className="mx-auto text-gray-300 mb-2"
                                    size={48}
                                />
                                <p className="text-gray-500">Carrito vacío</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border border-gray-300 rounded-lg p-3"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm">
                                                        {item.name}
                                                        <span className="text-xs text-gray-500">
                                                            {" "}
                                                            ({item.price} c/u)
                                                        </span>
                                                    </h4>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="p-1 border rounded hover:bg-gray-100"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            item.id,
                                                            parseInt(
                                                                e.target.value
                                                            ) || 0
                                                        )
                                                    }
                                                    className="w-16 text-center border rounded px-2 py-1"
                                                    min="0"
                                                    max={item.stock}
                                                />
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="p-1 border rounded hover:bg-gray-100"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <span className="text-sm font-semibold ml-auto">
                                                    S/.
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Discount */}
                                <div className="border-t pt-4 mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descuento (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={discount}
                                        onChange={(e) =>
                                            setDiscount(
                                                Math.max(
                                                    0,
                                                    Math.min(
                                                        100,
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                )
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        min="0"
                                        max="100"
                                    />
                                </div>

                                {/* Totals */}
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal:</span>
                                        <span>S/. {subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>
                                                Descuento ({discount}%):
                                            </span>
                                            <span>
                                                -S/. {discountAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span>IGV (18%):</span>
                                        <span>S/. {tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                                        <span>Total:</span>
                                        <span className="text-blue-600">
                                            S/. {total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Generate pdf */}
                                <button
                                    onClick={handleGeneratePDF}
                                    className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Nota de Venta PDF
                                </button>

                                {/* Checkout Button */}
                                <button
                                    onClick={() => setShowCheckout(true)}
                                    disabled={
                                        !selectedCustomer || cart.length === 0
                                    }
                                    className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                >
                                    <DollarSign size={20} />
                                    Procesar Venta
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Customer Form Modal */}
            <Modal
                isOpen={showCustomerForm}
                onClose={() => setShowCustomerForm(false)}
                title="Registrar Nuevo Cliente"
                size="medium"
            >
                <CustomerForm
                    onSave={handleNewCustomer}
                    onCancel={() => setShowCustomerForm(false)}
                />
            </Modal>

            {/* Checkout Modal */}
            <Modal
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
                title="Confirmar Venta"
                size="medium"
            >
                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Resumen de Venta</h3>
                        <p className="text-sm text-gray-600">
                            Cliente: {selectedCustomer?.name}
                            {selectedCustomer?.type === "business" &&
                                selectedCustomer?.contact_name &&
                                ` (${selectedCustomer.contact_name})`}
                        </p>
                        <p className="text-sm text-gray-600">
                            Items:{" "}
                            {cart.reduce((acc, item) => acc + item.quantity, 0)}
                        </p>
                        <p className="text-lg font-bold text-blue-600 mt-2">
                            Total: S/. {total.toFixed(2)}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Método de Pago
                        </label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="cash">Efectivo</option>
                            <option value="card">Tarjeta</option>
                            <option value="transfer">Transferencia</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>

                    <div className="flex gap-3 justify-end pt-4 border-t">
                        <button
                            onClick={() => setShowCheckout(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={processSale}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            <Check size={20} />
                            Confirmar Venta
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SaleForm;
