import {router, usePage} from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getMenuByUserType } from '../Config/menu';

export const useMenu = () => {
    const { auth, url } = usePage().props;
    const [activeItem, setActiveItem] = useState('');
    const [openSubmenus, setOpenSubmenus] = useState([]);

    const userType = auth?.role || '';
    const menuItems = getMenuByUserType(userType);

    // Detectar el item activo basado en la URL actual
    useEffect(() => {
        const currentPath = url || window.location.pathname;
        let path = '';
        // Buscar el item activo
        for (const item of menuItems) {
            path = route(item.to);
            if (item.exact && currentPath === path) {
                setActiveItem(item.id);
                break;
            } else if (!item.exact && currentPath.startsWith(path)) {
                setActiveItem(item.id);

                // Si tiene subitems, abrir el submenu
                if (item.subItems) {
                    setOpenSubmenus(prev =>
                        prev.includes(item.id) ? prev : [...prev, item.id]
                    );
                }
                break;
            }
        }
    }, [url, menuItems]);

    const toggleSubmenu = (itemId) => {
        setOpenSubmenus(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const isSubmenuOpen = (itemId) => openSubmenus.includes(itemId);

    const handleMenuItemClick = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveItem(item.id);

        router.visit(route(item.to), {
            preserveState: true,
            preserveScroll: true,
            only: ['content']
        });
    };

    return {
        menuItems,
        activeItem,
        setActiveItem,
        userType,
        toggleSubmenu,
        isSubmenuOpen,
        openSubmenus,
        handleMenuItemClick
    };
};
