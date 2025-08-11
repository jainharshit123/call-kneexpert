import React, { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiUser,
  FiActivity,
  FiScissors,
  FiShield,
  FiCamera,
  FiEye,
  FiSave,
  FiLoader,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

// Modern FormField Component (TypeScript style)
const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  fullWidth = false,
  placeholder,
  error,
}) => (
  <div className={`${fullWidth ? "col-span-full" : ""}`}>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-800 mb-2"
    >
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`block w-full rounded-xl border-0 px-4 py-3.5 text-gray-900 bg-white shadow-sm ring-1 ring-inset transition-all duration-200 resize-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
          error
            ? "ring-red-300 focus:ring-red-500 bg-red-50"
            : "ring-gray-200 focus:ring-blue-500 hover:ring-gray-300 focus:bg-blue-50/30"
        }`}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-0 px-4 py-3.5 text-gray-900 bg-white shadow-sm ring-1 ring-inset transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
          error
            ? "ring-red-300 focus:ring-red-500 bg-red-50"
            : "ring-gray-200 focus:ring-blue-500 hover:ring-gray-300 focus:bg-blue-50/30"
        }`}
      />
    )}
    {error && (
      <div className="mt-2 flex items-center text-sm text-red-600">
        <span>⚠️</span>
        <span className="ml-1">{error}</span>
      </div>
    )}
  </div>
);

// Custom Styled Select Component (No Headless UI)
const CustomSelect = ({
  label,
  options,
  selected,
  setSelected,
  fullWidth = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`${fullWidth ? "col-span-full" : ""} relative`}
      ref={dropdownRef}
    >
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
      </label>

      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full rounded-xl border-0 bg-white px-4 py-3.5 text-left shadow-sm ring-1 ring-inset transition-all duration-200 focus:ring-2 focus:ring-inset sm:text-sm ${
          error
            ? "ring-red-300 focus:ring-red-500 bg-red-50"
            : "ring-gray-200 focus:ring-blue-500 hover:ring-gray-300 focus:bg-blue-50/30"
        }`}
      >
        <span
          className={`block truncate ${
            selected ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {selected?.name || `Select ${label}`}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <FiChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-2 shadow-2xl ring-1 ring-black ring-opacity-5 border-0">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={`relative w-full cursor-pointer select-none py-3 pl-4 pr-10 text-left transition-colors duration-150 ${
                selected?.id === option.id
                  ? "bg-blue-100 text-blue-900 font-medium"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className="block truncate">{option.name}</span>
              {selected?.id === option.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  <FiCheck className="h-5 w-5" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <span>⚠️</span>
          <span className="ml-1">{error}</span>
        </div>
      )}
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    {subtitle && <p className="text-sm text-gray-600 mt-2">{subtitle}</p>}
  </div>
);

// Custom Tab Component
const TabButton = ({ isActive, onClick, children, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    }`}
  >
    <span className={isActive ? "text-white" : "text-gray-400"}>{icon}</span>
    <span>{children}</span>
  </button>
);

// Mock Data
const DUMMY_OPTIONS = {
  duration: [
    { id: 1, name: "Days" },
    { id: 2, name: "Weeks" },
    { id: 3, name: "Months" },
    { id: 4, name: "Years" },
  ],
  painIncrease: [
    { id: 1, name: "Walking" },
    { id: 2, name: "Sitting" },
    { id: 3, name: "Standing" },
    { id: 4, name: "Climbing stairs" },
    { id: 5, name: "At rest" },
  ],
  painLocation: [
    { id: 1, name: "Left Knee" },
    { id: 2, name: "Right Knee" },
    { id: 3, name: "Both Knees" },
    { id: 4, name: "Lower Back" },
    { id: 5, name: "Hip" },
  ],
  xrayDiagnosis: [
    { id: 1, name: "Normal" },
    { id: 2, name: "Mild Degeneration" },
    { id: 3, name: "Moderate OA" },
    { id: 4, name: "Severe OA" },
  ],
  mriDiagnosis: [
    { id: 1, name: "ACL Tear" },
    { id: 2, name: "Meniscus Tear" },
    { id: 3, name: "Cartilage Damage" },
  ],
  mriDeformity: [
    { id: 1, name: "Varus" },
    { id: 2, name: "Valgus" },
    { id: 3, name: "None" },
  ],
  gender: [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Other" },
  ],
  priority: [
    { id: 1, name: "Low" },
    { id: 2, name: "Medium" },
    { id: 3, name: "High" },
    { id: 4, name: "Urgent" },
  ],
};

const EditLeadModal = ({ isOpen, onClose, lead }) => {
  const [formData, setFormData] = useState(lead || {});
  const [activeTab, setActiveTab] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // State for custom selects
  const [painSince, setPainSince] = useState(DUMMY_OPTIONS.duration[3]);
  const [painIncrease, setPainIncrease] = useState(
    DUMMY_OPTIONS.painIncrease[0]
  );
  const [painLocation, setPainLocation] = useState(
    DUMMY_OPTIONS.painLocation[0]
  );
  const [selectedGender, setSelectedGender] = useState(DUMMY_OPTIONS.gender[0]);
  const [selectedPriority, setSelectedPriority] = useState(
    DUMMY_OPTIONS.priority[1]
  );
  const [leftXray, setLeftXray] = useState(DUMMY_OPTIONS.xrayDiagnosis[0]);
  const [rightXray, setRightXray] = useState(DUMMY_OPTIONS.xrayDiagnosis[0]);

  useEffect(() => {
    if (lead) {
      setFormData(lead);
      const genderOption = DUMMY_OPTIONS.gender.find(
        (g) => g.name.toLowerCase() === lead.gender?.toLowerCase()
      );
      if (genderOption) setSelectedGender(genderOption);
    }
  }, [lead]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const savedData = {
        ...formData,
        gender: selectedGender.name,
        priority: selectedPriority.name,
        pain_since: painSince.name,
        pain_increase_while: painIncrease.name,
        pain_location: painLocation.name,
      };

      console.log("Saving data:", savedData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { name: "Basic", icon: <FiUser className="w-4 h-4" /> },
    { name: "Pain", icon: <FiActivity className="w-4 h-4" /> },
    { name: "Surgery", icon: <FiScissors className="w-4 h-4" /> },
    { name: "Injury", icon: <FiShield className="w-4 h-4" /> },
    { name: "X-ray", icon: <FiCamera className="w-4 h-4" /> },
    { name: "MRI", icon: <FiEye className="w-4 h-4" /> },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
        style={{ touchAction: "none" }}
      />

      {/* Modal - 25% space above and below */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[75vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Message */}
          {showSuccess && (
            <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <FiCheck className="w-5 h-5" />
              <span>Successfully saved!</span>
            </div>
          )}

          {/* Simplified Header */}
          <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0 rounded-t-2xl">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {lead?.patient_full_name || "Patient Details"}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm"
              >
                {isSaving ? (
                  <>
                    <FiLoader className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                disabled={isSaving}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex-shrink-0">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {tabs.map((tab, index) => (
                <TabButton
                  key={index}
                  isActive={activeTab === index}
                  onClick={() => setActiveTab(index)}
                  icon={tab.icon}
                >
                  {tab.name}
                </TabButton>
              ))}
            </div>
          </div>

          {/* Content - This is the scrollable area */}
          <div
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#CBD5E0 #F7FAFC",
              scrollBehavior: "smooth",
            }}
          >
            <div className="p-6">
              {/* Basic Info Tab */}
              {activeTab === 0 && (
                <div>
                  <SectionHeader title="Basic Information" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      label="Full Name"
                      id="patient_full_name"
                      value={formData?.patient_full_name}
                      onChange={handleInputChange}
                      placeholder="Enter patient's name"
                      fullWidth={true}
                    />
                    <FormField
                      label="Mobile Number"
                      id="mobile"
                      type="tel"
                      value={formData?.mobile}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                    <FormField
                      label="WhatsApp Number"
                      id="whatsapp_no"
                      type="tel"
                      value={formData?.whatsapp_no}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                    <FormField
                      label="Age"
                      id="age"
                      type="number"
                      value={formData?.age}
                      onChange={handleInputChange}
                      placeholder="Age in years"
                    />
                    <CustomSelect
                      label="Gender"
                      options={DUMMY_OPTIONS.gender}
                      selected={selectedGender}
                      setSelected={setSelectedGender}
                    />
                    <FormField
                      label="Language"
                      id="language"
                      value={formData?.language}
                      onChange={handleInputChange}
                      placeholder="Preferred language"
                    />
                    <FormField
                      label="City"
                      id="city"
                      value={formData?.city}
                      onChange={handleInputChange}
                      placeholder="Current city"
                    />
                    <FormField
                      label="Camp"
                      id="camp"
                      value={formData?.camp}
                      onChange={handleInputChange}
                      placeholder="Medical camp"
                    />
                    <FormField
                      label="Team"
                      id="team"
                      value={formData?.team}
                      onChange={handleInputChange}
                      placeholder="Assigned team"
                    />
                    <CustomSelect
                      label="Priority"
                      options={DUMMY_OPTIONS.priority}
                      selected={selectedPriority}
                      setSelected={setSelectedPriority}
                    />
                  </div>
                </div>
              )}

              {/* Pain Assessment Tab */}
              {activeTab === 1 && (
                <div>
                  <SectionHeader title="Pain Assessment" />
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Pain Duration
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="Duration (Number)"
                          id="pain_since_years"
                          type="number"
                          value={formData?.pain_since_years}
                          onChange={handleInputChange}
                          placeholder="e.g., 6"
                        />
                        <CustomSelect
                          label="Time Unit"
                          options={DUMMY_OPTIONS.duration}
                          selected={painSince}
                          setSelected={setPainSince}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CustomSelect
                        label="Pain Increases While"
                        options={DUMMY_OPTIONS.painIncrease}
                        selected={painIncrease}
                        setSelected={setPainIncrease}
                      />
                      <CustomSelect
                        label="Pain Location"
                        options={DUMMY_OPTIONS.painLocation}
                        selected={painLocation}
                        setSelected={setPainLocation}
                      />
                    </div>

                    <FormField
                      label="Pain Complaint Details"
                      id="pain_complain"
                      type="textarea"
                      value={formData?.pain_complain}
                      onChange={handleInputChange}
                      fullWidth={true}
                      placeholder="Describe the pain in detail..."
                    />
                  </div>
                </div>
              )}

              {/* Surgery History Tab */}
              {activeTab === 2 && (
                <div>
                  <SectionHeader title="Surgery History" />
                  <div className="space-y-6">
                    <div className="bg-purple-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Surgery Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="Number of Surgeries"
                          id="surgery_done"
                          type="number"
                          placeholder="Total count"
                        />
                        <CustomSelect
                          label="Time Since Last Surgery"
                          options={DUMMY_OPTIONS.duration}
                          selected={painSince}
                          setSelected={setPainSince}
                        />
                      </div>
                    </div>

                    <FormField
                      label="Surgery Details"
                      id="surgery_name"
                      placeholder="List all surgical procedures"
                      fullWidth={true}
                    />

                    <FormField
                      label="Current Status"
                      id="surgery_status"
                      type="textarea"
                      fullWidth={true}
                      placeholder="Recovery status and complications..."
                    />
                  </div>
                </div>
              )}

              {/* Injury History Tab */}
              {activeTab === 3 && (
                <div>
                  <SectionHeader title="Injury History" />
                  <div className="space-y-6">
                    <div className="bg-orange-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Injury Timeline
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="Time Since Injury"
                          id="injury_since"
                          type="number"
                          placeholder="Duration"
                        />
                        <CustomSelect
                          label="Time Unit"
                          options={DUMMY_OPTIONS.duration}
                          selected={painSince}
                          setSelected={setPainSince}
                        />
                      </div>
                    </div>

                    <FormField
                      label="Current Status"
                      id="injury_status"
                      placeholder="Current condition"
                      fullWidth={true}
                    />

                    <FormField
                      label="Treatment History"
                      id="injury_treatment"
                      type="textarea"
                      fullWidth={true}
                      placeholder="All treatments received..."
                    />
                  </div>
                </div>
              )}

              {/* X-ray Assessment Tab */}
              {activeTab === 4 && (
                <div>
                  <SectionHeader title="X-ray Assessment" />
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        X-ray Findings
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomSelect
                          label="Left Side"
                          options={DUMMY_OPTIONS.xrayDiagnosis}
                          selected={leftXray}
                          setSelected={setLeftXray}
                        />
                        <CustomSelect
                          label="Right Side"
                          options={DUMMY_OPTIONS.xrayDiagnosis}
                          selected={rightXray}
                          setSelected={setRightXray}
                        />
                      </div>
                    </div>

                    <FormField
                      label="X-ray Report & Remarks"
                      id="xray_remarks"
                      type="textarea"
                      fullWidth={true}
                      placeholder="Detailed findings and observations..."
                    />
                  </div>
                </div>
              )}

              {/* MRI Assessment Tab */}
              {activeTab === 5 && (
                <div>
                  <SectionHeader title="MRI Assessment" />
                  <div className="space-y-6">
                    <div className="bg-indigo-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Left Side Assessment
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomSelect
                          label="MRI Diagnosis"
                          options={DUMMY_OPTIONS.mriDiagnosis}
                          selected={painSince}
                          setSelected={setPainSince}
                        />
                        <CustomSelect
                          label="Deformity"
                          options={DUMMY_OPTIONS.mriDeformity}
                          selected={painSince}
                          setSelected={setPainSince}
                        />
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Right Side Assessment
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomSelect
                          label="MRI Diagnosis"
                          options={DUMMY_OPTIONS.mriDiagnosis}
                          selected={painSince}
                          setSelected={setPainSince}
                        />
                        <CustomSelect
                          label="Deformity"
                          options={DUMMY_OPTIONS.mriDeformity}
                          selected={painSince}
                          setSelected={setPainSince}
                        />
                      </div>
                    </div>

                    <FormField
                      label="MRI Report"
                      id="mri_remarks"
                      type="textarea"
                      fullWidth={true}
                      placeholder="Comprehensive MRI findings..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLeadModal;
