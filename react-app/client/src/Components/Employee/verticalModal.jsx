import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {DatePicker} from "@y0c/react-datepicker";
import {Checkbox} from "@material-ui/core";

const dayjs = require('dayjs');

class VerticalModal extends React.Component {
    state = {
        name: null,
        ppl_number: 0,
        date: dayjs().format('YYYY/MM/DD'),
        time_arrive: null,
        time: null,
        type: null
    };
    showdate = value => {
        const year = value.$y;
        const month = value.$M + 1;
        const day = value.$D;
        const date = `${year}/${month}/${day}`;
        this.state.date = date;
    };

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Adding to Reservations/Waitlist
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} md="5">
                                <Form.Control
                                    onChange={e => (this.state.name = e.target.value)}
                                    placeholder="name"
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Control
                                    onChange={e => (this.state.ppl_number = Number(e.target.value))}
                                    placeholder="Guest #"
                                ></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="auto">
                                <Form.Control
                                    onChange={e => (this.state.time = e.target.value)}
                                    placeholder="Time of arrival"
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="auto">
                                <DatePicker
                                    onChange={value => this.showdate(value)}
                                    showDefaultIcon
                                    initialDate={dayjs().format('YYYY/MM/DD')}
                                    clear
                                ></DatePicker>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="auto">
                                <Form.Label>Reservation</Form.Label>
                                <Checkbox label={"Reservation"} onChange={(e) => {
                                    if (e.target.checked) {
                                        this.state.type = "Reservation";
                                    }
                                }}
                                ></Checkbox>

                            </Form.Group>
                            <Form.Group as={Col} md="auto">
                                <Form.Label>Waitlist</Form.Label>
                                <Checkbox onChange={(e) => {
                                    this.state.type = "Waitlist";
                                }}></Checkbox>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() =>
                            this.props.add_reservation(
                                this.state.name,
                                this.state.ppl_number,
                                this.state.date,
                                this.state.time,
                                this.state.type
                            )
                        }
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default VerticalModal;
