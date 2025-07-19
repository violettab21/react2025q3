import { Component, type ErrorInfo, type ReactNode } from 'react';
import './errorBoundary.css';

export class ErrorBoundary extends Component<{
  fallback: string;
  children: ReactNode;
}> {
  state: { isError: boolean } = {
    isError: false,
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.isError) {
      return (
        <div className="fallbackContainer">
          <p>{this.props.fallback}</p>
          <button
            className="recoveryButton"
            onClick={() => {
              history.go();
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
