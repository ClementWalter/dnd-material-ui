import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export class ListDnd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.children || [],
    };
  }

  moveListItem = (dragIndex, hoverIndex) => {
    const { items } = this.state;
    const dragItem = items[dragIndex];

    this.setState((prevState) => {
      const items = [...prevState.items];
      items.splice(dragIndex, 1);
      items.splice(hoverIndex, 0, dragItem);
      return { items }
    });
  };

  render() {
    const { children, ...listProps } = this.props;
    return(
      <List {...listProps}>
        {this.state.items.map((item, index) => (
          {...item, props: { ...item.props, moveListItem: this.moveListItem, index }}
        ))}
      </List>
    )
  }
}

ListDnd.propTypes = {
  children: PropTypes.node,
};

ListDnd.muiName = 'List';

export default DragDropContext(HTML5Backend)(ListDnd);
