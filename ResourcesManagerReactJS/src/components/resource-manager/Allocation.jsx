import React,{useState} from "react";

const Allocation = ({allocation,handleDeallocation,loading}) => {

    return (  
        <div className="resource flex-center">
            <div className="block rs">{allocation.ressource.type}</div>
            {allocation.personelAffect.nomDepartement ? 
                <div className="block username">{allocation.personelAffect.nomDepartement}</div>
                 : <div className="block username">{allocation.personelAffect.nom + " " + allocation.personelAffect.prenom}</div>
            }
            <div className="block date">{allocation.date_affectation}</div>
            <div className="block flex-center">
                <div id={allocation.id} onClick={(e) => { handleDeallocation(allocation.id) }} className={"deallocate" + (loading ? " loading-animation" : "")}>Deallocate</div>
            </div>
        </div>
    );
}

export default Allocation;