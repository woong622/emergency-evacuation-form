import React, { useState } from 'react';
import { AlertCircleIcon, RefreshCwIcon, SendIcon, CheckIcon, XIcon } from 'lucide-react';
// Mock database for service number lookup
const mockUserDatabase = {
  '12345678': {
    name: '홍길동',
    affiliation: '제1보병사단'
  },
  '87654321': {
    name: '김철수',
    affiliation: '제2기갑여단'
  },
  '11223344': {
    name: '이영희',
    affiliation: '제3특전여단'
  }
};
export function EmergencyTransportForm() {
  const [formData, setFormData] = useState({
    serviceNumber: '',
    name: '',
    affiliation: '',
    mainSymptoms: '',
    vitalSigns: '',
    consciousness: '',
    emergencyStatus: '',
    hospitalAffiliation: '',
    doctorName: '',
    doctorRank: '',
    doctorSpecialty: '',
    travelTime: ''
  });
  // Handle input changes
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => {
      // If service number is being changed, check for auto-fill data
      if (name === 'serviceNumber' && mockUserDatabase[value]) {
        const userData = mockUserDatabase[value];
        return {
          ...prev,
          [name]: value,
          name: userData.name,
          affiliation: userData.affiliation
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };
  // Handle consciousness selection
  const handleConsciousnessSelect = value => {
    setFormData(prev => ({
      ...prev,
      consciousness: value
    }));
  };
  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
    alert('양식이 제출되었습니다.');
  };
  // Handle form reset
  const handleReset = () => {
    setFormData({
      serviceNumber: '',
      name: '',
      affiliation: '',
      mainSymptoms: '',
      vitalSigns: '',
      consciousness: '',
      emergencyStatus: '',
      hospitalAffiliation: '',
      doctorName: '',
      doctorRank: '',
      doctorSpecialty: '',
      travelTime: ''
    });
  };
  return <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            환자 정보
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                군번
              </label>
              <input type="text" name="serviceNumber" value={formData.serviceNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="군번 입력" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input type="text" name="name" value={formData.name} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  소속
                </label>
                <input type="text" name="affiliation" value={formData.affiliation} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주증상
              </label>
              <textarea name="mainSymptoms" value={formData.mainSymptoms} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="주요 증상을 입력하세요" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                활력징후
              </label>
              <textarea name="vitalSigns" value={formData.vitalSigns} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="혈압, 맥박, 호흡 등" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                의식 여부
              </label>
              <div className="flex space-x-4">
                <button type="button" onClick={() => handleConsciousnessSelect('O')} className={`flex items-center justify-center w-12 h-12 rounded-full ${formData.consciousness === 'O' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  O
                </button>
                <button type="button" onClick={() => handleConsciousnessSelect('△')} className={`flex items-center justify-center w-12 h-12 rounded-full ${formData.consciousness === '△' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  △
                </button>
                <button type="button" onClick={() => handleConsciousnessSelect('X')} className={`flex items-center justify-center w-12 h-12 rounded-full ${formData.consciousness === 'X' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            후송 정보
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                응급/비응급 여부
              </label>
              <select name="emergencyStatus" value={formData.emergencyStatus} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">선택하세요</option>
                <option value="emergency">응급</option>
                <option value="non-emergency">비응급</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                소속병원
              </label>
              <input type="text" name="hospitalAffiliation" value={formData.hospitalAffiliation} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="병원명 입력" />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                군의관 정보
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <input type="text" name="doctorName" value={formData.doctorName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="성명" />
                </div>
                <div>
                  <input type="text" name="doctorRank" value={formData.doctorRank} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="계급" />
                </div>
                <div>
                  <input type="text" name="doctorSpecialty" value={formData.doctorSpecialty} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="세부전공" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이동 소요 시간 (분)
              </label>
              <input type="number" name="travelTime" value={formData.travelTime} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="분 단위로 입력" min="0" />
            </div>
            <div className="pt-4 mt-auto">
              {formData.emergencyStatus === 'emergency' && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                  <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <p className="text-sm text-red-700">
                    응급 환자로 분류되었습니다. 최대한 신속하게 처리해 주세요.
                  </p>
                </div>}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3">
        <button type="button" onClick={handleReset} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center">
          <RefreshCwIcon className="h-4 w-4 mr-1" />
          초기화
        </button>
        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center">
          <SendIcon className="h-4 w-4 mr-1" />
          제출하기
        </button>
      </div>
    </form>;
}