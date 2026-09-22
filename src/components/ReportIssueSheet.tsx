import { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';

interface ReportIssueSheetProps {
  orderId: string;
  issueType: 'delayed' | 'delivered_not_received';
  onClose: () => void;
  onReported: () => void;
}

export function ReportIssueSheet({
  orderId,
  issueType,
  onClose,
  onReported,
}: ReportIssueSheetProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isMissing = issueType === 'delivered_not_received';

  const reasons = isMissing
    ? [
        'Package was left at the wrong address',
        'No one was home and no safe drop location',
        'Tracking says delivered but nothing arrived',
        'Package appears to have been stolen',
        'Other',
      ]
    : [
        'Delivery is taking much longer than estimated',
        "Tracking hasn't updated in several days",
        "Carrier hasn't attempted delivery",
        'Other',
      ];

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <Check size={28} className="text-emerald-600" />
        </div>
        <h3 className="mt-4 text-base font-bold text-gray-900">
          {isMissing ? 'Issue reported' : 'Delay reported'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          We've opened a case for order {orderId}. A support agent will investigate and
          contact you within 24 hours with an update.
        </p>
        <div className="mt-4 w-full rounded-xl bg-gray-50 px-4 py-3">
          <p className="text-xs font-medium text-gray-500">Case reference</p>
          <p className="mt-0.5 text-sm font-bold text-gray-900">
            #CS-{Math.floor(Math.random() * 90000 + 10000)}
          </p>
        </div>
        <button
          onClick={() => {
            onReported();
            onClose();
          }}
          className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-3.5">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-600" />
        <p className="text-sm text-amber-800">
          {isMissing
            ? 'Tell us what happened so we can investigate with the carrier right away.'
            : 'Help us understand the issue so we can follow up with the carrier.'}
        </p>
      </div>

      <p className="mt-5 text-sm font-semibold text-gray-900">What happened?</p>
      <div className="mt-3 space-y-2">
        {reasons.map((reason) => (
          <button
            key={reason}
            onClick={() => setSelected(reason)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
              selected === reason
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                selected === reason
                  ? 'border-gray-900 bg-gray-900'
                  : 'border-gray-300'
              }`}
            >
              {selected === reason && (
                <div className="h-2 w-2 rounded-full bg-white" />
              )}
            </div>
            <span className="text-sm text-gray-700">{reason}</span>
          </button>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={() => setSubmitted(true)}
        className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit report
      </button>
    </div>
  );
}
