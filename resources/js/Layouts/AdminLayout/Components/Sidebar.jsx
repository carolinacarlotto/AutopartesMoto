import React from "react";
import { Link, router } from "@inertiajs/react";
import { ChevronDown, ChevronRight, LogOut, X } from "lucide-react";
import { useMenu } from "@/Hooks/useMenu.js";

const Sidebar = ({ isExpanded, setIsSidebarExpanded, auth }) => {
    const {
        menuItems,
        activeItem,
        toggleSubmenu,
        isSubmenuOpen,
        handleMenuItemClick,
    } = useMenu();

    const renderMenuItem = (item, isSubItem = false) => {
        const Icon = item.icon;
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isActive = activeItem === item.id;
        const isOpen = isSubmenuOpen(item.id);

        if (hasSubItems) {
            return (
                <div key={item.id}>
                    <button
                        onClick={() => toggleSubmenu(item.id)}
                        className={`
                            w-full flex items-center justify-between px-4 py-3 rounded-lg
                            transition-colors duration-200 group
                            ${
                                isActive
                                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                                    : "text-gray-700 hover:bg-gray-50"
                            }
                            ${isSubItem ? "text-sm" : ""}
                        `}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                    >
                        <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            <span>{item.label}</span>
                        </div>
                        {isOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>

                    {isOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                                <Link
                                    key={subItem.id}
                                    onClick={(e) =>
                                        handleMenuItemClick(e, subItem)
                                    }
                                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
                                >
                                    <Icon className="h-4 w-4 inline-block mr-2" />
                                    {subItem.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.id}
                component="button"
                //href={item.to}
                onClick={(e) => handleMenuItemClick(e, item)}
                className={`
          flex items-center space-x-3 px-4 py-3 rounded-lg
          transition-colors duration-200 relative group
          ${
              isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
          }
          ${isSubItem ? "text-sm" : ""}
        `}
            >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {/*{isExpanded ? (*/}
                <span>{item.label}</span>
                {/*) : (*/}
                {/*    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">*/}
                {/*        {t('user.'+item.id, item.label)}*/}
                {/*    </div>*/}
                {/*)}*/}
            </Link>
        );
    };

    return (
        <aside
            className={`${
                isExpanded ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 fixed md:relative min-h-screen z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
        >
            <div className="flex flex-col">
                <div className="md:hidden flex justify-end p-4">
                    <button
                        onClick={() => setIsSidebarExpanded(false)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                {/* Sección superior del sidebar */}
                <div className={`p-4`}>
                    <div className="px-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-1">
                            {auth?.user?.name || "Usuario"}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {auth?.user?.email}
                        </p>
                    </div>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => renderMenuItem(item))}

                    <div className="absolute bottom-4 px-2 w-full">
                        <button
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg"
                            onClick={() => router.post("/logout")}
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Cerrar sesión</span>
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
