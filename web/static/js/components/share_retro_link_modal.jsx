import React, { Component } from "react"
import Modal from "react-modal"

const timeElapsedLessThanFiveSec = insertedAt => {
  const millisecondsSinceRetroCreation = new Date(insertedAt)
  const timeElapsedSinceRetroCreation = new Date().getTime() - millisecondsSinceRetroCreation
  return (timeElapsedSinceRetroCreation < 5000)
}

class ShareRetroLinkModal extends Component {
  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
    this.state = { shouldOpen: timeElapsedLessThanFiveSec(props.insertedAt) }
  }

  componentWillReceiveProps(nextProps) {
    const { insertedAt } = nextProps
    if (timeElapsedLessThanFiveSec(insertedAt)) {
      this.setState({ shouldOpen: true })
    }
  }

  closeModal() {
    this.setState({ shouldOpen: false })
  }

  render() {
    const { shouldOpen } = this.state

    return (
      <Modal
        contentLabel="Share Retro Link"
        isOpen={shouldOpen}
        className="ui small modal visible active"
        onRequestClose={this.closeModal}
      >
        <div className="ui basic padded segment">
          <button
            className="ui basic compact right floated icon button"
            onClick={this.closeModal}
          >
            <i className="close icon" />
          </button>
          <div className="ui center aligned header">
            <p>
              <i className="big icons">
                <i className="user icon" />
                <i className="corner announcement icon" />
              </i>
            </p>
            Share the unique retro link below with teammates!
          </div>
          <div className="ui fluid input">
            <input readOnly className="ui input" type="text" value={window.location} />
          </div>
        </div>
      </Modal>
    )
  }
}

ShareRetroLinkModal.propTypes = {
  insertedAt: React.PropTypes.string,
}

export default ShareRetroLinkModal