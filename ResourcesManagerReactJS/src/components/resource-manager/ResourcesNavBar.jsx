import {Link} from 'react-router-dom';

import '../../ui/NavBars.css';

const ResourceManagerNavbar = () => {
    return(
        <div className='rm-nav-bar flex-center fixed'>
            <div className='container flex-center justify-space-between'>
                {/* <div className='logo'>
                    <div>Resource - Manager</div>
                </div> */}
                <div className='flex-center'>
                    <li className='link-container'>
                        <Link className='link'  to="/resource-manager/accounts">Accounts</Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link'  to="/resource-manager/resources">Resources</Link>
                    </li>
                    {/* <li className='link-container'>
                        <Link className='link'  to="/resource-manager/demandes">Demandes</Link>
                    </li> */}
                    <li className='link-container'>
                        <Link className='link'  to="/resource-manager/allocations">Allocations</Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link'  to="/resource-manager/allocations">Help</Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link'  to="/resource-manager/allocations">About</Link>
                    </li>
                </div>
                <div className='flex-center'>    
                    <li className='link-container'>
                        <Link className='link link-icon flex-center'  to="/"><i className='fas fa-home icon'></i></Link>
                    </li>    
                    <li className='link-container'>
                        <Link className='link link-icon flex-center'  to="/About"><i className='fas fa-bell icon'></i></Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link link-icon flex-center'  to="/About"><i className='fas fa-cog icon'></i></Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link link-icon flex-center'  to="/About"><i className='fas fa-th icon'></i></Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link link-icon flex-center'  to="/About"><i className='fas fa-user icon'></i></Link>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default ResourceManagerNavbar;