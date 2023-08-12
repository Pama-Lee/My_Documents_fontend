import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer: React.FC<{
    uri: string,
}> = (props:{
    uri: string,
}) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [width, setWidth] = useState(0);

    const removeTextLayerOffset = () => {
        const textLayers = document.querySelectorAll(
            ".react-pdf__Page__textContent"
        );
        textLayers.forEach((layer) => {
            const { style } = layer as HTMLElement;
            style.display = "none";
        });
    };

    // 监听窗口大小变化
    useEffect(()=>{
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    },[])


    if (!props.uri) {
        return (
            <>
                <div>
                    <h1>PDF Viewer</h1>
                    <p>uri is undefined</p>
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <Document
                    file={props.uri}
                    onLoadSuccess={({ numPages }) => setPageNumber(numPages)}
                >
                    
                    {
                        Array.from(new Array(pageNumber), (el, index) => (
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '20px',
                            }}>
                            <Page 
                             key={`page_${index + 1}`} 
                             pageNumber={index + 1} 
                             onLoadSuccess={removeTextLayerOffset}
                             renderAnnotationLayer={false}
                             width={(width > 1200) ? 900 : width * 0.8}
                             />
                             </div>
                        ))
                    }
                
                </Document>
            </div>
        </>
    )
}

export default PDFViewer
