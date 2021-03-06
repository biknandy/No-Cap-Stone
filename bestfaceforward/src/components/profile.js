import React from "react";
import {Card,Col,Row} from 'react-bootstrap';

//legacy - do not use

const Profile=(props)=>{
    if(props.right){
      return (
        <Card className = "shadow" style={{marginLeft:"10%",marginBottom: "10%", width:"90%"}}>
          <Card.Header as="h1">{props.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>
                  <img style={{height: "200px"}} src={props.image}/>
                </Col>
                <Col>
                  <div>{props.yearMajor}</div>
                  <div>{props.linkedIn}</div>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card className = "shadow" style={{marginBottom: "10%", width:"90%"}}>
          <Card.Header as="h1">{props.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>
                  <img style={{height: "200px"}} src={props.image}/>
                </Col>
                <Col>
                  <div>{props.yearMajor}</div>
                  <div>{props.linkedIn}</div>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
}

export default Profile;
