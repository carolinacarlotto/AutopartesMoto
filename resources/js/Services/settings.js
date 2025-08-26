export const getSettings = async () => {
    try {
        const response = await axios.get(route("admin.settings.get"));
        return response.data;
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw error;
    }
};

export const storeSettings = async (data) => {
    try {
        const response = await axios.post(route("admin.settings.store-settings"), data);
        return response.data;
    } catch (error) {
        console.error("Error storing settings:", error);
        throw error;
    }
};

export const updateUser = async (data) => {
    try {
        const response = await axios.post(route("admin.settings.update-user"), data);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const storeTax = async (data) => {
    try {
        const response = await axios.post(route("admin.settings.store-tax"), data);
        return response.data;
    } catch (error) {
        console.error("Error storing tax:", error);
        throw error;
    }
};

export const changeActiveTax = async (id) => {
    try {
        const response = await axios.post(route("admin.settings.change-active-tax", { id }));
        return response.data;
    } catch (error) {
        console.error("Error changing active tax:", error);
        throw error;
    }
};
