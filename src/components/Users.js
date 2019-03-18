import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import FontAwesome from "react-fontawesome";
import PropTypes from 'prop-types';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            noUsers: false,
            loading: true,
            showUsers: [],
            value: true,
            showNav: false,
            userFilter: false
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.loadUsers();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        console.log(event)
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            alert('You clicked outside of me!');
        }
    }

    loadUsers = () => {
        let formData = new FormData();
        formData.append('table', 'user_details');
        axios({
            method: 'post',
            data: formData,
            url: 'http://18.188.105.214/collections',
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then((response) => {
            let data = response.data;
            let i = 0;
            let users = [];
            for (i; i < data.length; i++) {
                let user = {

                };
                users.push(user);
                // As not async, check all done before updating state
                if (i === data.length - 1) {
                    this.setState({users: users});
                    this.setState({loading: false});
                }
            }
            if (users.length === 0) {
                this.setState({loading: false});
                this.setState({
                    noUsers: true
                });
            }
        })
        .catch((response) => {
            console.log(response);
            // Set first to show
            let users = [
                {
                    id: 'Z67YnrL30DOOxlzYFhcqXWAbmJm2',
                    firstName: 'Jack',
                    lastName: 'Allcock',
                    show: true
                },
                {
                    id: 'iSpLh7cFf0W8qCxd48eL4Gk0zAr2',
                    firstName: 'Morgan',
                    lastName: 'Jones',
                    show: true
                },
                {
                    id: 'KUfa5sxh9efBABZmCZybDUlU5s42',
                    firstName: 'Subash',
                    lastName: 'Poudyal',
                    show: true
                }
            ];
            this.setState({users: users});
            this.setState({loading: false});
        });
    };

    handleUserChange(event) {
        const markers = this.props.data;
        const target = event.target;
        const clickToShow = target.type === 'checkbox' ? target.checked : target.value;
        const userId = target.name;
        const users = this.state.users;
        let showUsers = [];
        // Change all users to show if clicked to show and vice versa
        let i = 0;
        for (i; i < users.length; i++) {
            if (users[i].id === userId) {
                users[i]['show'] = clickToShow;
            }
        }
        // Update checkbox's
        this.setState({
            [userId]: clickToShow,
            users: users,
        });
        // Change all locations by user id if checked or not
        i = 0;
        for (i; i < markers.length; i++) {
            if (markers[i].userId === userId) {
                markers[i]['show'] = clickToShow;
            }
        }
        // Only send a list of checked markers back to map
        i = 0;
        for (i; i < markers.length; i++) {
            if (markers[i]['show']) {
                showUsers.push(markers[i])
            }
        }
        // callback to app.js
        this.props.userCallback(showUsers)
    }

    getLastLocationsForUsers = () => {
        let locations = this.props.data;
        let groups = {};
        for (let i = 0; i < locations.length; i++) {
            let userId = locations[i].userId;
            if (!groups[userId]) {
                groups[userId] = [];
            }
            groups[userId].push(locations[i]);
        }
        locations = [];
        for (let groupName in groups) {
            locations.push(groups[groupName][groups[groupName].length - 1]);
        }

        // callback to app.js
        this.props.userCallback(locations)
    };

    onSideBarClick = (route) => {
        if (route === 'open-nav') {
            this.setState({
                showNav: true,
            });
        }
        else if (route === 'user-filter') {
            this.setState({
                userFilter: true,
            });
        }
        else if (route === 'lots') {
            this.setState({
                showParking: true,
                showAllUsers: false,
                showMap: false,
                showParkers: false
            });
        }
        else {
            this.setState({
                showAlert: true,
                alertTitle: 'No route yet',
                alertInfo: 'Sorry, no route has been added for '+route+' yet!'
            });
        }
    };

    render() {
        return (
            <div>

                <div className='users-side-tab'>
                    <FontAwesome
                        onClick={() => this.onSideBarClick('open-nav')}
                        name='arrow-left'
                        className='tab-center'
                        size='2x'
                    />
                </div>

                {this.state.showNav ?
                    <div className='users-side-nav'>

                    </div>
                    : null
                }

                {this.state.userFilter ?
                    <div className="user-filter-container">
                        <h3>Filter by User</h3>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={50}
                            color={'#ffffff'}
                            loading={this.state.loading}
                        />
                        <div className="user-list">
                            {this.state.users.map(user => (
                                <div className='user' key={user.id}>
                                    <label className='user-label'>
                                        {user.id + ' (' + user.firstName + ' ' + user.lastName +')'}
                                        <input
                                            type="checkbox" name={user.id} checked={user['show']} onChange={this.handleUserChange}/>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default Users;

Users.propTypes = {
    children: PropTypes.element.isRequired,
};