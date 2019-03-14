import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

class UserFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            noUsers: false,
            loading: true
        };
    }

    componentDidMount() {
        this.loadUsers();
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
                let users = [
                    {
                        id: 'Z67YnrL30DOOxlzYFhcqXWAbmJm2',
                        firstName: 'Jack',
                        lastName: 'Allcock',
                    },
                    {
                        id: 'iSpLh7cFf0W8qCxd48eL4Gk0zAr2',
                        firstName: 'Morgan',
                        lastName: 'Jones',
                    }
                ];
                this.setState({users: users});
                this.setState({loading: false});
            });
    };

    render() {
        // let data = this.props.data;
        return (
          <div className="user-filter-container">
              <h3>Show by User</h3>
              <ClipLoader
                  sizeUnit={"px"}
                  size={50}
                  color={'#ffffff'}
                  loading={this.state.loading}
              />
              <div className="user-list">
                  <div className='user'>
                      <label className='user-label'>
                          Jack Allcock
                          <input
                              name="user"
                              type="checkbox"
                              className="user-checkbox"
                              checked={this.state.isGoing}
                              onChange={this.handleInputChange} />
                      </label>
                  </div>
                  <div className='user'>
                      <label className='user-label'>
                          Jack Name
                          <input
                              name="user"
                              type="checkbox"
                              className="user-checkbox"
                              checked={this.state.isGoing}
                              onChange={this.handleInputChange} />
                      </label>
                  </div>
              </div>

          </div>
        );
    }
}

export default UserFilter;
