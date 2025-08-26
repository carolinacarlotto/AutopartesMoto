import React, { useState, useEffect } from "react";
import {
    Download,
    Eye,
    Calendar,
    User,
    CreditCard,
    FileText,
} from "lucide-react";

const SalesInvoice = ({ saleData }) => {
    // Datos de ejemplo si no se proporciona saleData
    const defaultData = {
        id: 1,
        document_number: "S20250729010731",
        customer_id: 1,
        sale_date: "2025-07-29 01:07:31",
        subtotal: "92.0000",
        discount: "0.0000",
        tax: "0.0000",
        total: "92.0000",
        cancelled_at: null,
        notes: null,
        payment_method: "cash",
        user_id: 1,
        user_name: "Test User",
        created_at: "2025-07-29T01:07:31.000000Z",
        updated_at: "2025-07-29T01:07:31.000000Z",
        deleted_at: null,
        customer: {
            id: 1,
            name: "mofer",
            last_name: null,
            type: "business",
            document_type: "ruc",
            document_number: "20129090092",
            company_name: "mofer",
            contact_name: "Moises Angel Fernandez Flores",
            phone: null,
            email: null,
            address: null,
            created_at: "2025-07-29T01:07:16.000000Z",
            updated_at: "2025-07-29T01:07:16.000000Z",
            deleted_at: null,
        },
        user: {
            id: 1,
            name: "Test User",
            last_name: null,
            email: "test@example.com",
            email_verified_at: "2025-07-29T01:03:44.000000Z",
            two_factor_secret: null,
            two_factor_recovery_codes: null,
            two_factor_confirmed_at: null,
            created_at: "2025-07-29T01:03:45.000000Z",
            updated_at: "2025-07-29T01:03:45.000000Z",
        },
        details: [
            {
                id: 1,
                sale_id: 1,
                product_id: 1,
                product_batch_id: null,
                quantity: 4,
                unit_price: "23.0000",
                purchase_price: "0.0000",
                tax_percentage: "0.0000",
                total_price: "0.0000",
                created_at: "2025-07-29T01:07:31.000000Z",
                updated_at: "2025-07-29T01:07:31.000000Z",
                deleted_at: null,
                product: {
                    id: 1,
                    category_id: null,
                    name: "Sonido bose editado",
                    description: "Ya tiene descripción",
                    code: "1",
                    stock: 0,
                    minimum_stock: 5,
                    created_at: "2025-07-29T01:06:14.000000Z",
                    updated_at: "2025-08-01T02:38:27.000000Z",
                    deleted_at: null,
                    category_name: "Sin categoría",
                    price_sale: 11,
                    price: 11,
                    category: null,
                },
            },
        ],
    };

    const [sale, setSale] = useState(saleData || defaultData);

    useEffect(() => {
        if (saleData) {
            setSale(saleData);
        }
    }, [saleData]);

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

    const getPaymentMethodLabel = (method) => {
        const methods = {
            cash: "Efectivo",
            card: "Tarjeta",
            transfer: "Transferencia",
            check: "Cheque",
        };
        return methods[method] || method;
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

    const calculateLineTotal = (detail) => {
        return parseFloat(detail.quantity) * parseFloat(detail.unit_price);
    };

    const generatePDF = () => {
        const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${sale.document_number}</title>
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
          <h1>COMPROBANTE DE VENTA</h1>
          <p>Nº ${sale.document_number}</p>
          ${sale.cancelled_at ? '<p class="cancelled">ANULADO</p>' : ""}
        </div>

        <div class="info-section">
          <div class="info-grid">
            <div class="info-box">
              <h3>Información del Cliente</h3>
              <p><strong>Razón Social:</strong> ${
                  sale.customer.company_name || sale.customer.name
              }</p>
              <p><strong>${getDocumentTypeLabel(
                  sale.customer.document_type
              )}:</strong> ${sale.customer.document_number}</p>
              <p><strong>Contacto:</strong> ${
                  sale.customer.contact_name || "No especificado"
              }</p>
              ${
                  sale.customer.phone
                      ? `<p><strong>Teléfono:</strong> ${sale.customer.phone}</p>`
                      : ""
              }
              ${
                  sale.customer.email
                      ? `<p><strong>Email:</strong> ${sale.customer.email}</p>`
                      : ""
              }
              ${
                  sale.customer.address
                      ? `<p><strong>Dirección:</strong> ${sale.customer.address}</p>`
                      : ""
              }
            </div>
            <div class="info-box">
              <h3>Información de la Venta</h3>
              <p><strong>Fecha:</strong> ${formatDate(sale.sale_date)}</p>
              <p><strong>Método de Pago:</strong> ${getPaymentMethodLabel(
                  sale.payment_method
              )}</p>
              <p><strong>Vendedor:</strong> ${sale.user_name}</p>
              ${
                  sale.notes
                      ? `<p><strong>Notas:</strong> ${sale.notes}</p>`
                      : ""
              }
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
            ${sale.details
                .map(
                    (detail) => `
              <tr>
                <td>${detail.product.code}</td>
                <td>
                  <strong>${detail.product.name}</strong>
                  ${
                      detail.product.description
                          ? `<br><small>${detail.product.description}</small>`
                          : ""
                  }
                </td>
                <td style="text-align: center;">${detail.quantity}</td>
                <td style="text-align: right;">${formatCurrency(
                    detail.unit_price
                )}</td>
                <td style="text-align: right;">${formatCurrency(
                    calculateLineTotal(detail)
                )}</td>
              </tr>
            `
                )
                .join("")}
          </tbody>
        </table>

        <div class="totals">
          <p><strong>Subtotal:</strong> ${formatCurrency(sale.subtotal)}</p>
          ${
              parseFloat(sale.discount) > 0
                  ? `<p><strong>Descuento:</strong> -${formatCurrency(
                        sale.discount
                    )}</p>`
                  : ""
          }
          ${
              parseFloat(sale.tax) > 0
                  ? `<p><strong>Impuestos:</strong> ${formatCurrency(
                        sale.tax
                    )}</p>`
                  : ""
          }
          <p class="total"><strong>Total:</strong> ${formatCurrency(
              sale.total
          )}</p>
        </div>

        <div class="footer">
          <p>Documento generado el ${new Date().toLocaleDateString("es-ES")}</p>
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
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Comprobante de Venta
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                    Nº {sale.document_number}
                </p>
                {sale.cancelled_at && (
                    <p className="text-red-600 font-bold mt-2">ANULADO</p>
                )}
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Customer Info */}
                <div className="bg-gray-50 p-5 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <User size={20} />
                        Información del Cliente
                    </h2>
                    <div className="space-y-2">
                        <p className="text-sm">
                            <span className="font-medium">Razón Social:</span>{" "}
                            {sale.customer.company_name || sale.customer.name}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium">
                                {getDocumentTypeLabel(
                                    sale.customer.document_type
                                )}
                                :
                            </span>{" "}
                            {sale.customer.document_number}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium">Contacto:</span>{" "}
                            {sale.customer.contact_name || "No especificado"}
                        </p>
                        {sale.customer.phone && (
                            <p className="text-sm">
                                <span className="font-medium">Teléfono:</span>{" "}
                                {sale.customer.phone}
                            </p>
                        )}
                        {sale.customer.email && (
                            <p className="text-sm">
                                <span className="font-medium">Email:</span>{" "}
                                {sale.customer.email}
                            </p>
                        )}
                        {sale.customer.address && (
                            <p className="text-sm">
                                <span className="font-medium">Dirección:</span>{" "}
                                {sale.customer.address}
                            </p>
                        )}
                    </div>
                </div>

                {/* Sale Info */}
                <div className="bg-gray-50 p-5 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FileText size={20} />
                        Información de la Venta
                    </h2>
                    <div className="space-y-2">
                        <p className="text-sm flex items-center gap-2">
                            <Calendar size={16} />
                            <span className="font-medium">Fecha:</span>{" "}
                            {formatDate(sale.sale_date)}
                        </p>
                        <p className="text-sm flex items-center gap-2">
                            <CreditCard size={16} />
                            <span className="font-medium">
                                Método de Pago:
                            </span>{" "}
                            {getPaymentMethodLabel(sale.payment_method)}
                        </p>
                        <p className="text-sm">
                            <span className="font-medium">Vendedor:</span>{" "}
                            {sale.user_name}
                        </p>
                        {sale.notes && (
                            <p className="text-sm">
                                <span className="font-medium">Notas:</span>{" "}
                                {sale.notes}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">
                    Detalle de Productos
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Código</th>
                                <th className="px-4 py-3 text-left">
                                    Producto
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Cantidad
                                </th>
                                <th className="px-4 py-3 text-right">
                                    P. Unitario
                                </th>
                                <th className="px-4 py-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sale.details.map((detail) => (
                                <tr
                                    key={detail.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">
                                        {detail.product.code}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {detail.product.name}
                                            </p>
                                            {detail.product.description && (
                                                <p className="text-sm text-gray-600">
                                                    {detail.product.description}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {detail.quantity}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {formatCurrency(detail.unit_price)}
                                    </td>
                                    <td className="px-4 py-3 text-right font-medium">
                                        {formatCurrency(
                                            calculateLineTotal(detail)
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Totals */}
            <div className="border-t pt-4">
                <div className="max-w-sm ml-auto space-y-2">
                    <div className="flex justify-between">
                        <span className="font-medium">Subtotal:</span>
                        <span>{formatCurrency(sale.subtotal)}</span>
                    </div>
                    {parseFloat(sale.discount) > 0 && (
                        <div className="flex justify-between text-red-600">
                            <span className="font-medium">Descuento:</span>
                            <span>-{formatCurrency(sale.discount)}</span>
                        </div>
                    )}
                    {parseFloat(sale.tax) > 0 && (
                        <div className="flex justify-between">
                            <span className="font-medium">Impuestos:</span>
                            <span>{formatCurrency(sale.tax)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-blue-600 pt-2 border-t">
                        <span>Total:</span>
                        <span>{formatCurrency(sale.total)}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-4">
                <button
                    onClick={generatePDF}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md"
                >
                    <Download size={20} />
                    Descargar PDF
                </button>
            </div>
        </div>
    );
};

export default SalesInvoice;
