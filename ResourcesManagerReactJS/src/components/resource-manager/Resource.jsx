import { Link } from "react-router-dom";

const Resource = ({resource,handleDelete}) => {

    return (  
        <div className="resource flex-center">
            <div className="block type">{resource.type}</div>
            <div className="block maker">{resource.marque}</div>
            <div className="block date">{ resource.date_livraison }</div>
            <div className="block status">
                <span className={resource.isReserve ? "affected" : "not_affected"}>
                    {resource.isReserve ? "Affected" : "Available"}
                </span>
            </div>
            <div className="tool update flex-center">
                <Link className='link'  to={"edit/id?"+resource.id}><i className="fas fa-edit" aria-hidden="true"></i></Link>
            </div>
            <div className="tool delete flex-center">
                <li onClick={(e) => { handleDelete(resource.id) }} className='link' ><i className="fas fa-trash" aria-hidden="true"></i></li>
            </div>
        </div>
    );
}

export default Resource;