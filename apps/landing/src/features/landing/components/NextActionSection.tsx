import React from 'react';
import { FileText, CalendarCheck, Clock, CheckCircle2 } from 'lucide-react';

export function NextActionSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <h2 className="text-3xl font-bold tracking-tight text-mainText sm:text-4xl mb-6">
            Always know exactly what to do next.
          </h2>
          <p className="text-lg text-mutedText mb-8">
            Medonivo removes the guesswork from healthcare. Whether you need to schedule a test, upload a report, or take your medicine, your priority actions are always front and center.
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
              <span className="text-mainText font-medium">Smart prioritization based on urgency</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
              <span className="text-mainText font-medium">Actionable cards (e.g., Book directly from a reminder)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
              <span className="text-mainText font-medium">Clear indicators for overdue tasks</span>
            </li>
          </ul>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-sm font-bold text-mutedText uppercase tracking-wider mb-6">Your Next Steps</h3>
            
            <div className="space-y-4">
              {/* High Priority Action */}
              <div className="bg-white rounded-xl p-5 border-l-4 border-warning shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-50 p-3 rounded-lg text-warning">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-mainText">Overdue Follow-up</h4>
                    <p className="text-sm text-mutedText">Dr. Shania Esha • General Checkup</p>
                  </div>
                </div>
                <button className="text-sm font-semibold text-white bg-warning hover:bg-yellow-600 px-4 py-2 rounded-lg transition">
                  Book Now
                </button>
              </div>

              {/* Normal Priority Action */}
              <div className="bg-white rounded-xl p-5 border-l-4 border-primary-blue shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-primary-blue">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-mainText">Upload CBC Report</h4>
                    <p className="text-sm text-mutedText">Test completed yesterday</p>
                  </div>
                </div>
                <button className="text-sm font-semibold text-primary-blue bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition">
                  Upload
                </button>
              </div>

              {/* Lower Priority Action */}
              <div className="bg-white rounded-xl p-5 border-l-4 border-gray-300 shadow-sm flex items-center justify-between opacity-80">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-500">
                    <CalendarCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-mainText">Upcoming Appointment</h4>
                    <p className="text-sm text-mutedText">Dr. Sarah Jenkins • in 3 days</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
