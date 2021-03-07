import PropTypes from "prop-types";
import React from "react";

export default function AlertMessage({ message, type = "info" }) {
  return <div className={`message message--${type}`}>{message}</div>;
}

AlertMessage.propTypes = {
  message: PropTypes.oneOf([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.oneOf(["info", "error", "success"]),
};
