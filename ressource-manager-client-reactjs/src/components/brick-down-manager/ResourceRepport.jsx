import { Link } from "react-router-dom";

import "../../ui/App.css";

const ResourceRepport = ({resource,handlePopUp}) => {

    return (  
        <div className="resource-report-card flex-center flex-dir-col">
            <div className="type-sec">
                { resource.ressource.type === "ordinateur" ?
                    <div className="block type computer"><i className="fas fa-laptop" aria-hidden="true"></i></div>
                    : <div className="block type printer"><i className="fas fa-print" aria-hidden="true"></i></div>
                }
            </div>
            <div className="info-sec flex-center justify-space-between">
                <div className="block brand">{resource.ressource.marque}</div>
                { resource.ressource.status === "Disponible" ?
                    <div className="block status dispo"><i className="fas fa-calendar-check" aria-hidden="true"></i></div>
                    : resource.ressource.status === "En_Panne" ?
                    <div className="block status panne"><i className="fas fa-tools" aria-hidden="true"></i></div>
                    :
                    <div className="block status deleted"><i className="fas fa-ban" aria-hidden="true"></i></div>
                }

                {/* <div className="block garentie"> garentie : {resource.ressource.garantie}</div> */}
            </div>
            <div className="report-sec">
                <div className="flex justify-space-between">
                    <div className="block date">{ resource.ressource.date_livraison }</div>
                        {resource.ressource.status === "Disponible" ? 
                            <div className="report-btn flex-center" onClick={(e) => { handlePopUp(e,resource) }} >
                                <li className='link' ><i className="fas fa-clinic-medical" aria-hidden="true"></i></li>
                            </div> 
                        :   
                        <div className="report-btn flex-center">
                                <li className='link ban' ><i className="fas fa-ban" aria-hidden="true" disabled></i></li>
                            </div>
                        }
                </div>
            </div>
        </div>
    );
};

export default ResourceRepport;