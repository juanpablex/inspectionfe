import { FC, useEffect, useState } from "react";
import PersonTypeModal from "./PersonTypeModal";

export default function PersonTypeModalParent(): ReturnType<FC> {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(()=>{

    },[showModal]);

    function toggleModal() {
        setShowModal(!showModal);
    }

    return (
        <>
        
           <div className="card">
                <span>Toggle Card</span>
                <button type="button" className="btn" onClick={toggleModal}>Open</button>
            </div>
            <PersonTypeModal open={showModal} onClose={toggleModal} parent={null}>
                <div>
                    Main Content goes here!
                </div>
            </PersonTypeModal>
        </>
    );
}