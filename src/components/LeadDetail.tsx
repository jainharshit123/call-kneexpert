import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLeadStore } from "../store/leadStore";
import Header from "./Header";
import EditLeadModal from "./EditLeadModal";
import {
  FollowUpModal,
  BookOPDModal,
  BookSVFModal,
  ScheduleVCModal,
  XrayRequestModal,
  XrayGalleryModal,
  
} from "./patient-modals-collection";
import {
  FiPhone,
  FiMessageSquare,
  FiShare,
  FiCamera,
  FiVideo,
  FiClipboard,
  FiDroplet,
  FiPlusCircle,
  FiEdit,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// Reusable component for the main content cards
const DetailCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
    <h3 className="text-blue-600 font-bold text-md mb-3">{title}</h3>
    {children}
  </div>
);

// Reusable component for label-value pairs
const DetailItem = ({ label, value, fullWidth = false }) => (
  <div className={fullWidth ? "col-span-2" : ""}>
    <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
    <div className="text-sm text-gray-800">{value || "-"}</div>
  </div>
);

// Reusable component for the top action buttons in the grid
const ActionButton = ({ text, icon, colorClass, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-1 font-bold py-2.5 rounded-lg text-xs
                transition-colors hover:brightness-95 ring-1 ring-black/0 ${colorClass}`}
  >
    {icon} {text}
  </button>
);

// Reusable component for the fixed footer buttons
const FooterButton = ({ text, icon, colorClass, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 font-bold rounded-lg transition-transform hover:scale-105 flex-1 py-2 ${colorClass}`}
  >
    {icon}
    <span className="text-xs tracking-tight">{text}</span>
  </button>
);

const LeadDetail = () => {
  const { id } = useParams();
  const selectedLead = useLeadStore((state) =>
    state.leads.find((lead) => lead.name === id)
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showBookOPDModal, setShowBookOPDModal] = useState(false);
  const [showBookSVFModal, setShowBookSVFModal] = useState(false);
  const [showXrayGalleryModal, setShowXrayGalleryModal] = useState(false);
  const [showScheduleVCModal, setShowScheduleVCModal] = useState(false);
  const [showXrayRequestModal, setShowXrayRequestModal] = useState(false);

  if (!selectedLead) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 text-center text-gray-500">
          Lead not found. Please select a lead from the list.
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <Header title={selectedLead.patient_full_name} showBackButton={true} />

      <div className="p-3">
        {/* --- TOP ACTION BUTTONS (4x2 GRID) --- */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <ActionButton
            text="Call Now"
            icon={<FiPhone size={12} />}
            colorClass="text-blue-700 bg-blue-100"
            onClick={() =>
              (window.location.href = `tel:${selectedLead.mobile}`)
            }
          />
          <ActionButton
            text="Whatsform"
            icon={<FiMessageSquare size={12} />}
            colorClass="text-green-700 bg-green-100"
            onClick={() => alert("Whatsform action triggered.")}
          />
          <ActionButton
            text="WhatsApp"
            icon={<FaWhatsapp size={12} />}
            colorClass="text-teal-700 bg-teal-100"
            onClick={() =>
              window.open(
                `https://wa.me/${selectedLead.whatsapp_no.replace("+", "")}`
              )
            }
          />
          <ActionButton
            text="Share Lead"
            icon={<FiShare size={12} />}
            colorClass="text-slate-700 bg-slate-100"
            onClick={() => alert("Share action triggered.")}
          />
          <ActionButton
            text="View X-rays"
            colorClass="text-purple-700 bg-purple-100"
            onClick={() => setShowXrayGalleryModal(true)}
          />
          <ActionButton
            text="Add Follow-up"
            colorClass="text-orange-700 bg-orange-100"
            onClick={() => setShowFollowUpModal(true)}
          />
          <ActionButton
            text="Change Status"
            colorClass="text-red-700 bg-red-100"
            onClick={() => alert("Change Status action triggered.")}
          />
          <ActionButton
            text="Edit Details"
            colorClass="text-yellow-700  bg-yellow-100"
            onClick={() => setEditModalOpen(true)}
          />
        </div>

        {/* --- PATIENT INFORMATION CARD --- */}
        <DetailCard title="Patient Information">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full font-semibold">
              {selectedLead.journey_stage}
            </span>
          </div>
          {selectedLead.current_bottleneck &&
            selectedLead.current_bottleneck !==
              "No specific bottleneck identified" && (
              <div className="mb-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-2 rounded-md flex items-center gap-2">
                <span>🚨 Alert: {selectedLead.current_bottleneck}</span>
              </div>
            )}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <DetailItem label="Name" value={selectedLead.patient_full_name} />
            <DetailItem label="Mobile" value={selectedLead.mobile} />
            <DetailItem
              label="Age/Gender"
              value={`${selectedLead.age}yr ${selectedLead.gender}`}
            />
            <DetailItem label="Language" value={selectedLead.language} />
            <DetailItem label="City" value={selectedLead.city} />
            <DetailItem label="Camp" value={selectedLead.camp} />
            <DetailItem label="Team" value={selectedLead.team} />
            <DetailItem label="Priority" value={selectedLead.priority} />
          </div>
        </DetailCard>

        {/* --- PAIN ASSESSMENT CARD --- */}
        <DetailCard title="Pain Assessment">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <DetailItem
              label="Complaint"
              value={selectedLead.pain_complain}
              fullWidth={true}
            />
            <DetailItem
              label="Duration"
              value={`${selectedLead.pain_since_years} ${selectedLead.pain_since}`}
            />
            <DetailItem
              label="Increases While"
              value={selectedLead.pain_increase_while}
            />
            <DetailItem label="Location" value={selectedLead.pain_location} />
          </div>
        </DetailCard>

        {/* --- X-RAY INFORMATION (Conditional) --- */}
        {selectedLead.xray_request_status && (
          <DetailCard title="X-ray Information">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <DetailItem
                label="Status"
                value={
                  <span className="text-sm font-bold bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full">
                    {selectedLead.xray_request_status}
                  </span>
                }
              />
              <DetailItem
                label="Request Mode"
                value={selectedLead.mode_of_request}
              />
              <DetailItem
                label="Requested On"
                value={new Date(
                  selectedLead.xray_request_date_time
                ).toLocaleString()}
              />
            </div>
          </DetailCard>
        )}

        {/* --- MAJOR EVENTS CARD --- */}
        <DetailCard title="Major Events Completed">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {Object.entries(selectedLead.major_events).map(
              ([event, completed]) => (
                <div key={event} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={completed}
                    readOnly
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 cursor-not-allowed"
                  />
                  <label>
                    {event
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                </div>
              )
            )}
          </div>
        </DetailCard>

        {/* --- FOLLOW-UP HISTORY (Conditional) --- */}
        {selectedLead.status_change_log?.length > 0 && (
          <DetailCard title="Follow-up History">
            <div className="space-y-3">
              {selectedLead.status_change_log.map((log, index) => (
                <div
                  key={index}
                  className="text-sm border-l-2 border-blue-200 pl-3"
                >
                  <p className="font-bold">
                    {log.old_status} → {log.new_status}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(log.from_date).toLocaleString()} by {log.user}
                  </p>
                </div>
              ))}
            </div>
          </DetailCard>
        )}
      </div>

      {/* This renders the modal component.
        It is controlled by the `isEditModalOpen` state.
        It is not visible on the screen until `isEditModalOpen` is true.
      */}
      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        lead={selectedLead}
      />

      <FollowUpModal
        isOpen={showFollowUpModal}
        onClose={() => setShowFollowUpModal(false)}
        patientName={selectedLead.patient_full_name}
      />

      <BookOPDModal
        isOpen={showBookOPDModal}
        onClose={() => setShowBookOPDModal(false)}
        patientName={selectedLead.patient_full_name}
      />

      <BookSVFModal
        isOpen={showBookSVFModal}
        onClose={() => setShowBookSVFModal(false)}
        patientName={selectedLead.patient_full_name}
      />

      <XrayGalleryModal
        isOpen={showXrayGalleryModal}
        onClose={() => setShowXrayGalleryModal(false)}
        patientName={selectedLead.patient_full_name}
      />

      <ScheduleVCModal
        isOpen={showScheduleVCModal}
        onClose={() => setShowScheduleVCModal(false)}
        patientName={selectedLead.patient_full_name}
      />

      <XrayRequestModal
        isOpen={showXrayRequestModal}
        onClose={() => setShowXrayRequestModal(false)}
        patientName={selectedLead.patient_full_name}
      />

      {/* --- FIXED FOOTER ACTIONS --- */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-2 z-20">
        <div className="flex gap-2">
          <FooterButton
            text="Xray Req."
            icon={<FiCamera size={20} />}
            colorClass="text-purple-700 bg-purple-100"
            onClick={() => setShowXrayRequestModal(true)}
          />
          <FooterButton
            text="Template"
            icon={<FiClipboard size={20} />}
            colorClass="text-green-700 bg-green-100"
            onClick={() => alert("Template action triggered.")}
          />
          <FooterButton
            text="VC"
            icon={<FiVideo size={20} />}
            colorClass="text-blue-700 bg-blue-100"
            onClick={() => setShowScheduleVCModal(true)}
          />
          <FooterButton
            text="OPD"
            icon={<FiPlusCircle size={20} />}
            colorClass="text-orange-700 bg-orange-100"
            onClick={() => setShowBookOPDModal(true)}
          />
          <FooterButton
            text="SVF/PRP"
            icon={<FiDroplet size={20} />}
            colorClass="text-red-700 bg-red-100"
            onClick={() => setShowBookSVFModal(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
