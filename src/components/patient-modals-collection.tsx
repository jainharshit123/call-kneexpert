import React, { useState, useEffect, useRef } from "react";
import { 
  FiX, 
  FiSave,
  FiLoader,
  FiCheck,
  FiCalendar,
  FiUser,
  FiMapPin,
  FiClock,
  FiFileText,
  FiImage,
  FiDownload,
  FiVideo,
  FiPhone
} from "react-icons/fi";

// Shared styles and components
const FormField = ({ 
  label, 
  id, 
  type = "text", 
  value, 
  onChange, 
  fullWidth = false, 
  placeholder,
  required = false
}) => (
  <div className={`${fullWidth ? 'col-span-full' : ''}`}>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-800 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="block w-full rounded-xl border-0 px-4 py-3.5 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-blue-500 hover:ring-gray-300 focus:bg-blue-50/30 transition-all duration-200 resize-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm"
      />
    ) : type === "datetime-local" || type === "date" || type === "time" ? (
      <input
        type={type}
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-xl border-0 px-4 py-3.5 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-blue-500 hover:ring-gray-300 focus:bg-blue-50/30 transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm"
      />
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-xl border-0 px-4 py-3.5 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-blue-500 hover:ring-gray-300 focus:bg-blue-50/30 transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm"
      />
    )}
  </div>
);

const CustomSelect = ({ label, options, value, onChange, fullWidth = false, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`${fullWidth ? 'col-span-full' : ''} relative`} ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full rounded-xl border-0 bg-white px-4 py-3.5 text-left shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-blue-500 hover:ring-gray-300 focus:bg-blue-50/30 transition-all duration-200 focus:ring-2 focus:ring-inset sm:text-sm"
      >
        <span className={`block truncate ${selectedOption ? 'text-gray-900' : 'text-gray-400'}`}>
          {selectedOption?.label || `Select ${label}`}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 shadow-2xl ring-1 ring-black ring-opacity-5">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`relative w-full cursor-pointer select-none py-3 pl-4 pr-10 text-left transition-colors duration-150 ${
                value === option.value 
                  ? 'bg-blue-100 text-blue-900 font-medium' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="block truncate">{option.label}</span>
              {value === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  <FiCheck className="h-5 w-5" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ModalBase = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" 
        onClick={onClose}
        style={{ touchAction: 'none' }}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[85vh] flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0 rounded-t-2xl">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// 1. Follow Up Modal
export const FollowUpModal = ({ isOpen, onClose, patientName = "Patient" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    followUpDate: '',
    status: 'Open',
    followUpBy: 'Call',
    reason: ''
  });

  const statusOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const followUpByOptions = [
    { value: 'Call', label: 'Call' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Visit', label: 'Visit' },
    { value: 'Email', label: 'Email' }
  ];

  const reasonOptions = [
    { value: 'consultation', label: 'Consultation Follow-up' },
    { value: 'medication', label: 'Medication Check' },
    { value: 'recovery', label: 'Recovery Assessment' },
    { value: 'appointment', label: 'Appointment Reminder' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Follow-up data:', formData);
      alert('Follow-up created successfully!');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={`Follow Up for ${patientName}`}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              label="Subject"
              id="subject"
              type="textarea"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter follow-up subject..."
              required
            />
            <FormField
              label="Description"
              id="description"
              type="textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add detailed description..."
            />
          </div>
          
          <div className="space-y-4">
            <FormField
              label="Follow Up Date"
              id="followUpDate"
              type="datetime-local"
              value={formData.followUpDate}
              onChange={handleInputChange}
              required
            />
            
            <CustomSelect
              label="Status"
              options={statusOptions}
              value={formData.status}
              onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            />
            
            <CustomSelect
              label="Follow Up By"
              options={followUpByOptions}
              value={formData.followUpBy}
              onChange={(value) => setFormData(prev => ({ ...prev, followUpBy: value }))}
            />
            
            <CustomSelect
              label="Reason for Follow Up"
              options={reasonOptions}
              value={formData.reason}
              onChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}
              required
            />
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 mr-2 animate-spin inline" />
              Creating...
            </>
          ) : (
            <>
              <FiCalendar className="w-4 h-4 mr-2 inline" />
              Create Follow Up
            </>
          )}
        </button>
      </div>
    </ModalBase>
  );
};

// 2. Book OPD Modal
export const BookOPDModal = ({ isOpen, onClose, patientName = "Patient" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    opdDate: '',
    opdTime: '',
    center: '',
    doctor: '',
    remarks: ''
  });

  const centerOptions = [
    { value: 'center1', label: 'Delhi Center' },
    { value: 'center2', label: 'Mumbai Center' },
    { value: 'center3', label: 'Bangalore Center' }
  ];

  const doctorOptions = [
    { value: 'dr1', label: 'Dr. Sharma' },
    { value: 'dr2', label: 'Dr. Patel' },
    { value: 'dr3', label: 'Dr. Kumar' }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('OPD booking data:', formData);
      alert('OPD booked successfully!');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={`Book OPD for ${patientName}`}>
      <div className="p-6">
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
            Appointment Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="OPD Date"
              id="opdDate"
              type="date"
              value={formData.opdDate}
              onChange={(e) => setFormData(prev => ({ ...prev, opdDate: e.target.value }))}
              required
            />
            <FormField
              label="Preferred Time"
              id="opdTime"
              type="time"
              value={formData.opdTime}
              onChange={(e) => setFormData(prev => ({ ...prev, opdTime: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <CustomSelect
            label="Select Center"
            options={centerOptions}
            value={formData.center}
            onChange={(value) => setFormData(prev => ({ ...prev, center: value }))}
            required
            fullWidth
          />

          <CustomSelect
            label="Select Doctor"
            options={doctorOptions}
            value={formData.doctor}
            onChange={(value) => setFormData(prev => ({ ...prev, doctor: value }))}
            fullWidth
          />

          <FormField
            label="Additional Remarks"
            id="remarks"
            type="textarea"
            value={formData.remarks}
            onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
            placeholder="Any specific requirements or notes..."
            fullWidth
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 mr-2 animate-spin inline" />
              Booking...
            </>
          ) : (
            <>
              <FiUser className="w-4 h-4 mr-2 inline" />
              Book OPD Appointment
            </>
          )}
        </button>
      </div>
    </ModalBase>
  );
};

// 3. Book SVF Modal
export const BookSVFModal = ({ isOpen, onClose, patientName = "Patient" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bodyParts, setBodyParts] = useState({ knee: false, hip: false });
  const [svfData, setSvfData] = useState({
    svfDate: '',
    svfCenter: '',
    prpDate: '',
    prpCenter: ''
  });

  const centerOptions = [
    { value: 'center1', label: 'Delhi Center' },
    { value: 'center2', label: 'Mumbai Center' },
    { value: 'center3', label: 'Bangalore Center' }
  ];

  const handleBodyPartChange = (part, checked) => {
    setBodyParts(prev => ({ ...prev, [part]: checked }));
  };

  const handleSubmit = async () => {
    if (!bodyParts.knee && !bodyParts.hip) {
      alert('Please select at least one body part');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('SVF booking data:', { bodyParts, svfData });
      alert('SVF treatment booked successfully!');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={`Book SVF Treatment for ${patientName}`}>
      <div className="p-6">
        <div className="bg-purple-50 rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Select Body Parts</h3>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-3 cursor-pointer bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <input
                type="checkbox"
                checked={bodyParts.knee}
                onChange={(e) => handleBodyPartChange('knee', e.target.checked)}
                className="h-5 w-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="font-medium text-gray-900">Knee</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <input
                type="checkbox"
                checked={bodyParts.hip}
                onChange={(e) => handleBodyPartChange('hip', e.target.checked)}
                className="h-5 w-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="font-medium text-gray-900">Hip</span>
            </label>
          </div>
        </div>

        {/* SVF Booking Section */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <FiMapPin className="w-5 h-5 mr-2 text-blue-600" />
            SVF Treatment Booking
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="SVF Date"
              id="svfDate"
              type="date"
              value={svfData.svfDate}
              onChange={(e) => setSvfData(prev => ({ ...prev, svfDate: e.target.value }))}
              required
            />
            <CustomSelect
              label="SVF Center"
              options={centerOptions}
              value={svfData.svfCenter}
              onChange={(value) => setSvfData(prev => ({ ...prev, svfCenter: value }))}
              required
            />
          </div>
        </div>

        {/* PRP Booking Section (only for knee) */}
        {bodyParts.knee && (
          <div className="bg-orange-50 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <FiClock className="w-5 h-5 mr-2 text-orange-600" />
              PRP Treatment Booking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="PRP Date"
                id="prpDate"
                type="date"
                value={svfData.prpDate}
                onChange={(e) => setSvfData(prev => ({ ...prev, prpDate: e.target.value }))}
              />
              <CustomSelect
                label="PRP Center"
                options={centerOptions}
                value={svfData.prpCenter}
                onChange={(value) => setSvfData(prev => ({ ...prev, prpCenter: value }))}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 mr-2 animate-spin inline" />
              Booking...
            </>
          ) : (
            'Book SVF Treatment'
          )}
        </button>
      </div>
    </ModalBase>
  );
};

// 4. X-rays Gallery Modal
export const XrayGalleryModal = ({ isOpen, onClose, patientName = "Patient", xrayUrls = [] }) => {
  // Mock data for demonstration
  const mockXrays = [
    { id: 1, url: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=X-Ray+1', type: 'image', name: 'Knee X-Ray - Anterior' },
    { id: 2, url: 'https://via.placeholder.com/400x300/f1f5f9/475569?text=X-Ray+2', type: 'image', name: 'Knee X-Ray - Lateral' },
    { id: 3, url: 'https://via.placeholder.com/400x300/fef2f2/dc2626?text=MRI+Report', type: 'pdf', name: 'MRI Report.pdf' },
    { id: 4, url: 'https://via.placeholder.com/400x300/f0fdf4/16a34a?text=Lab+Results', type: 'pdf', name: 'Lab Results.pdf' }
  ];

  const xraysToShow = xrayUrls.length > 0 ? xrayUrls : mockXrays;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={`Medical Images - ${patientName}`} maxWidth="max-w-4xl">
      <div className="p-6">
        {xraysToShow.length === 0 ? (
          <div className="text-center py-12">
            <FiImage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No medical images available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {xraysToShow.map((item, index) => (
              <div key={item.id || index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name || `X-ray ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <FiFileText className="w-16 h-16 text-red-500 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-gray-900 text-sm mb-3">{item.name || `Medical Image ${index + 1}`}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      <FiImage className="w-4 h-4 mr-1 inline" />
                      View
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                      <FiDownload className="w-4 h-4 mr-1 inline" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalBase>
  );
};

// 5. Schedule VC Modal
export const ScheduleVCModal = ({ isOpen, onClose, patientName = "Patient" }) => {
  const [vcTab, setVcTab] = useState('schedule');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vcData, setVcData] = useState({
    scheduledDate: '',
    doneDate: '',
    doneBy: '',
    followUpDate: '',
    patientIdealFor: '',
    remarks: ''
  });

  const doctorOptions = [
    { value: 'dr1', label: 'Dr. Sharma - Orthopedic Specialist' },
    { value: 'dr2', label: 'Dr. Patel - Joint Specialist' },
    { value: 'dr3', label: 'Dr. Kumar - Sports Medicine' }
  ];

  const idealForOptions = [
    { value: 'svf', label: 'SVF Treatment' },
    { value: 'prp', label: 'PRP Treatment' },
    { value: 'surgery', label: 'Surgical Intervention' },
    { value: 'physiotherapy', label: 'Physiotherapy' }
  ];

  const tabButtons = [
    { id: 'schedule', label: 'Schedule', icon: <FiCalendar className="w-4 h-4" /> },
    { id: 'reschedule', label: 'Reschedule', icon: <FiClock className="w-4 h-4" /> },
    { id: 'cancel', label: 'Cancel', icon: <FiX className="w-4 h-4" /> }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('VC data:', { vcTab, vcData });
      alert(`VC consultation ${vcTab}d successfully!`);
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={`Video Consultation - ${patientName}`} maxWidth="max-w-3xl">
      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 bg-gray-100 p-2 rounded-xl">
          {tabButtons.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setVcTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
                vcTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Schedule Tab */}
        {vcTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FiVideo className="w-5 h-5 mr-2 text-green-600" />
                Schedule Video Consultation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Consultation Date"
                  id="scheduledDate"
                  type="datetime-local"
                  value={vcData.scheduledDate}
                  onChange={(e) => setVcData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  required
                />
                <CustomSelect
                  label="Doctor"
                  options={doctorOptions}
                  value={vcData.doneBy}
                  onChange={(value) => setVcData(prev => ({ ...prev, doneBy: value }))}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Reschedule Tab */}
        {vcTab === 'reschedule' && (
          <div className="space-y-6">
            <div className="bg-orange-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FiClock className="w-5 h-5 mr-2 text-orange-600" />
                Reschedule Video Consultation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="New Date & Time"
                  id="scheduledDate"
                  type="datetime-local"
                  value={vcData.scheduledDate}
                  onChange={(e) => setVcData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  required
                />
                <CustomSelect
                  label="Doctor"
                  options={doctorOptions}
                  value={vcData.doneBy}
                  onChange={(value) => setVcData(prev => ({ ...prev, doneBy: value }))}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Cancel Tab */}
        {vcTab === 'cancel' && (
          <div className="space-y-6">
            <div className="bg-red-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FiX className="w-5 h-5 mr-2 text-red-600" />
                Cancel Video Consultation
              </h3>
              <FormField
                label="Reason for Cancellation"
                id="remarks"
                type="textarea"
                value={vcData.remarks}
                onChange={(e) => setVcData(prev => ({ ...prev, remarks: e.target.value }))}
                placeholder="Please provide a reason for cancellation..."
                fullWidth
                required
              />
            </div>
          </div>
        )}

        {/* Additional Fields for Schedule/Reschedule */}
        {(vcTab === 'schedule' || vcTab === 'reschedule') && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="VC Done Date"
                id="doneDate"
                type="datetime-local"
                value={vcData.doneDate}
                onChange={(e) => setVcData(prev => ({ ...prev, doneDate: e.target.value }))}
              />
              <FormField
                label="VC Follow Up Date"
                id="followUpDate"
                type="datetime-local"
                value={vcData.followUpDate}
                onChange={(e) => setVcData(prev => ({ ...prev, followUpDate: e.target.value }))}
              />
            </div>
            
            <CustomSelect
              label="Patient is Ideal for"
              options={idealForOptions}
              value={vcData.patientIdealFor}
              onChange={(value) => setVcData(prev => ({ ...prev, patientIdealFor: value }))}
              fullWidth
            />
            
            <FormField
              label="Video Consultation Remarks"
              id="remarks"
              type="textarea"
              value={vcData.remarks}
              onChange={(e) => setVcData(prev => ({ ...prev, remarks: e.target.value }))}
              placeholder="Add consultation notes and recommendations..."
              fullWidth
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full mt-6 px-6 py-3 rounded-xl transition-colors disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl text-white ${
            vcTab === 'cancel' 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 mr-2 animate-spin inline" />
              Processing...
            </>
          ) : (
            <>
              <FiVideo className="w-4 h-4 mr-2 inline" />
              {vcTab === 'schedule' ? 'Schedule Consultation' : 
               vcTab === 'reschedule' ? 'Reschedule Consultation' : 
               'Cancel Consultation'}
            </>
          )}
        </button>
      </div>
    </ModalBase>
  );
};

// 6. X-ray Request Modal
export const XrayRequestModal = ({ isOpen, onClose, patientName = "Patient" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templateOptions = [
    { value: 'knee_standard', label: 'Knee X-Ray - Standard Views' },
    { value: 'knee_weight_bearing', label: 'Knee X-Ray - Weight Bearing' },
    { value: 'hip_ap_lateral', label: 'Hip X-Ray - AP & Lateral' },
    { value: 'spine_lumbar', label: 'Lumbar Spine X-Ray' },
    { value: 'full_leg', label: 'Full Leg X-Ray - Standing' },
    { value: 'custom', label: 'Custom Prescription' }
  ];

  const handleSend = async () => {
    if (!selectedTemplate) {
      alert('Please select a template');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('X-ray request:', { template: selectedTemplate, patient: patientName });
      alert('X-ray prescription sent successfully!');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={`X-ray Request - ${patientName}`}>
      <div className="p-6">
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <FiFileText className="w-5 h-5 mr-2 text-blue-600" />
            Select X-ray Prescription Template
          </h3>
          
          <CustomSelect
            label="X-ray Template"
            options={templateOptions}
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            required
            fullWidth
          />
        </div>

        {selectedTemplate && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Preview</h4>
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Patient:</strong> {patientName}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Requested:</strong> {templateOptions.find(t => t.value === selectedTemplate)?.label}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={isSubmitting || !selectedTemplate}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 mr-2 animate-spin inline" />
              Sending...
            </>
          ) : (
            <>
              <FiFileText className="w-4 h-4 mr-2 inline" />
              Send X-ray Prescription
            </>
          )}
        </button>
      </div>
    </ModalBase>
  );
};

// Demo Component to show all modals
const PatientModalsDemo = () => {
  const [activeModal, setActiveModal] = useState(null);

  const modals = [
    { key: 'followup', label: 'Follow Up Modal', component: FollowUpModal },
    { key: 'opd', label: 'Book OPD Modal', component: BookOPDModal },
    { key: 'svf', label: 'Book SVF Modal', component: BookSVFModal },
    { key: 'xray-gallery', label: 'X-ray Gallery Modal', component: XrayGalleryModal },
    { key: 'vc', label: 'Schedule VC Modal', component: ScheduleVCModal },
    { key: 'xray-request', label: 'X-ray Request Modal', component: XrayRequestModal },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Patient Management Modals</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {modals.map((modal) => (
            <button
              key={modal.key}
              onClick={() => setActiveModal(modal.key)}
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-left border-2 border-transparent hover:border-blue-200"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{modal.label}</h3>
              <p className="text-sm text-gray-600">Click to open modal</p>
            </button>
          ))}
        </div>

        {/* Render Active Modal */}
        {modals.map((modal) => {
          const ModalComponent = modal.component;
          return (
            <ModalComponent
              key={modal.key}
              isOpen={activeModal === modal.key}
              onClose={() => setActiveModal(null)}
              patientName="John Doe"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PatientModalsDemo;