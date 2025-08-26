import React, { useState } from 'react';
import { Menu, X, Home, Users, Settings, BarChart3, FileText, HelpCircle, Bell, Search, User, ChevronDown, Github, Twitter, Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

// Componente Footer
const Footer = ({ isSidebarExpanded }) => {
    return (
        <footer className="bg-gray-900 text-white mt-8">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Columna 1 - Información de la empresa */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Mi App</h3>
                            <p className="text-gray-400 text-sm">
                                Soluciones innovadoras para tu negocio. Transformamos ideas en realidad.
                            </p>
                        </div>

                        {/* Columna 2 - Enlaces rápidos */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Inicio</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Servicios</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Sobre Nosotros</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contacto</a></li>
                            </ul>
                        </div>

                        {/* Columna 3 - Recursos */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Documentación</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm">API</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Blog</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Soporte</a></li>
                            </ul>
                        </div>

                        {/* Columna 4 - Redes sociales */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Github className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Twitter className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Linkedin className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Mail className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Línea divisoria y copyright */}
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © 2025 Mi App. Todos los derechos reservados.
                            </p>
                            <div className="mt-4 sm:mt-0 flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-white text-sm">Privacidad</a>
                                <a href="#" className="text-gray-400 hover:text-white text-sm">Términos</a>
                                <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
