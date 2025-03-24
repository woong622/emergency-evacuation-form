import React, { useState } from 'react';
import { EmergencyTransportForm } from './components/EmergencyTransportForm';
export function App() {
  return <div className="bg-gray-50 min-h-screen w-full py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          응급 후송 & 외진 관리 시스템
        </h1>
        <EmergencyTransportForm />
      </div>
    </div>;
}