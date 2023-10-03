import { Link } from "react-router-dom";

const TechnicalReport = ({report,handleBreakFix,handleChangeResource,handleSendMail}) => {

    return (  
        <>
        { !report.isHidded ? 
            <div className="resource-report-card flex-center flex-dir-col">
            <div className="type-sec">
                { report.panne.ressource.type === "ordinateur" ?
                    <div className="block type computer"><i className="fas fa-laptop" aria-hidden="true"></i></div>
                    : <div className="block type printer"><i className="fas fa-print" aria-hidden="true"></i></div>
                }
            </div>
            <div className="info-sec">
                <div className="block desc">{report.constat}</div>
            </div>
            <div className="report-sec">
            <div className="flex-center">
                <div className="fix-btn flex-center" onClick={(e) => { handleBreakFix(e,report.id) }} >
                    <li className='link' ><i className="fas fa-recycle" aria-hidden="true"></i></li>
                </div>
                <div className="change-btn flex-center" onClick={(e) => { handleChangeResource(e,report.id) }} >
                    <li className='link' ><i className="fas fa-store-slash" aria-hidden="true"></i></li>
                </div>
                <div className="mail-btn flex-center" onClick={(e) => { handleSendMail(e,report.id) }} >
                    <li className='link' ><i className="fas fa-location-arrow" aria-hidden="true"></i></li>
                </div>
                </div>
            </div>
            </div>
        : ""
        }
        </>
    );
}

export default TechnicalReport;