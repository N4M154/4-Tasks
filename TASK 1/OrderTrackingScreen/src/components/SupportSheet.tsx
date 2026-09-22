import { useState } from 'react';
import { MessageCircle, Phone, Mail, ChevronRight, Check } from 'lucide-react';

interface SupportSheetProps {
  onClose: () => void;
}

export function SupportSheet({ onClose }: SupportSheetProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <Check size={28} className="text-emerald-600" />
        </div>
        <h3 className="mt-4 text-base font-bold text-gray-900">Message sent</h3>
        <p className="mt-1 text-sm text-gray-500">
          A support agent will get back to you within 24 hours.
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Done
        </button>
      </div>
    );
  }

  const options = [
    { icon: MessageCircle, label: 'Live Chat', sublabel: 'Avg. wait: 2 min', action: 'chat' },
    { icon: Phone, label: 'Call Support', sublabel: '1-800-555-0142', action: 'call' },
    { icon: Mail, label: 'Email Us', sublabel: 'support@shopflow.com', action: 'email' },
  ];

  return (
    <div>
      <p className="text-sm text-gray-500">
        We're here to help. Choose how you'd like to reach us.
      </p>
      <div className="mt-4 space-y-2">
        {options.map((opt) => (
          <button
            key={opt.action}
            onClick={() => setSubmitted(true)}
            className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5 text-left transition-all hover:border-gray-200 hover:bg-gray-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm">
              <opt.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
              <p className="text-xs text-gray-500">{opt.sublabel}</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-gray-400">
        Support hours: Mon–Sun, 6 AM – 11 PM PT
      </p>
    </div>
  );
}
