import React, { memo, useState } from 'react';
import { AlertCircleIcon, RefreshCwIcon, SendIcon, ArrowRightIcon, UserIcon } from 'lucide-react';
// Mock database for service number lookup
const mockUserDatabase = {
  '24-12345678': {
    name: '김철수',
    affiliation: 'OO사단 OO여단 본부 의무중대'
  },
  '24-98765432': {
    name: '이영희',
    affiliation: 'XX사단 XX여단 본부 통신중대'
  },
};
// Mock transport information database
const mockTransportDatabase = {
  '24-12345678': {
    emergencyStatus: 'emergency',
    hospitalAffiliation: '국군AA병원',
    doctorName: '박의사',
    doctorRank: '대위',
    doctorSpecialty: '대장항문외과',
    travelTime: '90',
    guide: '1. 활력징후(체온, 혈압, 맥박, 호흡수) 모니터링\n2. 물 포함 금식 유지 (수술 가능성 고려)\n3. 기존 처방 약물 지참\n4. 오물봉투 지참 (구토 시 사용)'
  },
  '24-98765432': {
    emergencyStatus: 'non-emergency',
    hospitalAffiliation: 'XX사단의무대대',
    doctorName: '김의사',
    doctorRank: '대위',
    doctorSpecialty: '응급의학과',
    travelTime: '30',
    guide: '1. 후송 전 부목 또는 압박붕대 적용 가능할 시 시행\n2. 얼음찜질 적용\n3. 들것 지참'
  }
};
export function EmergencyTransportForm() {
  const [step, setStep] = useState(1); // 1: 환자 정보, 2: 후송 정보
  const [formData, setFormData] = useState({
    serviceNumber: '',
    name: '',
    affiliation: '',
    mainSymptoms: '',
    symptom1: '',
    symptom2: '',
    symptom3: '',
    vitalSigns: '',
    consciousness: '',
    emergencyStatus: '',
    hospitalAffiliation: '',
    doctorName: '',
    doctorRank: '',
    doctorSpecialty: '',
    travelTime: '',
    temperature: '',
    bloodPressure: '',
    pulse: '',
    respiration: '',
    guide: '',
    memo: '',
  });
  // Handle input changes
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => {
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
  // Handle patient info submission
  const handlePatientInfoSubmit = e => {
    e.preventDefault();
    // Validate required fields
    if (!formData.serviceNumber || !formData.symptom1 || !formData.symptom2 || !formData.symptom3 || !formData.consciousness) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }
    // Get transport info from mock database
    const transportInfo = mockTransportDatabase[formData.serviceNumber];
    if (transportInfo) {
      setFormData(prev => ({
        ...prev,
        ...transportInfo
      }));
    }
    setStep(2);
  };
  // Handle final form submission
  const handleFinalSubmit = e => {
    e.preventDefault();
    console.log('Final form submitted:', formData);
    alert('후송 정보가 제출되었습니다.');
  };
  // Handle form reset
  const handleReset = () => {
    setFormData({
      serviceNumber: '',
      name: '',
      affiliation: '',
      mainSymptoms: '',
      symptom1: '',
      symptom2: '',
      symptom3: '',
      vitalSigns: '',
      consciousness: '',
      emergencyStatus: '',
      hospitalAffiliation: '',
      doctorName: '',
      doctorRank: '',
      doctorSpecialty: '',
      travelTime: '',
      temperature: '',
      bloodPressure: '',
      pulse: '',
      respiration: '',
      guide: '',
      memo: '',
    });
    setStep(1);
  };
  return <div className="bg-white rounded-lg shadow-md p-6">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center">
          <div className="flex items-center text-blue-600">
            <div className="bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white">
              1
            </div>
            <span className="ml-2 font-medium">환자 정보</span>
          </div>
          <div className="flex-1 mx-4 h-0.5 bg-gray-200">
            <div className={`h-0.5 bg-blue-600 transition-all duration-500 ${step === 2 ? 'w-full' : 'w-0'}`} />
          </div>
          <div className={`flex items-center ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-400'}`}>
              2
            </div>
            <span className="ml-2 font-medium">후송 정보</span>
          </div>
        </div>
      </div>
      {step === 1 ?
    // Step 1: Patient Information Form
    <form onSubmit={handlePatientInfoSubmit}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
              환자 정보
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  군번 <span className="text-red-500">*</span>
                </label>
                <input type="text" name="serviceNumber" value={formData.serviceNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="군번 입력" required />
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
                  주증상 <span className="text-red-500">*</span>
                </label>
                <table className="w-full border border-gray-200 rounded-md">
                  <tbody>
                    <tr>
                      <td>
                        <select name="symptom1" value={formData.symptom1} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                          <option value="">선택하세요</option>
                          <option value="emergency">응급</option>
                          <option value="non-emergency">비응급</option>
                        </select>
                      </td>
                      <td>
                        <select name="symptom2" value={formData.symptom2} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                          <option value="">선택하세요</option>
                          <option value="emergency">응급</option>
                          <option value="non-emergency">비응급</option>
                        </select>
                      </td>
                      <td>
                        <select name="symptom3" value={formData.symptom3} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                          <option value="">선택하세요</option>
                          <option value="emergency">응급</option>
                          <option value="non-emergency">비응급</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <textarea name="mainSymptoms" value={formData.mainSymptoms} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="주요 증상을 입력하세요" required /> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  활력징후 <span className="text-red-500">*</span>
                </label>
                {/* table */}
                <table className="w-full border border-gray-200 rounded-md">
                  <thead>
                    <tr>
                      <th className="border-b border-gray-200 p-2">체온</th> 
                      <th className="border-b border-gray-200 p-2">혈압</th>
                      <th className="border-b border-gray-200 p-2">맥박</th>
                      <th className="border-b border-gray-200 p-2">호흡</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-gray-200 p-2">
                        <input type="number" name="temperature" value={formData.temperature} onChange={handleInputChange} className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="체온" required step="0.1"/>
                      </td>
                      <td className="border-b border-gray-200 p-2">
                        <input type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleInputChange} className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="혈압" required/>
                      </td>
                      <td className="border-b border-gray-200 p-2">
                        <input type="number" name="pulse" value={formData.pulse} onChange={handleInputChange} className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="맥박" required/>
                      </td>
                      <td className="border-b border-gray-200 p-2">
                        <input type="number" name="respiration" value={formData.respiration} onChange={handleInputChange} className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="호흡" required/>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <textarea name="vitalSigns" value={formData.vitalSigns} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="혈압, 맥박, 호흡 등" /> */}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  의식 여부 <span className="text-red-500">*</span>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  진료메모 <span className="text-red-500">*</span>
                </label>
                <textarea name="memo" value={formData.memo} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="진료 메모를 입력하세요" required />
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3">
              <button type="button" onClick={handleReset} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center">
                <RefreshCwIcon className="h-4 w-4 mr-1" />
                초기화
              </button>
              <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center">
                <ArrowRightIcon className="h-4 w-4 mr-1" />
                다음 단계
              </button>
            </div>
          </div>
        </form> :
    // Step 2: Transport Information Form
    <form onSubmit={handleFinalSubmit}>
          <div className="space-y-6">
            {/* Patient Info Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-6 text-center text-xl">📝 환자 정보 요약</h3>

              {/* 기본 정보 */}
              <div className="grid grid-cols-4 gap-4 text-sm text-gray-700">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">이름</span>
                  <span className="font-semibold">{formData.name}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">군번</span>
                  <span className="font-semibold">{formData.serviceNumber}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">소속</span>
                  <span className="font-semibold">{formData.affiliation}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">의식상태</span>
                  <span className="font-semibold">{formData.consciousness}</span>
                </div>
              </div>

              {/* 증상 */}
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 mt-6">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">증상 1</span>
                  <span className="font-semibold">{formData.symptom1}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">증상 2</span>
                  <span className="font-semibold">{formData.symptom2}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">증상 3</span>
                  <span className="font-semibold">{formData.symptom3}</span>
                </div>
              </div>

              {/* 바이탈 사인 */}
              <div className="grid grid-cols-4 gap-4 text-sm text-gray-700 mt-6">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">체온</span>
                  <span className="font-semibold">{formData.temperature}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">혈압</span>
                  <span className="font-semibold">{formData.bloodPressure}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">맥박</span>
                  <span className="font-semibold">{formData.pulse}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 mb-1">호흡 수</span>
                  <span className="font-semibold">{formData.respiration}</span>
                </div>
              </div>
            </div>
            {/* Transport Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
                후송 정보
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    응급/비응급 여부
                  </label>
                  <select name="emergencyStatus" value={formData.emergencyStatus} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    응급 조치 가이드
                  </label>
                  <textarea name="guide" value={formData.guide} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="응급 조치 가이드" />
                  {/* <input type="text" name="guide" value={formData.guide} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="분 단위로 입력" /> */}
                </div>
                {formData.emergencyStatus === 'emergency' && <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                    <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <p className="text-sm text-red-700">
                      응급 환자로 분류되었습니다. 최대한 신속하게 처리해 주세요.
                    </p>
                  </div>}
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3">
              <button type="button" onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center">
                이전 단계
              </button>
              <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center">
                <SendIcon className="h-4 w-4 mr-1" />
                제출하기
              </button>
            </div>
          </div>
        </form>}
    </div>;
}