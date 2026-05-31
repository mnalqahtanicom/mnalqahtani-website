'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/site';

export default function ContactForm({
  labels,
}: {
  labels: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    send: string;
  };
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry — ${name || email}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  const field =
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-gold';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">
          {labels.nameLabel}
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">
          {labels.emailLabel}
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">
          {labels.messageLabel}
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={field}
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-gold-soft"
      >
        {labels.send}
      </button>
    </form>
  );
}
