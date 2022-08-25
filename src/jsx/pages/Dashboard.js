import React, { Component, Fragment, useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../layouts/Header";
import NavHeader from "../layouts/NavHeader";
import Queries from "../layouts/Queries";
import AddRestaurant from "./AddRestaurant";
import firebase from './Firebase';

const Dashboard = (props) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const history = useHistory();
    const [addModalActive, setAddModalActive] = useState(false);
    const [resCount, setResCount] = useState(0);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setAddModalActive(false);
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const handleClose = () => {
		setAddModalActive(false);
	}

    const getTotalRes = () => {
			const ref = firebase.firestore().collection('restaurant');
			ref.get().then((querySnapshot) => {
                setResCount(querySnapshot.docs.length);
			}).catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

    useEffect(()=> getTotalRes(), [])

    
    return (
        <Fragment>
            <AddRestaurant
			active={addModalActive}
			setActive={setAddModalActive}
            handleClose={handleClose}
			/>
            <div id="dashboard" className="sem_padding align-items">
                <div className="row bg-white m-0">
                    <NavHeader />
                    <div className="dashboard-width">
                        <Header />
                        <div className="price-section">
                            <div className="row m-0">
                                <div className="col-md-12 col-lg-12 col-xl-6">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6">
                                            <div className="price-box-main price-box-01">
                                                <div className="total-price">
                                                    <h3>Add Restaurant</h3>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                                </div>
                                                <div className="add-btn">
                                                    <button className="popUpBtn" data-modal="myModal3" onClick={()=>setAddModalActive(true)}>Add +</button>
                                                </div>
                                                <div className="price-icon02">
                                                    <img src="images/team.png" className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className="price-box-main price-box-02">
                                                <div className="total-price">
                                                    <h6>{resCount}</h6>
                                                    <h5>Total Restaurant</h5>
                                                </div>
                                                <div className="price-icon">
                                                    <img src="images/total-restaurant.png" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="price-box-main price-box-03">
                                                <div className="total-price">
                                                    <h4>Add Product</h4>
                                                    <p>add product from here and start selling it right now</p>
                                                </div>
                                                <div className="add-btn">
                                                    <a href="#">Add +</a>
                                                </div>
                                                <div className="price-icon03">
                                                    <img src="images/box1.png" className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-xl-6">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6">
                                            <div className="price-box-main price-box-04">
                                                <div className="total-price">
                                                    <h6>12</h6>
                                                    <h5>Total Appliances</h5>
                                                </div>
                                                <div className="price-icon">
                                                    <img src="images/total-appliances.png" className="img-fluid" />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className="price-box-main price-box-05">
                                                <div className="total-price">
                                                    <h6>51</h6>
                                                    <h5>Total Sensors</h5>
                                                </div>
                                                <div className="price-icon">
                                                    <img src="images/total-sensors.png" className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-12">
                                            <div className="bg-row">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6">
                                                        <div className="price-box-main price-box-06">
                                                            <div className="price-icon">
                                                                <img src="images/food-tray-01.png" className="img-fluid" />
                                                            </div>
                                                            <div className="total-price">
                                                                <h4>Add Food Product</h4>
                                                                <p>add new food category for restaurant to help with temperature</p>
                                                                <div className="add-btn">
                                                                    <a href="#">Add +</a>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-6">
                                                        <div className="price-box-main price-box-07">
                                                            <div className="price-icon">
                                                                <img src="images/food-tray-02.png" className="img-fluid" />
                                                            </div>
                                                            <div className="total-price">
                                                                <h4>Add Appliance</h4>
                                                                <p>add new appliance for restaurant to help with temperature</p>
                                                                <div className="add-btn">
                                                                    <button className="popUpBtn" data-modal="myModal2">Add +</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <Queries />

                    </div>
                </div>
            </div>
            <div id="myModal2" className="modal">
                <div className="modal-content">
                    <div className="modal-header">

                        <h2>Add Appliances</h2>
                    </div>
                    <div className="modal-body">
                        <form action="#">
                            <div className="form-group">
                                <label for="name">Add Appliance name Name</label>
                                <input className="Category-name form-padding form-control" type="name" id="name" name="name" required="" />
                            </div>
                            <div className="form-group">
                                <label for="name">Choose Categories</label>
                                <div className="select">
                                    <select name="slct" id="slct" className="Category-name">
                                        <option value="1">Categories01</option>
                                        <option value="2">Categories02</option>
                                        <option value="3">Categories03</option>
                                    </select>
                                </div>
                            </div>
                            <div className="upload upload-left">
                                <div className="upload-main-head">Attach Appliance Image</div>
                                <div className="upload-btn-wrapper">
                                    <button></button>
                                    <input type="file" name="myfile" />
                                </div>
                            </div>
                            <input className="submit_btn" type="submit" value="Save" />
                        </form>
                    </div>
                </div>
            </div>
            <div id="myModal3" className="modal custom">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Add Restaurant</h2>
                    </div>
                    <div className="modal-body">
                        <form action="#">
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input className="Category-name category-name02 form-padding form-control" type="fname" id="fname" name="fname" required="" placeholder="Restaurant Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <input className="Category-name category-name02 form-padding form-control" type="lname" id="lname" name="lname" required="" placeholder="Owner Name" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input className="Category-name category-name02 form-padding form-control" type="text" id="Address" name="Address" required="" placeholder="Address" />
                                </div>
                                <div className="form-group col-md-6">
                                    <input className="Category-name category-name02 form-padding form-control" type="email" id="email" name="email" required="" placeholder="Email Address" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input className="Category-name category-name02 form-padding form-control" type="text" id="number" name="number" required="" placeholder="Phone Number" />
                                </div>
                                <div className="form-group col-md-6">
                                    <input className="Category-name category-name02 form-padding form-control" type="text" id="number" name="number" required="" placeholder="Phone Number" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input className="Category-name category-name02 form-padding form-control" type="text" id="number" name="number" required="" placeholder="Number of Sites" />
                                </div>
                            </div>
                            <div className="cancel-btn-group">
                                <input className="submit_btn" type="submit" value="Save" />
                                <a href="restaurants.html" className="cancel-btn">Cancel</a>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Dashboard;
