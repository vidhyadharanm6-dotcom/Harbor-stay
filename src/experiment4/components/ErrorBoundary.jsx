import { Component } from 'react'

// EXPERIMENT 4 (g): catches unexpected rendering errors anywhere below it.
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-lg mx-auto mt-16 text-center bg-white border border-harbor-100 rounded-xl p-8">
          <h2 className="font-display text-xl text-harbor-800">Something went wrong</h2>
          <p className="text-harbor-600 text-sm mt-2">
            Please refresh the page. If the problem continues, try again later.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
