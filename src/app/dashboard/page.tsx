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

  const unreadCount = contacts.filter((c) => !c.isRead).length;

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
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">Unread</p>
              <p className="text-2xl font-bold text-yellow-600">{unreadCount}</p>
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
              <p className="text-sm text-muted">Read</p>
              <p className="text-2xl font-bold text-green-600">
                {contacts.length - unreadCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Messages */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-primary">Contact Messages</h2>
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

              <div>
                <p className="text-sm text-muted">Received</p>
                <p className="font-medium">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => deleteContact(selectedContact.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
              <a
                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                className="btn-primary"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
