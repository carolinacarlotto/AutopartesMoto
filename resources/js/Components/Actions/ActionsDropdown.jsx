import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical, MoreHorizontal, Ellipsis } from 'lucide-react';

// actions dropdown component
const ActionsDropdown = ({ 
  actions = [], 
  row, 
  buttonIcon: ButtonIcon = MoreVertical,
  buttonClassName = '',
  dropdownClassName = '',
  position = 'left' // 'left' o 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 'auto', bottom: 'auto' });
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Calcular posición del dropdown
  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Espacio disponible abajo y arriba
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      
      // Si no hay suficiente espacio abajo, mostrar arriba
      if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        setDropdownPosition({ bottom: '100%', top: 'auto' });
      } else {
        setDropdownPosition({ top: '100%', bottom: 'auto' });
      }
    }
  }, [isOpen]);

  const handleActionClick = (action) => {
    if (action.onClick) {
      action.onClick(row);
    }
    setIsOpen(false);
  };

  // Filtrar acciones visibles
  const visibleActions = actions.filter(action => 
    action.show === undefined || action.show(row)
  );

  if (visibleActions.length === 0) return null;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer ${buttonClassName}`}
        aria-label="Acciones"
      >
        <ButtonIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div 
          className={`
            absolute mt-2 mb-2 min-w-[160px] rounded-md shadow-lg 
            bg-white  
            border border-gray-200 
            ${position === 'right' ? 'right-0' : 'left-0'}
            ${dropdownClassName}
          `}
          style={{
            top: dropdownPosition.top,
            bottom: dropdownPosition.bottom,
            zIndex: 9999,
          }}
        >
          <div className="py-1 max-h-[320px] overflow-y-auto">
            {visibleActions.map((action, index) => {
              // Separador
              if (action.divider) {
                return (
                  <div key={`divider-${index}`} className="border-t border-gray-200 my-1" />
                );
              }

              const Icon = action.icon;
              const isDisabled = action.disabled && action.disabled(row);
              
              return (
                <button
                  key={action.key || index}
                  onClick={() => !isDisabled && handleActionClick(action)}
                  disabled={isDisabled}
                  className={`
                    w-full flex items-center gap-3 px-4 py-1 text-sm text-left
                    ${isDisabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : `${action.className || 'text-gray-700  hover:bg-gray-100 '}`
                    }
                    transition-colors
                  `}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdown;