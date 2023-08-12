import { useParams } from "@umijs/max"
import PDFViewer from "./viewer/pdf"
import { useEffect } from "react"

const DocDetail: React.FC = () => {


    // 获取uuid
    const uuid = useParams().uuid

    useEffect(()=>{
        
    },[uuid])

    return (
        <>
        <PDFViewer uri="http://localhost:8080/api/v1/doc/test?type=pdf" />
        </>
    )
}

export default DocDetail