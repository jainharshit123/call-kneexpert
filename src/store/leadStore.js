import { create } from "zustand";
import { leads as mockLeads } from "../api/mockData";
import toast from "react-hot-toast";

export const useLeadStore = create((set, get) => ({
  // --- STATE ---
  leads: [],
  isLoading: true,
  searchTerm: "",

  // --- ACTIONS ---
  fetchLeads: () => {
    // Simulate API call
    setTimeout(() => {
      set({ leads: mockLeads, isLoading: false });
    }, 1500);
  },

  setSearchTerm: (term) => set({ searchTerm: term }),

  shareLead: (lead) => {
    const textToShare = `Lead: ${lead.patient_full_name}\nStatus: ${lead.knee_lead_status}\nCase: ${lead.case_type}`;
    if (navigator.share) {
      navigator.share({ title: "KneeXpert Lead", text: textToShare });
    } else {
      navigator.clipboard.writeText(textToShare);
      toast.success("Lead details copied to clipboard!");
    }
  },

  // --- SELECTORS / COMPUTED STATE ---
  // A function to get filtered leads
  getFilteredLeads: () => {
    const { leads, searchTerm } = get();
    if (!searchTerm) return leads;
    return leads.filter(
      (lead) =>
        lead.patient_full_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        lead.mobile.includes(searchTerm)
    );
  },
}));
