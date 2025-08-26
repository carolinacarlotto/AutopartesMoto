import {
    Home,
    Users,
    Settings,
    BarChart3,
    FileText,
    HelpCircle,
    User,
    CreditCard,
    Globe,
    Database,
    Award,
    BriefcaseBusiness
} from 'lucide-react';

export const menuConfig = {
    admin: [
        {
            id: "overview",
            label: "Mi Dashboard",
            icon: Home,
            to: "admin.home",
            exact: true,
        },
        {
            id: "products",
            label: "Productos",
            icon: Award,
            to: "admin.products.index",
        },
        {
            id: "sales",
            label: "Ventas",
            icon: FileText,
            to: "admin.sales.index",
        },
        {
            id: "customers",
            label: "Clientes",
            icon: Users,
            to: "admin.customers.index",
        },
    ],
};

// Función helper para obtener el menú según el tipo de usuario
export const getMenuByUserType = (userType) => {
    return menuConfig[userType] || [];
};
