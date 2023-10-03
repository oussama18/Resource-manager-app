import { Link } from "react-router-dom";

const DropDown = (props) => {

    const items = props.linkItems;
    
    return(
        <div className="pop-up">
            <div className='flex-center'>
                {
                    items.map((item,index) => (
                        <li className='link-container' key={index}>
                            <Link className='link' to={"/"+item}>item</Link>
                        </li>
                    ))
                }
            </div>
        </div>
    );
};

export default DropDown;