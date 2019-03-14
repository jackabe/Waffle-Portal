import React, { Component } from 'react';
import '../App.css';

class UserFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        // let data = this.props.data;
        return (
          <div className="user-filter-container">
              <h3>Show by User</h3>
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
