import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Something went wrong.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;