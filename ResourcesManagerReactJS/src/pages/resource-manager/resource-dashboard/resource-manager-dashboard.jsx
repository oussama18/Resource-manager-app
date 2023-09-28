import {Routes,Route, Link} from 'react-router-dom';

import '../../../ui/App.css';
import './resource-manager-dashboard.css';

import ResourceManagerNavbar from '../../../components/resource-manager/ResourcesNavBar';
import ResourcesList from '../../../components/resource-manager/ResourcesList';
import DemandesList from '../../../components/resource-manager/DemandesList';
import AllocationsList from '../../../components/resource-manager/AllocationsList';
import Create from '../resource-create/create';

const ResourcesDashboard = () => {
    return(
        <div className="content">
            <ResourceManagerNavbar />

            <main className='main-resource-dashboard'>
                <div className="container pd-t-1">
                    <div className='main-content'>
                        <Routes>
                            <Route path="/resources" element={<ResourcesList />} />
                            <Route path="/demandes" element={<DemandesList />} />
                            <Route path="/allocations" element={<AllocationsList />} />
                            <Route path="/resources/create" element={<Create />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResourcesDashboard;