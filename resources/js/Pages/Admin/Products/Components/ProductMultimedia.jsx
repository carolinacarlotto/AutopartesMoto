import React, { useState, useEffect } from "react";
import { Upload, X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import {
    storeProductMultimedia,
    getProductMultimedia,
    deleteProductMultimedia,
} from "../../../../Services/products";

const ProductMultimedia = ({ initialData }) => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [savedImages, setSavedImages] = useState([]);
    const [currentSavedIndex, setCurrentSavedIndex] = useState(0);

    const handleFileUpload = (event) => {
        const _files = Array.from(event.target.files);

        _files.forEach((file) => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImage = {
                        id: Date.now() + Math.random(),
                        src: e.target.result,
                        name: file.name,
                        file: file
                    };
                    setImages((prevImages) => [...prevImages, newImage]);
                };
                reader.readAsDataURL(file);
            }
        });

        // Reset input
        event.target.value = "";
    };

    const removeSavedImage = async (imageId) => {
        try {
            const response = await deleteProductMultimedia(imageId);
            console.log("Respuesta del servidor:", response);
            // Update the savedImages state to remove the deleted image
            setSavedImages((prevImages) =>
                prevImages.filter((img) => img.id !== imageId)
            );
        } catch (error) {
            console.error("Error al eliminar la imagen guardada:", error);
        }
    };

    const removeImage = (imageId) => {
        let indexRemoved = -1;
        setImages((prevImages) => {
            indexRemoved = prevImages.findIndex((img) => img.id === imageId);
            const newImages = prevImages.filter((img) => img.id !== imageId);
            // Ajustar el índice actual si es necesario
            if (currentIndex >= newImages.length && newImages.length > 0) {
                setCurrentIndex(newImages.length - 1);
            } else if (newImages.length === 0) {
                setCurrentIndex(0);
            }

            return newImages;
        });
    };

    const goToPrevious = () => {
        setCurrentSavedIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentSavedIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToSlide2 = (index) => {
        setCurrentSavedIndex(index);
    };

    const fetchSavedImages = async () => {
        try {
            const response = await getProductMultimedia(initialData.id);
            setSavedImages(response);
        } catch (error) {
            console.error("Error fetching saved images:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const files = images.map((img) => img.file);
        try {
            const response = await storeProductMultimedia(initialData.id, files);
        } catch (error) {
            console.error("Error al guardar imágenes:", error);
        }

        // clear file input and state
        setImages([]);

        // Fetch the updated list of saved images
        fetchSavedImages();
    };

    useEffect(() => {
        fetchSavedImages();
    }, []);

    return (
        <div className="">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Imágenes del producto
            </h2>

            {/* Carousel */}
            {savedImages.length > 0 ? (
                <div className="relative">
                    {/* Main Image Display */}
                    <div
                        className="relative bg-gray-100 rounded-lg overflow-hidden"
                        style={{ height: "400px" }}
                    >
                        <img
                            src={
                                savedImages[currentSavedIndex]
                                    .complete_file_path
                            }
                            alt={savedImages[currentSavedIndex].name}
                            className="w-full h-full object-contain"
                        />

                        {/* Delete Button */}
                        <button
                            onClick={() =>
                                removeSavedImage(savedImages[currentSavedIndex].id)
                            }
                            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                            title="Eliminar imagen"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Navigation Arrows */}
                        {savedImages.length > 1 && (
                            <>
                                <button
                                    disabled={savedImages.length <= 1 || currentSavedIndex === 0}
                                    onClick={goToPrevious}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    disabled={savedImages.length <= 1 || currentSavedIndex === savedImages.length - 1}
                                    onClick={goToNext}
                                    className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {currentSavedIndex + 1} / {savedImages.length}
                    </div>

                    {/* Thumbnails */}
                    {savedImages.length > 1 && (
                        <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
                            {savedImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative flex-shrink-0"
                                >
                                    <button
                                        onClick={() => goToSlide2(index)}
                                        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                            index === currentSavedIndex
                                                ? "border-blue-500 ring-2 ring-blue-200"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        <img
                                            src={image.complete_file_path}
                                            alt={`Miniatura ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>

                                    {/* Mini delete button on thumbnail */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeSavedImage(image.id);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
                                        title="Eliminar"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Image Info */}
                    <div className="mt-4 text-center">
                        <p className="text-gray-600 text-sm">
                            <span className="font-medium">Archivo:</span>{" "}
                            {savedImages[currentSavedIndex].name}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">
                        No hay imágenes cargadas
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        Sube algunas imágenes para comenzar
                    </p>
                </div>
            )}

            <hr className="my-4" />

            {/* Upload Section */}
            <div className="mb-8">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                                Haz clic para subir
                            </span>{" "}
                            o arrastra las imágenes
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, GIF hasta 10MB
                        </p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                    />
                </label>
            </div>

            <div className="relative">
                {/* Image Counter */}
                <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-50">
                    {images.length}
                </div>

                {/* Thumbnails */}
                {images.length > 0 && (
                    <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                className="relative flex-shrink-0"
                            >
                                <button
                                    onClick={() => goToSlide(index)}
                                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                        index === currentIndex
                                            ? "border-blue-500 ring-2 ring-blue-200"
                                            : "border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    <img
                                        src={image.src}
                                        alt={`Miniatura ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>

                                {/* Mini delete button on thumbnail */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage(image.id);
                                    }}
                                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
                                    title="Eliminar"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-6">
                <button
                    disabled={images.length === 0}
                    onClick={handleSubmit}
                    className={"px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors " + (images.length === 0 ? "opacity-50 cursor-not-allowed" : "")}
                >
                    Guardar nuevas imágenes
                </button>
            </div>
        </div>
    );
};

export default ProductMultimedia;
