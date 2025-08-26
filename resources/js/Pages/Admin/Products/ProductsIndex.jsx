import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import {
    Eye,
    Edit,
    Copy,
    Mail,
    Download,
    Trash2,
    ShoppingCart,
    DollarSign,
    FolderKanban,
    Image,
    FileText,
} from "lucide-react";

import AdminLayout from '../../../Layouts/AdminLayout/AdminLayout.jsx';
import DynamicTable from '../../../Components/Tables/DynamicTable.jsx';
import Modal from '../../../Components/Modals/Modal.jsx';
import ProductForm from './Components/ProductForm.jsx';
import ProductFormEdit from './Components/ProductFormEdit.jsx';
import ProductPricesForm from './Components/ProductPricesForm.jsx';
import BatchForm from './Components/BatchForm.jsx';
import Inventory from './Components/Inventory.jsx';
import TopSellingProduct from './Components/TopSellingProduct.jsx';
import ProductMultimedia from './Components/ProductMultimedia.jsx';
import ProductTechnicalSpecifications from './Components/ProductTechnicalSpecifications.jsx';
import ProductSheet from './Components/ProductSheet.jsx';

import { getTopSellingProducts } from "@/Services/products.js";

import { useNotification } from "@/Providers/NotificationProvider.jsx";



export default function ProductsIndex() {
    const auth = usePage().props.auth;
    const { success, error, warning, info } = useNotification();

    const [topProducts, setTopProducts] = useState([]);
    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(5);
    const [lastPage, setLastPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);
    const [search, setSearch] = React.useState("");

    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [movements, setMovements] = React.useState([]);

    const [createProductModal, setCreateProductModal] = React.useState(false);
    const [editProductModal, setEditProductModal] = React.useState(false);
    const [managePricesModal, setManagePricesModal] = React.useState(false);
    const [manageMultimediaModal, setManageMultimediaModal] = React.useState(false);
    const [createBatchModal, setCreateBatchModal] = React.useState(false);
    const [inventoryModal, setInventoryModal] = React.useState(false);
    const [manageTechnicalSpecificationsModal, setManageTechnicalSpecificationsModal] = React.useState(false);
    const [productSheetModal, setProductSheetModal] = React.useState(false);
    

    const handleSubmitCreateProduct = (data) => {
        axios.post(route('admin.products.store'), data)
            .then(response => {
                console.log('guardado');
                success("Producto creado exitosamente");
                setCreateProductModal(false);
                getProducts(); // Refresh the product list
            })
            .catch(error => {
                console.error("There was an error creating the product!", error);
            });
    }

    const handleSubmitEditProduct = (data) => {
        axios.put(route('admin.products.update', { id: selectedProduct.id }), data)
            .then(response => {
                setEditProductModal(false);
                getProducts(); // Refresh the product list
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });
    }

    const handleSubmitCreateBatch = (data) => {
        axios.post(route('admin.products.batches.store'), data)
            .then(response => {
                setCreateBatchModal(false);
                getProducts(); // Refresh the product list
            })
            .catch(error => {
                console.error("There was an error creating the batch!", error);
            });
    }

    const getProducts = () => {
        axios.get(route('admin.products.get'), {
            params: {
                page,
                perPage,
                search
            }
        })
            .then(response => {
                setProducts(response.data.data || []);
                setLastPage(response.data.last_page || 1);
                setTotal(response.data.total || 0);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }

    const getProduct = (id) => {
        axios.get(route('admin.products.getProduct', { id }))
            .then(response => {
                setSelectedProduct(response.data);
                setEditProductModal(true);
            })
            .catch(error => {
                console.error("There was an error fetching the product!", error);
            });
    }

    const getProductComplete = (id) => {
        axios
            .get(route("admin.products.getProduct", { id, complete: true }))
            .then((response) => {
                setSelectedProduct(response.data);
                setProductSheetModal(true);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the product!",
                    error
                );
            });
    };

    const getInventory = (product) => {
        setSelectedProduct(product);
        const url = route("admin.products.movements.get", { product_id: product.id, all: true });
        axios.get(url)
            .then(response => {
                setMovements(response.data);
                setInventoryModal(true);
            })
            .catch(error => {
                console.error("There was an error fetching the inventory!", error);
                setInventoryModal(false);
            });
    }

    const fetchTopSellingProducts = async () => {
        try {
            const response = await getTopSellingProducts();
            setTopProducts(response);
        } catch (error) {
            console.error("There was an error fetching the top selling products!", error);
        }
    }

    React.useEffect(() => {
        getProducts();
        fetchTopSellingProducts();
    }, [page, perPage, search]);


    const headers = [
        //{ key: "code", label: "Código" },
        {
            key: "name",
            label: "Producto",
            render: (value, row) => (
                <>
                    <p className="m-0">{row.code}</p>
                    <p className="m-0">{value}</p>
                </>
            ),
        },
        { key: "category_name", label: "Categoría" },
        { key: "stock", label: "Stock" },
        { key: "minimum_stock", label: "Stock Mínimo" },
        {
            key: "price_sale",
            label: "Precio de Venta",
            render: (value) => (
                <p className="m-0">{parseFloat(value).toFixed(2)}</p>
            ),
        },
    ];

    const actions = [
        {
            key: "product_sheet",
            label: "Ficha",
            icon: FileText,
            onClick: (row) => getProductComplete(row.id)
        },
        {
            key: "edit",
            label: "Editar",
            icon: Edit,
            onClick: (row) => getProduct(row.id),
        },
        {
            key: "manage-prices",
            label: "Precios",
            icon: DollarSign,
            onClick: (row) => {
                setSelectedProduct(row);
                setManagePricesModal(true);
            },
        },
        {
            key: "manage-multimedia",
            label: "Multimedia",
            icon: Image,
            onClick: (row) => {
                setSelectedProduct(row);
                setManageMultimediaModal(true);
            },
        },
        {
            key: "technical-specifications",
            label: "Especificaciones",
            icon: FileText,
            onClick: (row) => {
                setSelectedProduct(row);
                setManageTechnicalSpecificationsModal(true);
            },
        },
        {
            key: "copy",
            label: "Ingreso",
            icon: Copy,
            onClick: (row) => {
                setSelectedProduct(row);
                setCreateBatchModal(true);
            },
        },
        {
            key: "inventory",
            label: "Inventario",
            icon: FolderKanban,
            onClick: (row) => {
                getInventory(row);
            },
            //show: (row) => row.activo, // Solo mostrar si está activo
        },
        { divider: true },
        {
            key: "delete",
            label: "Eliminar",
            icon: Trash2,
            onClick: (row) => {
                if (confirm(`¿Eliminar a ${row.nombre}?`)) {
                    alert(`${row.nombre} eliminado`);
                }
            },
            className: "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
        },
    ];
    
    return (
        <AdminLayout auth={auth}>
            {/*<TopSellingProduct products={topProducts} />*/}

            <div className="flex justify-between items-center mt-3">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Productos
                </h2>
                <button
                    onClick={() => setCreateProductModal(true)}
                    className="px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Agregar Producto
                </button>
            </div>

            <div className="mt-3 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <DynamicTable
                    enableSorting={false}
                    headers={headers}
                    data={products}
                    actions={actions}
                    page={page}
                    lastPage={lastPage}
                    itemsPerPage={perPage}
                    total={total}
                    onChangeItemsPerPage={setPerPage}
                    onChangePage={setPage}
                    actionsConfig={{
                        position: "right",
                    }}
                    searchable={true}
                    search={search}
                    searchPlaceholder="Buscar productos..."
                    onChangeSearch={setSearch}
                />
            </div>

            {/* Modal to create product */}
            <Modal
                isOpen={createProductModal}
                onClose={() => setCreateProductModal(false)}
                title="Crear Producto"
                size="large"
                closeOnOverlay={false}
            >
                <ProductForm onSubmit={handleSubmitCreateProduct} />
            </Modal>

            {/* Modal to edit product */}
            <Modal
                isOpen={editProductModal}
                onClose={() => setEditProductModal(false)}
                title="Editar Producto"
                size="large"
                closeOnOverlay={false}
            >
                <ProductFormEdit
                    onSubmit={handleSubmitEditProduct}
                    initialData={selectedProduct}
                />
            </Modal>

            {/* Modal to manage prices */}
            <Modal
                isOpen={managePricesModal}
                onClose={() => {
                    setManagePricesModal(false);
                    setSelectedProduct(null);
                    getProducts();
                }}
                title="Administrar Precios"
                size="large"
                closeOnOverlay={false}
            >
                <ProductPricesForm initialData={selectedProduct} />
            </Modal>

            {/* Modal to manage multimedia */}
            <Modal
                isOpen={manageMultimediaModal}
                onClose={() => {
                    setManageMultimediaModal(false);
                    setSelectedProduct(null);
                    getProducts();
                }}
                title="Administrar Multimedia"
                size="large"
                closeOnOverlay={false}
            >
                <div
                    style={{
                        maxHeight: "calc(100vh - 200px)",
                        overflowY: "auto",
                    }}
                >
                    <ProductMultimedia initialData={selectedProduct} />
                </div>
            </Modal>

            {/* Modal to manage technical specifications */}
            <Modal
                isOpen={manageTechnicalSpecificationsModal}
                onClose={() => {
                    setManageTechnicalSpecificationsModal(false);
                    setSelectedProduct(null);
                    getProducts();
                }}
                title="Administrar Especificaciones Técnicas"
                size="large"
                closeOnOverlay={false}
            >
                <div
                    style={{
                        maxHeight: "calc(100vh - 200px)",
                        overflowY: "auto",
                    }}
                >
                    <ProductTechnicalSpecifications
                        initialData={selectedProduct}
                    />
                </div>
            </Modal>

            {/* Modal to view product sheet */}
            <Modal
                isOpen={productSheetModal}
                onClose={() => {
                    setProductSheetModal(false);
                    setSelectedProduct(null);
                }}
                title={"Ficha del Producto: " + (selectedProduct?.name || "")}
                size="full"
                closeOnOverlay={false}
            >
                <div
                    style={{
                        maxHeight: "calc(100vh - 200px)",
                        overflowY: "auto",
                    }}
                >
                    <ProductSheet product={selectedProduct} />
                </div>
            </Modal>

            {/* Modal to create batch */}
            <Modal
                isOpen={createBatchModal}
                onClose={() => setCreateBatchModal(false)}
                title="Registro de ingreso"
                size="large"
                closeOnOverlay={false}
            >
                <BatchForm
                    onSubmit={handleSubmitCreateBatch}
                    product={selectedProduct}
                />
            </Modal>

            {/* Modal to view inventory */}
            <Modal
                isOpen={inventoryModal}
                onClose={() => setInventoryModal(false)}
                title={
                    "Inventario" +
                    (selectedProduct ? ` - ${selectedProduct.name}` : "")
                }
                size="full"
                closeOnOverlay={false}
            >
                {/** Scrollable content over inventory */}
                <div
                    style={{
                        maxHeight: "calc(100vh - 200px)",
                        overflowY: "auto",
                    }}
                >
                    {movements.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No hay movimientos registrados para este producto.
                        </p>
                    ) : (
                        <Inventory
                            _movements={movements}
                            product={selectedProduct}
                        />
                    )}
                </div>
            </Modal>
        </AdminLayout>
    );
}

