import React, { Component } from 'react'
import './Score.css'
import 'antd/dist/antd.css'; 
import { Modal, Input, Icon } from 'antd';



export default class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
    this.props.changeUsername(e.target.value)
  }
  render() {
    const visible = this.props.visible;
    const confirmLoading = this.props.confirmLoading;
    const ModalText = this.props.ModalText;
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div>
        <Modal title="Title"
          visible={visible}
          onOk={this.props.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.props.handleCancel}
        >
        <Input
          placeholder="Enter your username"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={suffix}
          value={userName}
          onChange={this.onChangeUserName}
          ref={node => this.userNameInput = node}
        />              
        </Modal>
      </div>
    );
  }
}