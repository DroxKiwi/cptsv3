



export const ls = {
    get (id){
        return localStorage.getItem(id);
    },

    set (id, value){
        localStorage.setItem(id, value);
        window.dispatchEvent(new Event("storage"));
    },

    getFormated (id){
        return JSON.parse(localStorage.getItem(id));
    },

    setFormated (id, value){
        localStorage.setItem(id, JSON.stringify(value));
        window.dispatchEvent(new Event("storage"));
    },

    rm (id){
        return localStorage.removeItem(id);
    }
};

export const ss = {
    get (id){
        return sessionStorage.getItem(id);
    },

    set (id, value){
        sessionStorage.setItem(id, value);
        window.dispatchEvent(new Event("storage"));
    },

    getFormated (id){
        return JSON.parse(sessionStorage.getItem(id));
    },

    setFormated (id, value){
        sessionStorage.setItem(id, JSON.stringify(value));
        window.dispatchEvent(new Event("storage"));
    },

    rm (id){
        sessionStorage.removeItem(id);
    }
};