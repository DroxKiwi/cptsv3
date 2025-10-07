



export const dateConverterToFrench = {
    dateConverter(dateISO) {
        // Diviser la date au format ISO (YYYY-MM-DD) en composants
        const [year, month, day] = dateISO.split("-");
        
        // Reformer la date au format français (DD-MM-YYYY)
        return `${day}-${month}-${year}`;
    }
};
