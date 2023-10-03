import { useState } from 'react';
import {Link} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import '../../ui/NavBars.css';

const NavBar = () => {

    const {auth} = useAuth();

    return(
        <div className='nav-bar flex-center fixed w100'>
            <div className='container flex-center justify-space-between'>
                <div className='logo'>
                    <div>Resource - Manager</div>
                </div>
                <div className='flex-center'>
                    <li className='link-container'>
                        <Link className='link' to="/">Home</Link>
                    </li>
                    { !auth.accessToken ?

                        <li className='link-container'>
                            <Link className='link' to="/login">Login</Link>
                        </li>

                        : 

                        <>
                            { auth.roles[0] === "responsableRessources" ?

                                <li className='link-container'>
                                    <Link className='link'  to="/resource-manager/resources">Resource Manager</Link>
                                </li>

                                : auth.roles[0] === "enseignant" ?

                                <li className='link-container'>
                                    <Link className='link'  to={"/dashboard/"}>User Dashboard</Link>
                                </li>
                                
                                : ""
                            }
                        </>
                    }
                    {/* <li className='link-container'>
                        <Link className='link'  to="/resource-manager">Resource Manager</Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link'  to="/brick-down-Manager">BrickDown Manager</Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link'  to="/trend-manager">Trend Manager</Link>
                    </li> */}
                    <li className='link-container'>
                        <Link className='link'  to="/About">Help</Link>
                    </li>
                    <li className='link-container'>
                        <Link className='link'  to="/About">About</Link>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default NavBar;