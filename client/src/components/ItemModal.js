import React, { Component } from "react";
import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   Form,
   FormGroup,
   Label,
   Input,
} from "reactstrap";
import { addItem } from "../actions/itemActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ItemModal extends Component {
   state = {
      modal: false,
      name: "",
   };

   static propTypes = {
      isAuthenticated: PropTypes.bool,
   };

   toggle = () => {
      this.setState({
         modal: !this.state.modal,
      });

      console.log(this.props);
   };

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   };

   onSubmit = (e) => {
      e.preventDefault();
      const newItem = {
         name: this.state.name,
         userId: this.props.userId || localStorage.getItem("USER"),
      };

      console.log("USER ID", this.props.userId);
      this.props.addItem(newItem);
      this.toggle();
   };

   render() {
      return (
         <div>
            {this.props.isAuthenticated ? (
               <Button
                  color="dark"
                  style={{ marginBottom: "2em" }}
                  onClick={this.toggle}
               >
                  Add Item
               </Button>
            ) : (
               <h4 className="mb-3 ml-4">
                  Please log in or register to manage your very own shopping
                  list.
               </h4>
            )}
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
               <ModalHeader toggle={this.toggle}>
                  {" "}
                  Add to Shopping List
               </ModalHeader>
               <ModalBody>
                  <Form onSubmit={this.onSubmit}>
                     <FormGroup>
                        <Label for="item">Item</Label>
                        <Input
                           type="text"
                           name="name"
                           id="item"
                           placeholder="Add Shopping Item"
                           onChange={this.onChange}
                        />
                        <Button color="dark" style={{ marginTop: "2em" }} block>
                           Add Item
                        </Button>
                     </FormGroup>
                  </Form>
               </ModalBody>
            </Modal>
         </div>
      );
   }
}

const mapToStateProps = (state) => ({
   item: state.item,
   isAuthenticated: state.auth.isAuthenticated,
   userId: state.auth.user ? state.auth.user._id : null,
});

export default connect(mapToStateProps, { addItem })(ItemModal);
