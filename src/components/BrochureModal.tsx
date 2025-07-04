// This file is a React TypeScript component and requires React 17+ or the new JSX transform.
import React, { useEffect, useRef, useState } from 'react';
import type {} from 'react/jsx-runtime';
import './brochureModal.css';
import { submitToGoogleForms } from '../lib/googleForms';
import { useTranslation } from '../TranslationContext';

const BrochureModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Show modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'input, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
  }, [open]);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      await submitToGoogleForms({ fullName: name, phone });
      setShowSuccess(true);
      setName('');
      setPhone('');
      setTimeout(() => {
        setShowSuccess(false);
        setOpen(false);
      }, 2000);
    } else {
      alert(t('contact-error') || 'Please fill in all fields.');
    }
  };

  if (!open) return null;

  return (
    <div
      className="brochure-modal-backdrop"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      aria-label="Request Brochure Modal"
    >
      <div className="brochure-modal" ref={modalRef}>
        <button
          className="brochure-modal-close"
          aria-label="Close modal"
          onClick={() => setOpen(false)}
          type="button"
        >
          &times;
        </button>
        <div className="brochure-modal-title">
          Begin your University journey today.
        </div>
        <div className="brochure-modal-subtitle">
          Request call!
        </div>
        {showSuccess ? (
          <div className="contact-success-checkmark" style={{marginTop: '2rem', textAlign: 'center'}}>
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{width: '60px', height: '60px', display: 'block', margin: '0 auto'}}>
              <circle className="check-circle" cx="26" cy="26" r="23" fill="none"/>
              <path className="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <div style={{fontWeight: 700, color: '#38b6ff', fontSize: '1.2rem', marginTop: '0.5rem'}}>
              {t('contact-success') || 'Thank you for your interest! We will contact you soon.'}
            </div>
          </div>
        ) : (
        <form className="brochure-modal-form" autoComplete="off" onSubmit={handleSubmit}>
          <label className="brochure-modal-label" htmlFor="name">
            Your Name *
          </label>
          <input
            id="name"
            className="brochure-modal-input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            aria-required="true"
            aria-label="Name"
            tabIndex={0}
          />
          <label className="brochure-modal-label" htmlFor="phone">
            Phone Number *
          </label>
          <input
            id="phone"
            className="brochure-modal-input"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            aria-required="true"
            aria-label="Phone Number"
            pattern="[+()0-9\s-]{7,}"
            placeholder="e.g. +998 (xx) xxxxxxx"
            tabIndex={0}
          />
          <button
            className="brochure-modal-submit"
            type="submit"
            tabIndex={0}
            aria-label="Submit"
          >
            Submit
          </button>
        </form>
        )}
      </div>
    </div>
  );
};

export default BrochureModal; 