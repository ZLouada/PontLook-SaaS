'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { WizardData } from '@/components/wizard/schemas';

export type FunnelEventName =
  | 'funnel_started'
  | 'step_viewed'
  | 'step_completed'
  | 'step_back_navigated'
  | 'field_changed'
  | 'funnel_abandoned'
  | 'form_submitted'
  | 'benchmark_report_downloaded';

export interface FunnelTelemetryPayload {
  step?: number;
  stepName?: string;
  previousStep?: number;
  data?: Partial<WizardData>;
  leadScore?: number;
  leadTier?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    posthog?: {
      capture: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

/**
 * Enterprise Telemetry Hook for PontLook Funnel CRO & Analytics
 * Compatible with PostHog, Google Analytics (GA4), Segment, and Custom Event Dispatchers.
 */
export function useFunnelAnalytics() {
  const hasStartedRef = useRef(false);
  const currentStepRef = useRef(1);
  const currentDataRef = useRef<WizardData>({});
  const isSubmittedRef = useRef(false);

  // Core tracking dispatcher
  const track = useCallback((eventName: FunnelEventName, payload: FunnelTelemetryPayload = {}) => {
    const timestamp = new Date().toISOString();
    const enrichedPayload = {
      event: eventName,
      funnel: 'b2b_corporate_training_intake',
      step: payload.step ?? currentStepRef.current,
      stepName: payload.stepName,
      leadTier: payload.leadTier,
      leadScore: payload.leadScore,
      timestamp,
      ...payload.metadata,
    };

    // 1. In-Browser / Developer Console Logging in non-production
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📊 [Funnel Telemetry] ${eventName}`, enrichedPayload);
    }

    // 2. PostHog Integration
    if (typeof window !== 'undefined' && window.posthog?.capture) {
      try {
        window.posthog.capture(`pontlook_${eventName}`, enrichedPayload);
      } catch (err) {
        console.warn('PostHog capture failed:', err);
      }
    }

    // 3. Google Analytics 4 (gtag)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', `pontlook_${eventName}`, {
          event_category: 'B2B Funnel',
          event_label: payload.stepName || `Step ${enrichedPayload.step}`,
          value: payload.leadScore || enrichedPayload.step,
          ...enrichedPayload,
        });
      } catch (err) {
        console.warn('GA4 gtag dispatch failed:', err);
      }
    }

    // 4. Custom DOM Event Dispatcher for microfrontends / monitoring
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('pontlook_funnel_telemetry', {
          detail: enrichedPayload,
        })
      );
    }
  }, []);

  // Update current step & data refs
  const syncState = useCallback((step: number, data: WizardData) => {
    currentStepRef.current = step;
    currentDataRef.current = data;

    if (!hasStartedRef.current && step >= 1) {
      hasStartedRef.current = true;
      track('funnel_started', {
        step: 1,
        stepName: 'Training Scope',
        data,
      });
    }
  }, [track]);

  // Track step completion
  const trackStepCompleted = useCallback(
    (step: number, stepName: string, stepData: Partial<WizardData>) => {
      track('step_completed', {
        step,
        stepName,
        data: stepData,
        metadata: {
          domainsCount: stepData.domains?.length || 0,
          deliveryMode: stepData.deliveryMode,
          cohortSize: stepData.cohortSize,
          budgetBand: stepData.budgetBand,
        },
      });
    },
    [track]
  );

  // Track step back navigation
  const trackStepBack = useCallback(
    (fromStep: number, toStep: number) => {
      track('step_back_navigated', {
        step: toStep,
        previousStep: fromStep,
        stepName: `Step ${toStep}`,
      });
    },
    [track]
  );

  // Track final form submission
  const trackFormSubmitted = useCallback(
    (finalData: WizardData, leadScore?: number, leadTier?: string) => {
      isSubmittedRef.current = true;
      track('form_submitted', {
        step: 4,
        stepName: 'Enterprise Verification',
        data: finalData,
        leadScore,
        leadTier,
        metadata: {
          organization: finalData.organizationName,
          country: finalData.country,
          hasCorporateEmail: true,
        },
      });
    },
    [track]
  );

  // Track benchmark report download
  const trackReportDownload = useCallback(
    (data: WizardData) => {
      track('benchmark_report_downloaded', {
        step: 5,
        stepName: 'Confirmation Screen',
        metadata: {
          organization: data.organizationName,
          workEmail: data.workEmail,
        },
      });
    },
    [track]
  );

  // Field-level abandonment listener: Triggers when an enterprise user leaves after Step 3 without submitting Step 4
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isSubmittedRef.current && currentStepRef.current >= 3) {
        track('funnel_abandoned', {
          step: currentStepRef.current,
          stepName: `Abandoned at Step ${currentStepRef.current}`,
          data: currentDataRef.current,
          metadata: {
            abandonedAfterHighIntent: true,
          },
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !isSubmittedRef.current && currentStepRef.current >= 3) {
        track('funnel_abandoned', {
          step: currentStepRef.current,
          stepName: `Abandoned at Step ${currentStepRef.current} (Tab Hidden)`,
          data: currentDataRef.current,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [track]);

  return {
    track,
    syncState,
    trackStepCompleted,
    trackStepBack,
    trackFormSubmitted,
    trackReportDownload,
  };
}
