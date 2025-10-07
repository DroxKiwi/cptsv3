



export const imageConverter = {
    async customBase64UploaderCanvas(fromDoc) {
        try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const imageFromTag = fromDoc;
        
            // Ajuste le canvas aux dimensions de l'image
            canvas.width = imageFromTag.naturalWidth;
            canvas.height = imageFromTag.naturalHeight;
        
            // Dessine l'image sur le canvas
            ctx.drawImage(imageFromTag, 0, 0, canvas.width, canvas.height);
        
            // Retourne l'image en base64
            return canvas.toDataURL("image/png");
        } catch (error) {
            console.error("Error converting image to Base64:", error);
        }
    },
};
