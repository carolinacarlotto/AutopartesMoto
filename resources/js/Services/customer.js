export const getCustomers = async (params) => {
    try {
        const response = await axios.get(route("admin.customers.get"), { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};

export const createCustomer = async (data) => {
    try {
        const response = await axios.post(route("admin.customers.store"), data);
        return response.data;
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}


