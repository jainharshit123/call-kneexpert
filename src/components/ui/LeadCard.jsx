import React from "react";
import { useNavigate } from "react-router-dom";
import { useLeadStore } from "../../store/leadStore";
import { FiPhone, FiShare2, FiCheckSquare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import IconButton from "./IconButton";
import useCountdown from "../../hooks/useCountDown";

const priorityStyles = {
  High: "border-l-red-light",
  Medium: "border-l-orange-light",
  Low: "border-l-slate-300",
};

const LeadCard = ({ lead }) => {
  const { shareLead } = useLeadStore();
  const navigate = useNavigate();
  const countdown = useCountdown(lead.created_time);

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <div
      onClick={() => navigate(`/lead/${lead.name}`)}
      className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-transform transform hover:-translate-y-1 border-l-4 ${
        priorityStyles[lead.priority] || "border-l-slate-300"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-bold text-gray-800 text-lg truncate">
              {lead.patient_full_name}
            </h2>
            {countdown && (
              <span className="text-xs bg-yellow-200 text-yellow-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                {countdown}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">
            {lead.title} • {lead.city} • {lead.age}yr {lead.gender}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
              {lead.case_type}
            </span>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
              X-ray: {lead.xray_assessment}
            </span>
          </div>
        </div>
        <div className="flex gap-2 pl-2">
          <IconButton
            icon={FiPhone}
            color="blue-light"
            title="Call"
            onClick={(e) =>
              handleActionClick(
                e,
                () => (window.location.href = `tel:${lead.mobile}`)
              )
            }
          />
          {/* --- NEW WhatsForm ICON --- */}
          <IconButton
            icon={FiCheckSquare}
            color="green-medium"
            title="Open WhatsForm"
            onClick={(e) =>
              handleActionClick(e, () =>
                window.open("https://whatsform.com/", "_blank")
              )
            }
          />
          <IconButton
            icon={FaWhatsapp}
            color="green-light"
            title="WhatsApp"
            onClick={(e) =>
              handleActionClick(e, () =>
                window.open(
                  `https://wa.me/${lead.whatsapp_no.replace("+", "")}`
                )
              )
            }
          />
          <IconButton
            icon={FiShare2}
            color="grey-light"
            title="Share"
            onClick={(e) => handleActionClick(e, () => shareLead(lead))}
          />
        </div>
      </div>
      {lead.current_bottleneck &&
        lead.current_bottleneck !== "No specific bottleneck identified" && (
          <div className="mt-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-2 rounded-md flex items-center gap-2">
            <span>🚨 Alert: {lead.current_bottleneck}</span>
          </div>
        )}
      <p className="text-gray-700 mt-3 text-sm">{lead.pain_complain}</p>
      <div className="flex justify-between items-center mt-4 text-xs">
        <div>
          <p className="text-gray-500">Team: {lead.team}</p>
          <p className="text-gray-500">Share: Dr. Dummy User</p>
        </div>
        <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-bold">
          {lead.knee_lead_status}
        </span>
      </div>
    </div>
  );
};

export default LeadCard;
