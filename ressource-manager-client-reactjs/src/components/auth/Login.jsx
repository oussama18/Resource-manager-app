import {useRef,useState,useEffect} from 'react';
import { useLocation , useNavigate , Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../context/AuthProvider';

import AuthenticationService from '../../auth/services/auth-service';

import '../../ui/Forms.css';
import './login.css';

const Login = () => {

    const { auth,setAuth } = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errorRef = useRef();

    const [username,setUserName] = useState('');
    const [pwd,setPwd] = useState('');

    const [errorMsg,setErrorMsg] = useState('');

    useEffect(()=>{ userRef.current.focus(); },[]);
    useEffect(()=>{ setErrorMsg(''); },[username,pwd]);

    useEffect(() => {

        const authData = AuthenticationService.isAuthenticated();
        
        if(authData.state)
        {
          const tokenData = JSON.parse(authData.currentUserData).access_token;
          
          const authResponseData = JSON.parse(window.atob(tokenData.split('.')[1]));
          
          let user = authResponseData?.sub;
          let accessToken = tokenData;
          let roles = authResponseData?.roles;
          
          setAuth({user,roles,accessToken});

          switch(roles[0]) {
            case 'chefDepartement':
                navigate('/resource-manager/dashboard',{replace:true});
                break;
            case 'responsableRessources':
                navigate('/resource-manager/resources',{replace:true});
                break;
            case 'enseignant':
                navigate('/dashboard/Allocations',{replace:true});
                break;
            case 'technicien':
                navigate('/maintenance/breakdowns',{replace:true});
                break;
            default:
                navigate('/login',{replace:true});
                break;
            }
        }
    
    }, [navigate, setAuth]);
    

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            
            const authResponse = await AuthenticationService.login(username,pwd);
            
            const authResponseData = JSON.parse(window.atob(authResponse.data.access_token.split('.')[1]));
            
            let accessToken = authResponse.data.access_token;
            let roles = authResponseData?.roles;
            
            
            setAuth({user:username,pwd,roles,accessToken});
            
            setUserName('');
            setPwd('');
            
            // navigate(from,{replace:true});

            switch(roles[0]) {
                case 'chefDepartement':
                    navigate('/resource-manager/dashboard',{replace:true});
                    break;
                case 'responsableRessources':
                    navigate('/resource-manager/resources',{replace:true});
                    break;
                case 'enseignant':
                    navigate('/dashboard/Allocations',{replace:true});
                    break;
                case 'technicien':
                    navigate('/maintenance/breakdowns',{replace:true});
                    break;
                default:
                    navigate('/login',{replace:true});
                    break;
            }

            
        }catch(error){
            alert("error !!");
        }
            
    };

    return(
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="form login-form flex-center flex-dir-col pd-1" method='POST' action='#'>
                <div className="form-row">
                    <div className='login-title'>Sign In</div>
                </div>
                <div className="form-row">
                    <div ref={errorRef} className={errorMsg ? "error-msg" : "no-msg"}></div>
                </div>
                <div className="form-row">
                    <label className='login-label'>username</label>
                    <input 
                        type="text" 
                        id='username' 
                        ref={userRef}
                        autoComplete="off"
                        className="input form-input login-input" 
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                        required
                        placeholder="username or email"/>
                </div>
                <br/>
                <div className="form-row">
                    <label className='login-label'>password</label>
                    <input 
                        type="password" 
                        id='password'
                        className="input form-input login-input" 
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        placeholder="password"/>
                </div>
                <br/>
                <div className="form-row">
                    <input type="submit" className="input form-btn btn-primary login-btn" value="Sign In"/>
                </div>
            </form>
        </div>
    );
}

export default Login;