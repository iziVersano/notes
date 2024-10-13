import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>Something went wrong.</Alert.Heading>
            <p>
              An unexpected error has occurred. Please try reloading the page.
            </p>
            {this.state.error && <hr />}
            <div className="d-flex justify-content-end">
              <Button onClick={this.handleReload} variant="outline-danger">
                Reload Page
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
