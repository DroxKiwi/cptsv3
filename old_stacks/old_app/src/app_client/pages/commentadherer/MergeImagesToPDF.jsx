import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { API_livretpages } from "../../services/api/livretpagesServices";
import { Button } from "primereact/button";
import ErrorPage from "../../../utils/error-page";

function MergeImagesToPDF() {

    const [livretpages, setLivretpages] = useState([]);
    const [images, setImages] = useState([]);

    const toBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL());
            };
            img.onerror = reject;
        });
    };

    useEffect(() => {
        try {
            const getData = async () => {
                setLivretpages(await API_livretpages.get_all());
            };
            getData();
        }
        catch(error){
            console.error(error);
        }
    }, []);

    useEffect(() => {
        try {
            var imagesTemp = [];
            for (let i = 0; i < livretpages.length; i++) {
                imagesTemp.push(livretpages[i].img);
            }
            setImages(imagesTemp);
        }
        catch(error){
            console.error(error);
        }
    }, [livretpages])

    const generatePDF = async () => {
        try {
            const pdf = new jsPDF(); // Initialisation du PDF
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
    
            for (let i = 0; i < images.length; i++) {
                const img = new Image();
                img.src = images[i];
    
                // Assure-toi que les images soient chargées avant de les ajouter
                await new Promise((resolve) => {
                    img.onload = () => {
                        // Calcul des dimensions pour ajuster l'image au PDF
                        const ratio = img.width / img.height;
                        const width = pageWidth; // Utilise toute la largeur de la page
                        const height = pageWidth / ratio;
    
                        // Ajout de l'image au PDF
                        pdf.addImage(
                            img,
                            "PNG", // Type d'image (PNG ou JPEG)
                            0,
                            0,
                            width,
                            height
                        );
    
                        // Si ce n'est pas la dernière image, ajoute une nouvelle page
                        if (i < images.length - 1) {
                            pdf.addPage();
                        }
    
                        resolve();
                    };
                });
            }
    
            // Sauvegarde du fichier PDF
            pdf.save("merged-images.pdf");
        }
        catch(error){
            console.error(error);
        }
    };

    try {
        return (
            <div className="grid place-items-center my-10">
                <Button severity="info" raised onClick={generatePDF}>Obtenir le livret en PDF</Button>
            </div>
        );
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default MergeImagesToPDF;
