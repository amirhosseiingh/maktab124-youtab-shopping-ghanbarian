import React from 'react';

const ErrorAlarm = () => {
  return (
    <div
      id="alert-border-3"
      className="flex items-center p-4 mb-4 border-t-4 rounded-lg bg-[var(--background)] text-[var(--text)] border-[var(--secondary)]"
      role="alert"
    >
      <svg
        className="shrink-0 w-4 h-4 text-[var(--secondary)]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ms-3 text-sm font-medium text-[var(--text)]">
        محصولی با این مشخصات یافت نشد!
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-[var(--background)] text-[var(--secondary)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] p-1.5 hover:bg-[var(--secondary)] hover:text-[var(--background)] inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default ErrorAlarm;
