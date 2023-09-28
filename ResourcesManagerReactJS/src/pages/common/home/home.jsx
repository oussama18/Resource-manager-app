import '../../../ui/App.css';
import './home.css'

import Header from '../../../components/common/Header';

function Home() {

    return (  
        <div className="content">
            <Header />

            <main className='main-home'>
                <div className="container pd-t-2">
                    <h1>Home Page</h1>
                </div>
            </main>
            
        </div>
    );
}

export default Home;