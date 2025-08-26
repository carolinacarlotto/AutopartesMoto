export const getSalesAnalytics = async (params) => {
    try {
        const response = await axios.get(route("admin.sales.getAnalytics"), { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching sales analytics:", error);
        throw error;
    }
};

export const getSales = async (params) => {
    try {
        const response = await axios.get(route("admin.sales.get"), { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching sales:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const getSale = async (id) => {
    try {
        const response = await axios.get(route("admin.sales.getSale", { id }));
        return response.data;
    } catch (error) {
        console.error("Error fetching sale:", error);
        throw error;
    }
};

export const createSale = async (data) => {
    try {
        const response = await axios.post(route("admin.sales.store"), data);
        return response.data;
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}


