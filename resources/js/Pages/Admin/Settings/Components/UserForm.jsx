import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, Edit, Plus, Trash2, Check, X } from 'lucide-react';

const UserForm = ({ user, onSave }) => {
    console.log('UserForm props:', { user, onSave });

    const [formData, setFormData] = useState({
        name: user?.name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        old_password: "",
        password: "",
        password_confirmation: "",
    });

    const [isEditing, setIsEditing] = useState(!user);
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const [passwordError, setPasswordError] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                old_password: "",
                password: "",
                password_confirmation: "",
            });
        }
    }, [user]);

    const handleSubmit = () => {
        setPasswordError("");

        // Validar contraseñas si se está cambiando
        if (isChangingPassword) {
            if (!formData.old_password) {
                setPasswordError("Debe ingresar la contraseña actual");
                return;
            }
            if (!formData.password) {
                setPasswordError("Debe ingresar la nueva contraseña");
                return;
            }
            if (formData.password !== formData.password_confirmation) {
                setPasswordError("Las nuevas contraseñas no coinciden");
                return;
            }
            if (formData.password.length < 8) {
                setPasswordError(
                    "La nueva contraseña debe tener al menos 8 caracteres"
                );
                return;
            }
        }

        // Validar contraseña para usuario nuevo
        if (
            !user &&
            (!formData.password ||
                formData.password !== formData.password_confirmation)
        ) {
            setPasswordError("Las contraseñas no coinciden");
            return;
        }

        const dataToSave = {
            name: formData.name,
            last_name: formData.last_name,
            email: formData.email,
        };

        if (isChangingPassword) {
            dataToSave.old_password = formData.old_password;
            dataToSave.password = formData.password;
            dataToSave.password_confirmation = formData.password_confirmation;
        } else if (!user) {
            dataToSave.password = formData.password;
            dataToSave.password_confirmation = formData.password_confirmation;
        }

        onSave(dataToSave);
        setIsEditing(false);
        setIsChangingPassword(false);
        setFormData({
            ...formData,
            old_password: "",
            password: "",
            password_confirmation: "",
        });
        setPasswordError("");
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Información de Usuario
                </h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        <Edit size={16} />
                        Editar
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {user && (
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="changePassword"
                                checked={isChangingPassword}
                                onChange={(e) =>
                                    setIsChangingPassword(e.target.checked)
                                }
                                className="mr-2"
                            />
                            <label
                                htmlFor="changePassword"
                                className="text-sm text-gray-700"
                            >
                                Cambiar contraseña
                            </label>
                        </div>
                    )}

                    {(isChangingPassword || !user) && (
                        <>
                            {user && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contraseña Actual
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showPasswords.old
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="old_password"
                                            value={formData.old_password}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPasswords({
                                                    ...showPasswords,
                                                    old: !showPasswords.old,
                                                })
                                            }
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPasswords.old ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {user ? "Nueva Contraseña" : "Contraseña"}
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPasswords.new
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        minLength="6"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswords({
                                                ...showPasswords,
                                                new: !showPasswords.new,
                                            })
                                        }
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswords.new ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {user
                                        ? "Confirmar Nueva Contraseña"
                                        : "Confirmar Contraseña"}
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPasswords.confirm
                                                ? "text"
                                                : "password"
                                        }
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        minLength="6"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswords({
                                                ...showPasswords,
                                                confirm: !showPasswords.confirm,
                                            })
                                        }
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPasswords.confirm ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {passwordError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">
                                        {passwordError}
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                            <Save size={16} />
                            Guardar
                        </button>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setIsChangingPassword(false);
                                setFormData({
                                    ...formData,
                                    old_password: "",
                                    password: "",
                                    password_confirmation: "",
                                });
                                setPasswordError("");
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                        >
                            <X size={16} />
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            Nombre:
                        </span>
                        <p className="text-gray-800">{formData.name}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            Apellido:
                        </span>
                        <p className="text-gray-800">{formData.last_name}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-600">
                            Email:
                        </span>
                        <p className="text-gray-800">{formData.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserForm;
