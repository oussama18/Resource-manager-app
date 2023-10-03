const Breakdown = ({breakdown,handlePopUp}) => {

    return (  
        <div className="resource-report-card flex-center flex-dir-col">
            <div className="type-sec">
                { breakdown.ressource.type === "ordinateur" ?
                    <div className="block type computer"><i className="fas fa-laptop" aria-hidden="true"></i></div>
                    : <div className="block type printer"><i className="fas fa-print" aria-hidden="true"></i></div>
                }
            </div>
            <div className="info-sec">
                <div className="block name">{breakdown.person.nom  +" "+ breakdown.person.prenom}</div>
                {  breakdown.frequence === "rare" ?
                    <div className="block freq rare">{ breakdown.frequence }</div>
                    : breakdown.frequence === "permanente" ?
                    <div className="block freq permanente">{ breakdown.frequence }</div>
                    : 
                    <div className="block freq frequente">{ breakdown.frequence }</div>
                }
                <div className="block order">{ breakdown.orderPanne }</div>
                <div className="block expl">{ breakdown.explication }</div>
            </div>
            <div className="report-sec">
                <div className="constat-btn flex-center" onClick={(e) => { handlePopUp(e,breakdown) }} >
                    <li className='link' ><i className="fas fa-comment-medical" aria-hidden="true"></i></li>
                </div>
            </div>
        </div>
    );
}

export default Breakdown;