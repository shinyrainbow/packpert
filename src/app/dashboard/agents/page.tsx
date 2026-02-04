"use client";

import { useState, useEffect } from "react";

interface AgentApplication {
  id: string;
  name: string;
  phone: string;
  lineId: string;
  email: string;
  currentWork: string;
  currentWorkOther: string | null;
  expectedIncome: string;
  pricingApproach: string;
  confirmCommission: boolean;
  confirmPricing: boolean;
  isRead: boolean;
  isContacted: boolean;
  contactedAt: string | null;
  notes: string | null;
  createdAt: string;
}

export default function AgentApplicationsPage() {
  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<AgentApplication | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const res = await fetch("/api/agent-applications");
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/agent-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      fetchApplications();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  }

  async function deleteApplication(id: string) {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      await fetch(`/api/agent-applications/${id}`, { method: "DELETE" });
      fetchApplications();
      setSelectedApplication(null);
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  }

  async function toggleContacted(application: AgentApplication) {
    try {
      const res = await fetch(`/api/agent-applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isContacted: !application.isContacted }),
      });
      const updated = await res.json();
      setSelectedApplication(updated);
      fetchApplications();
    } catch (error) {
      console.error("Failed to toggle contacted status:", error);
    }
  }

  async function saveNotes(application: AgentApplication) {
    try {
      const res = await fetch(`/api/agent-applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      const updated = await res.json();
      setSelectedApplication(updated);
      fetchApplications();
    } catch (error) {
      console.error("Failed to save notes:", error);
    }
  }

  const notContactedCount = applications.filter((a) => !a.isContacted).length;

  function exportToCSV() {
    if (applications.length === 0) {
      alert("No applications to export");
      return;
    }

    const headers = [
      "Name",
      "Phone",
      "Line ID",
      "Email",
      "Current Work",
      "Current Work Other",
      "Expected Income",
      "Pricing Approach",
      "Status",
      "Contacted At",
      "Notes",
      "Created At",
    ];

    const csvRows = [
      headers.join(","),
      ...applications.map((app) => {
        const row = [
          `"${app.name.replace(/"/g, '""')}"`,
          `"${app.phone.replace(/"/g, '""')}"`,
          `"${app.lineId.replace(/"/g, '""')}"`,
          `"${app.email.replace(/"/g, '""')}"`,
          `"${app.currentWork.replace(/"/g, '""')}"`,
          `"${(app.currentWorkOther || "").replace(/"/g, '""')}"`,
          `"${app.expectedIncome.replace(/"/g, '""')}"`,
          `"${app.pricingApproach.replace(/"/g, '""')}"`,
          app.isContacted ? "Contacted" : "Pending",
          app.contactedAt ? new Date(app.contactedAt).toLocaleString() : "",
          `"${(app.notes || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
          new Date(app.createdAt).toLocaleString(),
        ];
        return row.join(",");
      }),
    ];

    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `agent_applications_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-6">Agent Applications</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">Total Applications</p>
              <p className="text-2xl font-bold text-primary">{applications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">รอติดต่อกลับ</p>
              <p className="text-2xl font-bold text-orange-600">{notContactedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">ติดต่อกลับแล้ว</p>
              <p className="text-2xl font-bold text-green-600">{applications.length - notContactedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Agent Applications</h2>
          <button
            onClick={exportToCSV}
            disabled={applications.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-muted">No agent applications yet.</div>
        ) : (
          <div className="divide-y">
            {applications.map((app) => (
              <div
                key={app.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!app.isRead ? "bg-yellow-50" : ""}`}
                onClick={() => {
                  setSelectedApplication(app);
                  setNotes(app.notes || "");
                  if (!app.isRead) {
                    markAsRead(app.id);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!app.isRead && <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>}
                      <p className="font-medium text-gray-900 truncate">{app.name}</p>
                      <span className="text-sm text-muted">- {app.currentWork}</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          app.isContacted ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {app.isContacted ? "ติดต่อแล้ว" : "รอติดต่อ"}
                      </span>
                    </div>
                    <p className="text-sm text-muted">
                      {app.phone} | {app.lineId} | {app.email}
                    </p>
                    <p className="text-sm text-primary">คาดหวังรายได้: {app.expectedIncome}</p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="text-xs text-muted">{new Date(app.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-muted">{new Date(app.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">Application Details</h2>
              <button onClick={() => setSelectedApplication(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted">ชื่อ-นามสกุล</p>
                  <p className="font-medium">{selectedApplication.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">เบอร์โทรศัพท์</p>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Line ID</p>
                  <p className="font-medium">{selectedApplication.lineId}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <p className="text-sm text-muted">งานที่ทำปัจจุบัน</p>
                    <p className="font-medium text-primary">
                      {selectedApplication.currentWork}
                      {selectedApplication.currentWorkOther && ` (${selectedApplication.currentWorkOther})`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">คาดหวังรายได้ต่อเดือน</p>
                    <p className="font-medium text-primary">{selectedApplication.expectedIncome}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">แนวทางเมื่อลูกค้าขอราคาต่ำกว่า</p>
                    <p className="font-medium text-primary">{selectedApplication.pricingApproach}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted">ยอมรับเงื่อนไขคอมมิชชั่น</p>
                    <p className={`font-medium ${selectedApplication.confirmCommission ? "text-green-600" : "text-red-600"}`}>
                      {selectedApplication.confirmCommission ? "ยอมรับ" : "ไม่ยอมรับ"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">ยอมรับเงื่อนไขราคา</p>
                    <p className={`font-medium ${selectedApplication.confirmPricing ? "text-green-600" : "text-red-600"}`}>
                      {selectedApplication.confirmPricing ? "ยอมรับ" : "ไม่ยอมรับ"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted">วันที่สมัคร</p>
                    <p className="font-medium">{new Date(selectedApplication.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">สถานะการติดต่อ</p>
                    <p className={`font-medium ${selectedApplication.isContacted ? "text-green-600" : "text-orange-600"}`}>
                      {selectedApplication.isContacted ? "ติดต่อกลับแล้ว" : "รอติดต่อกลับ"}
                      {selectedApplication.contactedAt && (
                        <span className="text-sm text-muted ml-2">
                          ({new Date(selectedApplication.contactedAt).toLocaleString()})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted mb-2">Notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this application..."
                  className="w-full p-3 border rounded-lg resize-none h-24 focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button
                  onClick={() => saveNotes(selectedApplication)}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>

            <div className="p-6 border-t flex justify-between">
              <button
                onClick={() => deleteApplication(selectedApplication.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => toggleContacted(selectedApplication)}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  selectedApplication.isContacted
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {selectedApplication.isContacted ? "ยกเลิกสถานะติดต่อ" : "ติดต่อกลับแล้ว"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
