import React from 'react';
import ReactDOM from 'react-dom';
import { Container , Row, Col} from 'reactstrap';
import '../styles/admin-nav.css';



const AdminNav = () => {    
    return <header className="admin__header">
        <div className='admin__nav-top'>
        <Container>
            <div className='admin__nav-wrapper-top'>
                <div className='logo'>
                    <h2>Admin Panel</h2>
                </div>
                <div className="search__box">
                    <input type='text' placeholder='search' />
                </div>

                <div className='admin__nav-top-right'>
                    <span><i class="ri-notification-3-line"></i></span>
                    <span><i class="ri-settings-2-line"></i></span>
                    {/* <img src={logo192} alt="" /> */}

                </div>

            </div>
        </Container>
        </div>
    </header>

}


export default AdminNav;