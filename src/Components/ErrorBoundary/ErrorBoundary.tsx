import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";

interface Props {
    place?: string
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`Uncaught error at ${this.props.place}`, error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <div className="page-container">
                <ErrorMessage message={
                    <p className="text-body3">
                        Sorry, something went wrong...😵
                        <br />
                        Try refreshing the page.
                    </p>

                } type="unknown"></ErrorMessage>
            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;