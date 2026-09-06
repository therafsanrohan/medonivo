'use client';

import React, { useState } from 'react';
import { useDoctorAuth } from '../../../context/DoctorAuthContext';
import { StethoscopeIcon, AlertCircleIcon, CheckCircleIcon } from '@medonivo/icons';

interface ChatMessage {
  id: string;
  sender: 'patient' | 'doctor';
  text: string;
  timestamp: string;
}

export default function MessagesPage() {
  const { messages, sendMessageReply } = useDoctorAuth();
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [activeThreadId, setActiveThreadId] = useState<string>(messages[0]?.id || 'msg_1');
  const [sentReplies, setSentReplies] = useState<Record<string, ChatMessage[]>>({
    msg_1: [
      {
        id: 'c_1',
        sender: 'patient',
        text: 'Doctor, should I take Clopidogrel before or after lunch?',
        timestamp: '10 mins ago'
      }
    ],
    msg_2: [
      {
        id: 'c_2',
        sender: 'patient',
        text: 'My BP reading this morning was 132/84 mmHg.',
        timestamp: '2 hours ago'
      }
    ]
  });

  const activeThread = messages.find((m) => m.id === activeThreadId);

  const quickReplies = [
    'Please take the medication after food as prescribed.',
    'Your BP reading is within target range (below 140/90 mmHg). Keep up the diet!',
    'Please visit the chamber for an in-person review.',
    'Kindly upload the lab test report to your CareLoop for review.',
    'No worries — this mild side effect is expected. Monitor for 3 days.'
  ];

  const handleSendReply = (threadId: string) => {
    const msg = replyInputs[threadId]?.trim();
    if (!msg) return;

    sendMessageReply(threadId, msg);

    // Append to local chat state
    const newChatMsg: ChatMessage = {
      id: `chat_${Date.now()}`,
      sender: 'doctor',
      text: msg,
      timestamp: 'Just now'
    };

    setSentReplies((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newChatMsg]
    }));

    setReplyInputs((prev) => ({ ...prev, [threadId]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded">
            Secure Clinical Messaging &bull; CareLoop Sync
          </span>
          <h1 className="text-xl font-bold text-gray-900 mt-1">Patient Communication Portal</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Respond to post-consultation queries, dosage clarification, and active CareLoop check-ins.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-2xl">
          <StethoscopeIcon size={18} className="text-indigo-600" />
          <span className="text-xs font-bold text-indigo-900">Encrypted Doctor Channel</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Thread List Sidebar */}
        <div className="space-y-2">
          {messages.map((thread) => {
            const isSelected = activeThreadId === thread.id;
            return (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`w-full text-left p-4 rounded-2xl border transition ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50 shadow-xs ring-1 ring-sky-300'
                    : 'border-gray-200 bg-white hover:border-sky-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xs font-bold text-gray-900">{thread.patientName}</h3>
                  {thread.unreadCount > 0 && !isSelected && (
                    <span className="text-[10px] font-black bg-sky-600 text-white px-2 py-0.5 rounded-full">
                      {thread.unreadCount} new
                    </span>
                  )}
                </div>
                {thread.relatedCareLoop && (
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded mb-1.5 inline-block truncate max-w-full">
                    CareLoop: {thread.relatedCareLoop}
                  </span>
                )}
                <p className="text-[11px] text-gray-600 line-clamp-2 italic">&ldquo;{thread.lastMessage}&rdquo;</p>
                <span className="text-[10px] text-gray-400 block mt-1">{thread.timestamp}</span>
              </button>
            );
          })}
        </div>

        {/* Active Conversation Area */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex flex-col min-h-[440px] justify-between">
          {activeThread ? (
            <>
              {/* Thread Header */}
              <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">{activeThread.patientName}</h3>
                  {activeThread.relatedCareLoop && (
                    <span className="text-[11px] text-sky-700 font-bold">
                      Linked to CareLoop: {activeThread.relatedCareLoop}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
                  Verified Patient
                </span>
              </div>

              {/* Chat Messages Stream */}
              <div className="flex-1 my-4 space-y-3 overflow-y-auto max-h-[280px] p-2 bg-slate-50/50 rounded-2xl">
                {(sentReplies[activeThread.id] || [
                  {
                    id: 'c_default',
                    sender: 'patient',
                    text: activeThread.lastMessage,
                    timestamp: activeThread.timestamp
                  }
                ]).map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex ${chat.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md text-xs p-3.5 rounded-2xl shadow-xs ${
                        chat.sender === 'doctor'
                          ? 'bg-sky-700 text-white rounded-br-none'
                          : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      <p className="font-medium">{chat.text}</p>
                      <span
                        className={`text-[9px] block mt-1 text-right ${
                          chat.sender === 'doctor' ? 'text-sky-200' : 'text-gray-400'
                        }`}
                      >
                        {chat.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Reply Chips */}
              <div className="border-t border-gray-100 pt-3 space-y-3">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">
                    Quick Clinical Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr}
                        onClick={() => setReplyInputs((prev) => ({ ...prev, [activeThread.id]: qr }))}
                        className="text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-xl hover:bg-sky-100 transition text-left"
                      >
                        {qr.slice(0, 42)}...
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea Input & Send Button */}
                <div className="flex gap-2 items-end">
                  <textarea
                    rows={2}
                    value={replyInputs[activeThread.id] || ''}
                    onChange={(e) => setReplyInputs((prev) => ({ ...prev, [activeThread.id]: e.target.value }))}
                    placeholder="Type clinical response to patient..."
                    className="flex-1 p-3 rounded-2xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-sky-500 resize-none font-medium"
                  />
                  <button
                    onClick={() => handleSendReply(activeThread.id)}
                    className="px-5 py-3 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-black transition shadow-sm h-fit"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <AlertCircleIcon size={36} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-500">Select a patient message thread</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
