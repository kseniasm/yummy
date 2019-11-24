import React from "react";
import { connect } from "react-redux";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import UnauthModal from "./UnauthModal";

const modalLookup = {
  LoginModal,
  RegisterModal,
  UnauthModal
};

const ModalManager = ({ currentModal }) => {
  let renderModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;

    const ModalComponent = modalLookup[modalType];

    renderModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderModal}</span>;
};

const mapStateToProps = state => {
  return { currentModal: state.modals };
};

export default connect(mapStateToProps)(ModalManager);
