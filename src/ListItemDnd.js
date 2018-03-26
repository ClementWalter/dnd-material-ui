import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
  cursor: 'move',
};

const cardSource = {
  beginDrag: (props) => ({
    id: props.id,
    index: props.index,
  }),
};

const cardTarget = {
  hover: (props, monitor, component) => {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveListItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const withDropTarget = DropTarget('ListItem', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}));

const withDropSource = DragSource('ListItem', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}));

export class ListItemDnd extends Component {
  render() {
    const {
      moveListItem,
      index,
      connectDragSource,
      connectDropTarget,
      isDragging,
      children,
      ...listItemProps
    } = this.props;
    console.log('index', index, 'isDragging', isDragging);
    const opacity = isDragging ? 0.1 : 1;
    return(this.props.connectDragSource(
        this.props.connectDropTarget(
          <div style={{ ...style, opacity }}>
            <ListItem {...listItemProps} >
              {this.props.children}
            </ListItem>
          </div>
        )
      )
    )
  }
}

ListItemDnd.propTypes = {
  moveListItem: PropTypes.func,
  index: PropTypes.number,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

ListItemDnd.muiName = 'ListItem';

export default withDropTarget(withDropSource(ListItemDnd));
