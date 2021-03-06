import React from 'react'
import { DragSource } from 'react-dnd'
import PropTypes from 'prop-types'

const Types = {
  SPELLINGCARD: 'spellingCard'
}

const spellingCardSource = {
  beginDrag (props) {
    props.lockScroll()
    return { id: props.id, letter: props.letter }
  },

  endDrag (props, monitor) {
    props.unlockScroll()
    if (monitor.didDrop()) {
      monitor.getItem()
      monitor.getDropResult()
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

/**
 * This function is used to create a letter card the student can use to spell words
 * @returns {*} The letter card to render
 * @constructor
 */
function SpellingCard (props) {
  const { id, letter, isDragging, connectDragSource } = props

  return props.connectDragPreview(connectDragSource(
    <div key={id} className='mx-auto rounded' style={{ background: '#4085bd', width: '8%', padding: '1%', boxShadow: '5px 5px 5px 1px #6b6b6b', display: isDragging ? 'none' : 'block' }}>
      <h5 className='mx-auto rounded'>
        {letter}
      </h5>
    </div>
  ))
}

SpellingCard.proptypes = {
  id: PropTypes.number.isRequired,
  key: PropTypes.number.isRequired,
  letter: PropTypes.string.isRequired
}

export default DragSource(Types.SPELLINGCARD, spellingCardSource, collect)(SpellingCard)
