import prefix from "@/services/prefix"
import { request, useParams } from "@umijs/max"
import Cherry from "cherry-markdown"
import { CherryStatic } from "cherry-markdown/dist/types/CherryStatic"
import React from "react"
import { useEffect } from "react"
import "./index.less"
import PDFViewer from "@/pages/Doc/detail/viewer/pdf"
import DocViewer from "@cyntler/react-doc-viewer"

const BookDocument = () => {

    const params = useParams()

    const [type, setType] = React.useState<string>("")
    const [pdfUrl, setPdfUrl] = React.useState<string>("")

    useEffect(()=>{
        // 清除原本markdown遗留的
        const markdown = document.getElementsByClassName("editor")
        if (markdown) {
            for (let i = 0; markdown.length > i ; i++) {
                markdown[i].innerHTML = "";
            }
        }
    })

    useEffect(() => {
        request(prefix + "/api/v1/doc/detail/" + params.docUuid, {
            headers: {
                "Identify": localStorage.getItem("MD_token") || ""
            }
        }).then((res) => {
            if (res.data.Type === "markdown") {
                setType("markdown")

                request(prefix + "/api/v1/doc/get/" + params.docUuid, {
                    method: "GET",
                    headers: {
                        "Identify": localStorage.getItem("MD_token") || ""
                    }
                }).then((res) => {
                    const container = document.getElementById("markdown-container");
                    if (container) {
                        container.innerHTML = ""; // 清空内容
                    }
                    const cherryInstance = new Cherry({
                        id: 'markdown-container',
                        value: res.data,
                        height: "80vh",
                        toolbars: {
                            toolbar: false,
                        },
                        editor: {
                            defaultModel: 'previewOnly',
                        },
                        forceAppend: false,
                    });

                    cherryInstance.refreshPreviewer();
                })



            } else if (res.data.Type === "pdf") {
                setType("pdf")
            } else if (res.data.Type === "docx") {
                setType("docx")
            }
        })
    }, [params.docUuid])

    const headers = {
        Identify: localStorage.getItem("MD_token") || ""
    }

    return (
        <>
            <div style={{
                width: "100%"
            }}>
                {type === "markdown" ? <>
                    <div id="markdown-container" className='editor' style={{
                        height: "90vh",
                        width: "100%"
                    }} />

                </> : <></>}
                {
                    type === "pdf" ? <>
                    <PDFViewer uri={prefix + "/api/v1/doc/get/" + params.docUuid} />
                    </> : <></>
                }
                {
                    type === "docx" ? <>
                    <DocViewer style={{
                        height: "90vh"
                    }} requestHeaders={headers} documents={[
                       {
                        uri: prefix + "/api/v1/doc/get/" + params.docUuid,
                        // uri : "https://raw.githubusercontent.com/plutext/docx4j/VERSION_11_4_8/docs/Docx4j_GettingStarted.docx",
                        fileType: "docx"
                       }
                    ]} />
                    </> : <>
                    
                    </>
                }
            </div>
        </>
    )

}

export default BookDocument