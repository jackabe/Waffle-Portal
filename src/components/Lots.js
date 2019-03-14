import React, { Component } from 'react';
import '../App.css';


export default class Lots extends Component {


    render() {

        return (
            <form action="18.188.105.214/newLot" method="POST" style={{marginLeft: "150px"}}>
                    <input type="text" name="lot_id" placeholder={"id"}/> <br />
                    <input type="text" name="city" placeholder={"city"}/> <br />
                    <input type="text" name="capacity" placeholder={"capacity"}/> <br />
                    <input type="text" name="lat" placeholder={"latitude"}/> <br />
                    <input type="text" name="long" placeholder={"longitude"}/> <br />
                    <input type="text" name="name" placeholder={"name"}/> <br />


                <input type="submit" value="Add The Lot" />
            </form>
        );
    }
}