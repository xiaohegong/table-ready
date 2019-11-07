import React from 'react'
import './bill.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import dummy_menu from './menu_items'
import dummy_bills from './dummy_bills'
import VerticalModal from './verticalModal';

class bill extends React.Component{
    state = {
        customer: dummy_bills,
        modal_hide: false,
        current_clicked_client: null,
        render_modal: () =>{
            if(this.state.current_clicked_client == null){
                return <div></div>
            }
            else{
                return (
                    <VerticalModal
                    table = {this.state.current_clicked_client}
                    show={this.state.modal_hide}
                    onHide={()=>this.setState({
                        modal_hide: false
                    })}>
                    
                    </VerticalModal>
                )
            }
        }
        
    }
    render(){
        return(
            <div>
                {
                    this.state.customer.map((item, index) => (
                        <Card className = "usercard" bg="light" style={{ width: '18rem', cursor: "pointer"}} onClick={()=>{
                            this.setState({
                            modal_hide: true,
                            current_clicked_client: item
                        })}}>
                            <Card.Header className = "header-of-card">
                            <div className = "pic-container">
                                <strong>
                                {item.table_id}
                                </strong>
                                <img className = "user-pic"src = "./images/restaurant_images/boy.png"></img>
                            </div>
                            </Card.Header>
                            <Card.Body>
                            <div className = "num_people">
                                <span><img className = "info-png" src = "./images/restaurant_images/avatar.png"></img><span className = "attendence">4</span></span>
                            </div>
                            </Card.Body>
                      </Card>
                    ))
                }
                {this.state.render_modal()}
            </div>
        )
    }
}

export default bill;