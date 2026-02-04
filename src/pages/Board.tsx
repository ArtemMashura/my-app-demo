import { useParams } from "react-router-dom";
import "./Board.css"


export function BoardPage() {
    const { id } = useParams();
    return (
        <>
            <text>test {id}</text>
        </>
    )
}