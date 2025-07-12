import { Component, type ErrorInfo, type ReactNode } from 'react';

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
        <>
          <p>{this.props.fallback}</p>
          <button
            className="recoveryButton"
            onClick={() => {
              history.go();
            }}
          >
            Try again
          </button>
        </>
      );
    }

    return this.props.children;
  }
}
