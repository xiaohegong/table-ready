import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
class VerticalModal extends React.Component{
    render(){
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                All set!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <center><h3>You are all set!</h3></center>
            </Modal.Body>
            <Modal.Footer>
              <Link to='/mainpage'>
                <Button onClick={this.props.onHide}>Return to mainpage</Button>
              </Link>
              
            </Modal.Footer>
          </Modal>
        )
    }
}

export default VerticalModal