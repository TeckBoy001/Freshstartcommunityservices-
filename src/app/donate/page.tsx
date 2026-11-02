import { Suspense } from 'react';
import DonateClient from './DonateClient';

export const metadata = {
  title: 'Donate | Fresh Start Community Services',
  description:
    'Make a secure online donation to support FSC programs including the Circle of Love Pantry, youth career readiness, and emergency community relief.',
};

function DonateFallback() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-[#0D472D] text-white py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Support Fresh Start Community Services
          </h1>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Loading donation form…
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-md animate-pulse h-96" />
        </div>
      </section>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<DonateFallback />}>
      <DonateClient />
    </Suspense>
  );
}
