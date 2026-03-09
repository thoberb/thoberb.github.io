import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-mono">
          <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
          <pre className="text-sm text-red-300 whitespace-pre-wrap break-all">
            {this.state.error.message}
          </pre>
          <p className="mt-4 text-gray-400 text-sm">
            Check the browser console for details.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
