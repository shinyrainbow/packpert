"use client";

import { useState, useEffect } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  isContacted: boolean;
  contactedAt: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      fetchContacts();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  }

  async function deleteContact(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      fetchContacts();
      setSelectedContact(null);
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  }

  async function toggleContacted(contact: Contact) {
    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isContacted: !contact.isContacted }),
      });
      const updatedContact = await res.json();
      setSelectedContact(updatedContact);
      fetchContacts();
    } catch (error) {
      console.error("Failed to toggle contacted status:", error);
    }
  }

  const notContactedCount = contacts.filter((c) => !c.isContacted).length;

  function exportToCSV() {
    if (contacts.length === 0) {
      alert("No contacts to export");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "Company",
      "Subject",
      "Message",
      "Status",
      "Contacted At",
      "Created At",
    ];

    const csvRows = [
      headers.join(","),
      ...contacts.map((contact) => {
        const row = [
          `"${contact.name.replace(/"/g, '""')}"`,
          `"${contact.email.replace(/"/g, '""')}"`,
          `"${(contact.phone || "").replace(/"/g, '""')}"`,
          `"${(contact.company || "").replace(/"/g, '""')}"`,
          `"${contact.subject.replace(/"/g, '""')}"`,
          `"${contact.message.replace(/"/g, '""').replace(/\n/g, " ")}"`,
          contact.isContacted ? "Contacted" : "Pending",
          contact.contactedAt ? new Date(contact.contactedAt).toLocaleString() : "",
          new Date(contact.createdAt).toLocaleString(),
        ];
        return row.join(",");
      }),
    ];

    const csvContent = "\uFEFF" + csvRows.join("\n"); // BOM for Thai support
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `contacts_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">Total Messages</p>
              <p className="text-2xl font-bold text-primary">{contacts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
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
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">ติดต่อกลับแล้ว</p>
              <p className="text-2xl font-bold text-green-600">
                {contacts.length - notContactedCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Messages */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Contact Messages</h2>
          <button
            onClick={exportToCSV}
            disabled={contacts.length === 0}
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
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-muted">
            No contact messages yet.
          </div>
        ) : (
          <div className="divide-y">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !contact.isRead ? "bg-yellow-50" : ""
                }`}
                onClick={() => {
                  setSelectedContact(contact);
                  if (!contact.isRead) {
                    markAsRead(contact.id);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!contact.isRead && (
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      )}
                      <p className="font-medium text-gray-900 truncate">
                        {contact.name}
                      </p>
                      {contact.company && (
                        <span className="text-sm text-muted">
                          - {contact.company}
                        </span>
                      )}
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          contact.isContacted
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {contact.isContacted ? "ติดต่อแล้ว" : "รอติดต่อ"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary truncate">
                      {contact.subject}
                    </p>
                    <p className="text-sm text-muted truncate">{contact.message}</p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="text-xs text-muted">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted">
                      {new Date(contact.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary">
                Message Details
              </h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted">Name</p>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <p className="text-sm text-muted">Phone</p>
                    <p className="font-medium">{selectedContact.phone}</p>
                  </div>
                )}
                {selectedContact.company && (
                  <div>
                    <p className="text-sm text-muted">Company</p>
                    <p className="font-medium">{selectedContact.company}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-muted">Subject</p>
                <p className="font-medium text-primary">{selectedContact.subject}</p>
              </div>

              <div>
                <p className="text-sm text-muted">Message</p>
                <p className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted">Received</p>
                  <p className="font-medium">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted">สถานะการติดต่อ</p>
                  <p className={`font-medium ${selectedContact.isContacted ? "text-green-600" : "text-orange-600"}`}>
                    {selectedContact.isContacted ? "ติดต่อกลับแล้ว" : "รอติดต่อกลับ"}
                    {selectedContact.contactedAt && (
                      <span className="text-sm text-muted ml-2">
                        ({new Date(selectedContact.contactedAt).toLocaleString()})
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-between">
              <button
                onClick={() => deleteContact(selectedContact.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => toggleContacted(selectedContact)}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  selectedContact.isContacted
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {selectedContact.isContacted ? "ยกเลิกสถานะติดต่อ" : "ติดต่อกลับแล้ว"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
