import React, { useState, useEffect, useRef } from 'react';
import { Menu, X,Settings, Bell, Search, User, ChevronDown} from 'lucide-react';
import { router, usePage, Link } from '@inertiajs/react';

// Componente Navbar
const Navbar = ({ toggleSidebar, isSidebarExpanded }) => {
    const settings = usePage().props.settings;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { auth } = usePage().props;

    // Referencias para detectar clics fuera
    const profileRef = useRef(null);

    // Cerrar dropdowns al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Función de logout mejorada
    const handleLogout = () => {
        router.post(route('logout'), {}, {
            onSuccess: () => {
                console.log("Sesión cerrada exitosamente");
            },
            onError: (errors) => {
                console.error("Error al cerrar sesión:", errors);
            }
        });
    };

    // Función de búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('search'), { q: searchQuery }, {
                preserveState: true
            });
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo y botón de toggle */}
                    <div className="flex items-center">
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
                            aria-label={isSidebarExpanded ? 'Contraer menú' : 'Expandir menú'}
                        >
                             <Menu className="h-5 w-5" />
                        </button>
                        <div className="flex-shrink-0 flex items-center ml-4">
                            <h1 className="text-2xl font-bold text-indigo-600">
                                {settings?.app_name || 'Mi Aplicación'}
                            </h1>
                        </div>
                    </div>

                    {/* Barra de búsqueda mejorada */}
                    {/*<div className="hidden md:block flex-1 max-w-md mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </form>
                    </div>*/}

                    {/* Iconos de navegación */}
                    <div className="flex items-center space-x-3">
                        {/* Selector de idiomas */}


                        {/* Notificaciones */}
                        {/*<button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative transition-colors duration-200"
                            aria-label="Notificaciones"
                        >
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>*/}

                        {/* Perfil de usuario */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                                    {auth?.user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="hidden sm:block text-sm font-medium">
                                    {auth?.user?.name || 'Usuario'}
                                </span>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                                    {/* Header del menú */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">
                                            {auth?.user?.name || 'Usuario'}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {auth?.user?.email || 'usuario@ejemplo.com'}
                                        </p>
                                    </div>

                                    {/* Enlaces del menú */}
                                    <div className="py-1">
                                        {/*<Link
                                            component="button"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                router.visit(route('admin.profile'))
                                            }}
                                        >
                                            <User className="h-4 w-4 mr-3 text-gray-400" />
                                            Perfil
                                        </Link>*/}
                                        <Link
                                            component="button"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                router.visit(route('admin.settings.index'))
                                            }}
                                        >
                                            <Settings className="h-4 w-4 mr-3 text-gray-400" />
                                            Configuración
                                        </Link>
                                    </div>

                                    {/* Separador y logout */}
                                    <div className="border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            <svg className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
