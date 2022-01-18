import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
   static propTypes = {
      getItems: PropTypes.func.isRequired,
      item: PropTypes.object.isRequired,
      isAuthenticated: PropTypes.bool,
   };

   componentDidUpdate(prevProps) {
      if (this.props.userId !== prevProps.userId) {
         this.props.getItems(this.props.userId);
         console.log("STATE HAS CHANGED");
      }
   }

   onDeleteClick = (id) => {
      this.props.deleteItem(id);
   };

   render() {
      const { items = [] } = this.props.item;
      return (
         <Container>
            <ListGroup>
               <TransitionGroup className="shopping-list">
                  {items.map(({ _id, name }) => (
                     <CSSTransition key={_id} timeout={500} classNames="fade">
                        <ListGroupItem>
                           {this.props.isAuthenticated ? (
                              <Button
                                 className="remove-btn"
                                 color="danger"
                                 size="sm"
                                 onClick={this.onDeleteClick.bind(this, _id)}
                              >
                                 &times;
                              </Button>
                           ) : null}
                           {name}
                        </ListGroupItem>
                     </CSSTransition>
                  ))}
               </TransitionGroup>
            </ListGroup>
            <Container className="p-5 mt-5 mb-5 text-muted text-center fixed-bottom border-top">
               <p>
                  Made with
                  <a href="https://expressjs.com/"> Express.js </a>
                  by developer
                  <a href="https://github.com/mohur"> Mohur </a>
               </p>
            </Container>
         </Container>
      );
   }
}

const mapToStateProps = (state) => ({
   item: state.item,
   isAuthenticated: state.auth.isAuthenticated,
   userId: state.auth.user ? state.auth.user._id : null,
});

export default connect(mapToStateProps, { getItems, deleteItem })(ShoppingList);
