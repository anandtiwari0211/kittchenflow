import { Component, Fragment } from "react";
import {baseURL} from '../../config'

const Header = (props) => {
    const users = localStorage.getItem('KF_USER');
    // console.log('DATA',users);
    return (
        <Fragment>
            <div className="search_header">
                <div className="search-input-img">
                    <img src={`${baseURL}/images/search.png`} className="img-fluid" />
                    <input type="text" className="form-control" placeholder="search hear anything" />
                </div>

                <div className="btn_notification">
                    <div className="user01">
                        <div className="notification">
                            <img src={`${baseURL}/images/notification.png`} className="img-fluid" />
                        </div>
                        <a href="#">
                            <div className="user_text">
                                <h4>Hello, {users}</h4>
                            </div>
                            <div className="user_images">
                                <img src={`${baseURL}/images/user_01.png`} className="img-fluid" />
                            </div>
                        </a>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Header;
