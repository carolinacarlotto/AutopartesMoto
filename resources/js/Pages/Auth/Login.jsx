import React, { useState } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
    const { errors: serverErrors, settings } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);

    // useForm hook de Inertia para mejor manejo de formularios
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/login', {
            preserveScroll: true,
            onSuccess: () => {
                reset('password');
            },
            onError: () => {
                reset('password');
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 rounded-2xl">
            <div className="w-full max-w-md relative">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Inicio de sesión
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Inicia sesión en tu cuenta
                    </p>
                </div>

                {/* Login Card */}
                <div
                    className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
                >

                    {/* Error Alert */}
                    {serverErrors && Object.keys(serverErrors).length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-red-700">
                                {Object.values(serverErrors).flat().map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`
                                        block w-full pl-10 pr-3 py-3 border rounded-lg
                                        focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                        transition-colors duration-200
                                        ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                                    `}
                                    placeholder="tu@ejemplo.com"
                                    autoComplete="email"
                                    autoFocus
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`
                                        block w-full pl-10 pr-10 py-3 border rounded-lg
                                        focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                        transition-colors duration-200
                                        ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                                    `}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        {/*<div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Recordarme
                                </span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Olvidé mi contraseña
                            </Link>
                        </div>*/}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`
                                w-full flex justify-center items-center py-3 px-4 border border-transparent
                                rounded-lg shadow-sm text-white font-medium
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                transition-all duration-200 transform
                                ${processing
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5'
                            }
                            `}
                        >
                            {processing ? (
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                            ) : (
                                'Iniciar sesión'
                            )}
                        </button>
                    </form>


                </div>

                {/* Footer Links */}
                <div className="mt-8 text-center">
                    {/*<div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                        <Link href="/terms" className="hover:text-gray-700">
                            Terminos y condiciones
                        </Link>
                        <span>•</span>
                        <Link href="/privacy" className="hover:text-gray-700">
                            Politica de privacidad
                        </Link>
                        <span>•</span>
                        <Link href="/contact" className="hover:text-gray-700">
                            Contacto
                        </Link>
                    </div>*/}
                    <p className="mt-4 text-xs text-gray-400">
                        © {new Date().getFullYear()} {settings?.app_name ? settings.app_name : "Sales Management"}. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
}
