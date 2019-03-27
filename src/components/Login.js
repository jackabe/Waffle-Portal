import React, { Component } from 'react';
import fire from '../config/Fire';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).then((u)=>{console.log(u)})
            .catch((error) => {
                console.log(error);
                alert(error.message);
            })
    }
    render() {
        return (
            <div className="col-md-9">
                <form>
                    <div className="form-group">
                        <label form="exampleInputEmail">Email address</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted"> </small>
                    </div>

                    <div className="form-group">
                        <label form="exampleInputPassword">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword" placeholder="Password" />
                    </div>

                    <button type="submit" onClick={this.login} className ="btn btn-primary">Login</button>
                    {/* <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button> */}
                </form>

            </div>
        );
    }
}
