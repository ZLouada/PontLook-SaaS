'use client'

import React, { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  errorMessage: string
}

export class SEOErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[SEOEditor ErrorBoundary] Suppressed runtime error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '1rem',
            margin: '1rem 0',
            borderRadius: '8px',
            border: '1px solid var(--theme-elevation-200, #333333)',
            backgroundColor: 'var(--theme-elevation-100, #1a1a1a)',
            color: 'var(--theme-elevation-800, #cccccc)',
            fontSize: '0.875rem',
          }}
        >
          <div style={{ fontWeight: 600, color: '#F59E0B', marginBottom: '0.25rem' }}>
            ⚠️ SEO Editor Paused
          </div>
          <div>
            The SEO analyzer encountered a temporary rendering issue. You can continue editing and saving the article normally using the standard fields below.
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
