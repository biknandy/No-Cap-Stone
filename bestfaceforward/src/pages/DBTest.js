import React, { Component } from 'react'


import "../css/about.css";

let Database = require('../components/Database')
export default class DBTest extends Component{
  render(){
    Database.createTable()
    Database.addUser()
    Database.queryUser()
    Database.updateUser()
    Database.queryUser()
    Database.deleteUser()
    return(
      <div>
        <div> TestArea </div>
        <div> TestArea </div>
        <div> TestArea </div>
        <div> TestArea </div>
        <div> TestArea </div>
        <div>Check console to see test db stuff</div>
      </div>
    )
  }


}
