import { Link } from "react-router-dom";

const Account = ({ account , handleDelete }) => {

  return (
    <div className="resource flex-center">
      <div className="block maker">{account.userName}</div>
      <div className="block maker">{account.m_Personne.email}</div>
      <div className="block maker">{account.roles[0]}</div>
      {/* <div className="block maker">{account.m_Personne.type}</div> */}
      {/* <div className="block date">{account.password}</div> */}
      <div className="tool update flex-center">
        <div className="btn btn-update">
          <Link className='link'  to={"edit/id?"+account.id}><i className="fas fa-edit" aria-hidden="true"></i></Link>
        </div>
      </div>
      <div className="tool delete flex-center">
        <div className="btn btn-delete">
          <li onClick={(e) => { handleDelete(account.userName) } } className='link'><i className="fas fa-trash" aria-hidden="true"></i></li>
        </div>
      </div>
    </div>
  );
};

export default Account;
