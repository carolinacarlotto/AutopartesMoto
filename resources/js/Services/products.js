export const getProducts = async (params) => {
    try {
        const response = await axios.get(route("admin.products.get"), { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const getTopSellingProducts = async (params) => {
    try {
        const response = await axios.get(route("admin.products.movements.getTopSelling"), { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching top selling products:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const getProductsLowStock = async () => {
    try {
        const response = await axios.get(route("admin.products.getLowStock"));
        return response.data;
    } catch (error) {
        console.error("Error fetching products with low stock:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const getProductMultimedia = async (id) => {
    try {
        const response = await axios.get(route("admin.products.multimedia.get", { id }));
        return response.data;
    } catch (error) {
        console.error("Error fetching product multimedia:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const storeProductMultimedia = async (id, files) => {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files[]", file);
        });
        const response = await axios.post(route("admin.products.multimedia.store", { id }), formData);
        return response.data;
    } catch (error) {
        console.error("Error storing product multimedia:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const deleteProductMultimedia = async (id) => {
    try {
        const response = await axios.delete(route("admin.products.multimedia.destroy", { id }));
        return response.data;
    } catch (error) {
        console.error("Error deleting product multimedia:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const getProductTechnicalSpecifications = async (id) => {
    try {
        const response = await axios.get(route("admin.products.technicalSpecifications.get", { id }));
        return response.data;
    } catch (error) {
        console.error("Error fetching product technical specifications:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const storeProductTechnicalSpecification = async (id, data) => {
    try {
        const response = await axios.post(route("admin.products.technicalSpecifications.store", { id }), data);
        return response.data;
    } catch (error) {
        console.error("Error storing product technical specification:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const deleteProductTechnicalSpecification = async (id) => {
    try {
        const response = await axios.delete(route("admin.products.technicalSpecifications.destroy", { id }));
        return response.data;
    } catch (error) {
        console.error("Error deleting product technical specification:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};
