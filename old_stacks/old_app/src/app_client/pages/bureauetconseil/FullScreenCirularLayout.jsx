import { useState } from "react";
import EditorTagBCA from "../../../dashboard/tools/EditorTagBCA";
import ErrorPage from "../../../utils/error-page";

const FullScreenCircularLayout = ({ items, radius = 150, renderItem, hoverScale = 5 }) => {
    const [activeKey, setActiveKey] = useState(null); // Key of the hovered element
    const entries = Object.entries(items); // Convert object to array of [key, value]
    const totalItems = entries.length;

    function isDashboardViewerUrl(url) {
        const regex = /.*\/dashboard\/viewer$/;
        return regex.test(url);
    };

    try {
        return (
            <div
            style={{
                marginTop: '200px',
                marginBottom: '200px',
                position: "relative",
                top: 0,
                left: 0,
                width: "100dvw",
                height: "100dvh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            {entries.map(([key, value], index) => {
                const angle = (index / totalItems) * 2 * Math.PI; // Calculate the angle for each element
                const x = radius * Math.cos(angle); // X position relative to the center
                const y = radius * Math.sin(angle); // Y position relative to the center
    
                return (
                    <div
                        key={key}
                        style={{
                        position: "absolute",
                        left: `calc(50% + ${x}px)`, // Center and apply X offset
                        top: `calc(50% + ${y}px)`, // Center and apply Y offset
                        transform: `translate(-50%, -50%) scale(${activeKey === key ? hoverScale : 1})`, // Scale when hovered
                        zIndex: activeKey === key ? 10 : 1, // Bring to the front if hovered
                        transition: "transform 0.3s ease-in-out", // Smooth hover animation
                        }}
                        onMouseEnter={() => !isDashboardViewerUrl(window.top.location.href) && setActiveKey(key)} // Set the hovered key
                        onMouseLeave={() => !isDashboardViewerUrl(window.top.location.href) && setActiveKey(null)} // Reset the hovered key
                    >
                        <EditorTagBCA id={value.orga_id}>
                            <div
                            style={{
                                width: "100px",
                                height: "100px",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                                cursor: "pointer",
                                textAlign: "center",
                                position: "relative",
                                overflow: "hidden",
                                padding: "10px",
                            }}
                            >
                            <img
                                className="object-cover"
                                src={value.img}
                                style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                marginBottom: activeKey === key ? "10px" : "0", // Add margin only on hover
                                transition: "margin 0.3s ease-in-out",
                                }}
                            />
                                <div
                                    style={{
                                    opacity: activeKey === key ? 1 : 0, // Show content only on hover
                                    transform: activeKey === key ? "translateY(0)" : "translateY(10px)",
                                    transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                                    textAlign: "center",
                                    }}
                                >
                                    <small style={{ fontSize: "4px", color: "gray", display: "block" }}>
                                    {value.role.replaceAll('_GD_', '"').replaceAll('_GS_', "'")}
                                    </small>
                                    <strong style={{ fontSize: "6px", display: "block" }}>{value.name.replaceAll('_GD_', '"').replaceAll('_GS_', "'")}</strong>
                                    <small style={{ fontSize: "4px", color: "gray", display: "block" }}>
                                    {value.description.replaceAll('_GD_', '"').replaceAll('_GS_', "'")}
                                    </small>
                                </div>
                            </div>
                        </EditorTagBCA>
                    </div>
                );
            })}
            </div>
        );
    }
    catch(error){
        return <ErrorPage error={error} />
    }
};

export default FullScreenCircularLayout;
