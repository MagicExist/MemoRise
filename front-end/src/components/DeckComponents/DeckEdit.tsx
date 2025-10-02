import React from "react"
import { useParams } from "react-router-dom";

const DeckEdit: React.FC = () =>{
    const { deckId } = useParams<{ deckId: string }>();


    return (
        <>
            <h1>Edit {deckId}</h1>
        </>
    )
}

export default DeckEdit;