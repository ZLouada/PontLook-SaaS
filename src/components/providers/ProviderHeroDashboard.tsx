'use client';

import React from 'react';
import {
  Tv,
  CreditCard,
  SlidersHorizontal,
  LogOut,
} from 'lucide-react';

interface ProviderHeroDashboardProps {
  isAr?: boolean;
}

export default function ProviderHeroDashboard({ isAr = false }: ProviderHeroDashboardProps) {
  return (
    <div className="relative w-full [perspective:1400px] sm:[perspective:1800px] py-4 select-none">
      {/* Ambient Depth Glows */}
      <div className="pointer-events-none absolute -top-12 start-1/4 w-3/4 h-3/4 bg-[#FF5C00]/[0.09] blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-0 end-10 w-1/2 h-1/2 bg-blue-500/[0.03] blur-[120px] rounded-full -z-10" />

      {/* 3D Tilted Card Container (exact tilt matching screenshot) */}
      <div
        className="relative rounded-3xl border border-white/10 bg-[#0C0D10] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_60px_-15px_rgba(255,92,0,0.08)] overflow-hidden transition-transform duration-700 ease-out hover:[transform:rotateX(6deg)_rotateY(0deg)_rotateZ(0deg)] text-white"
        style={{
          transform: isAr
            ? 'rotateX(16deg) rotateY(10deg) rotateZ(-3deg)'
            : 'rotateX(16deg) rotateY(-10deg) rotateZ(3deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle Glass Reflection and Inner Ring */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] rounded-3xl z-20" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl z-20" />

        <div className="p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-6 lg:gap-10">
          {/* LEFT SIDEBAR */}
          <div className="w-full md:w-52 lg:w-56 shrink-0 flex flex-col justify-between border-b md:border-b-0 md:border-e border-white/[0.06] pb-6 md:pb-0 md:pe-6">
            <div>
              {/* Brand Logo Header */}
              <div className="flex items-center gap-2.5 mb-8">
                <div className="flex items-center justify-center gap-1 w-7 h-7 rounded-lg bg-[#FF5C00] shadow-sm shadow-orange-500/30">
                  <div className="w-2 h-2 rounded-[2px] bg-white rotate-45" />
                  <div className="w-2 h-2 rounded-[2px] bg-white rotate-45" />
                </div>
                <span className="font-heading font-bold text-lg text-white tracking-tight">
                  PontLook
                </span>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1.5 font-sans" aria-label="Dashboard navigation">
                {/* Active Home Tab */}
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FF5C00]/10 text-[#FF5C00] font-medium text-xs sm:text-sm border border-[#FF5C00]/20 shadow-xs cursor-default">
                  <Tv size={16} className="shrink-0 text-[#FF5C00]" />
                  <span>{isAr ? 'الرئيسية' : 'Home'}</span>
                </div>

                {/* Payments Tab */}
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-400 hover:text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer">
                  <CreditCard size={16} className="shrink-0 text-neutral-400" />
                  <span>{isAr ? 'المدفوعات' : 'Payments'}</span>
                </div>

                {/* Settings Tab */}
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-400 hover:text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer">
                  <SlidersHorizontal size={16} className="shrink-0 text-neutral-400" />
                  <span>{isAr ? 'الإعدادات' : 'Settings'}</span>
                </div>
              </nav>
            </div>

            {/* Sign Out at Bottom */}
            <div className="pt-6 mt-6 border-t border-white/[0.04]">
              <div className="flex items-center gap-3 px-3.5 py-2 text-neutral-400 hover:text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer">
                <LogOut size={16} className="shrink-0 text-neutral-400 rtl:-scale-x-100" />
                <span>{isAr ? 'تسجيل الخروج' : 'Sign out'}</span>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN DASHBOARD AREA */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">
            {/* Top Greeting Header */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-heading">
                {isAr ? 'مرحباً بك، شريك التدريب!' : 'Hi John Bennet!'}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-neutral-400 font-sans font-normal">
                {isAr
                  ? 'مرحباً بك مجدداً في لوحة تحكم الشركاء ومزودي التدريب.'
                  : 'Welcome back to your affiliate dashboard.'}
              </p>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Revenue */}
              <div className="rounded-2xl bg-[#131418] border border-white/[0.06] p-4 sm:p-5 shadow-sm">
                <div className="text-xs font-medium text-neutral-400 font-sans">
                  {isAr ? 'العائد المالي' : 'Revenue'}
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                  $1,041.32
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 font-sans">
                  <span className="text-emerald-400 font-semibold">+25%</span>
                  <span>{isAr ? 'مقارنة بالأسبوع الماضي' : 'from last week'}</span>
                </div>
              </div>

              {/* Card 2: Active Referrals */}
              <div className="rounded-2xl bg-[#131418] border border-white/[0.06] p-4 sm:p-5 shadow-sm">
                <div className="text-xs font-medium text-neutral-400 font-sans">
                  {isAr ? 'الفرص النشطة' : 'Active referrals'}
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                  5
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 font-sans">
                  <span className="text-emerald-400 font-semibold">+25%</span>
                  <span>{isAr ? 'مقارنة بالأسبوع الماضي' : 'from last week'}</span>
                </div>
              </div>
            </div>

            {/* Bottom Chart Card: Monthly Earnings */}
            <div className="rounded-2xl bg-[#131418] border border-white/[0.06] p-4 sm:p-5 shadow-sm">
              <div>
                <div className="text-sm font-semibold text-white font-heading">
                  {isAr ? 'الأرباح الشهرية' : 'Monthly earnings'}
                </div>
                <div className="mt-1 text-xs text-neutral-400 font-sans font-normal">
                  {isAr
                    ? 'أرباحك بناءً على عدد الطلبات والفرص المنفذة.'
                    : 'Your earnings based on the number of orders and your affiliate per store.'}
                </div>
              </div>

              {/* Chart Visualization */}
              <div className="mt-6 pt-2 relative">
                <div className="relative h-28 w-full overflow-hidden">
                  <svg
                    viewBox="0 0 500 120"
                    preserveAspectRatio="none"
                    className="w-full h-full overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="chartGradientOrange" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#FF5C00" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid Guide */}
                    <line
                      x1="0"
                      y1="70"
                      x2="500"
                      y2="70"
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="4 4"
                    />

                    {/* Area Fill */}
                    <path
                      d="M 0,95 Q 80,85 150,60 T 300,45 T 420,25 T 500,15 L 500,120 L 0,120 Z"
                      fill="url(#chartGradientOrange)"
                    />

                    {/* Curve Stroke Line */}
                    <path
                      d="M 0,95 Q 80,85 150,60 T 300,45 T 420,25 T 500,15"
                      fill="none"
                      stroke="#FF5C00"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Active Indicator Dot */}
                    <circle cx="420" cy="25" r="4" fill="#FF5C00" />
                    <circle
                      cx="420"
                      cy="25"
                      r="9"
                      fill="#FF5C00"
                      opacity="0.3"
                      className="animate-ping"
                    />
                  </svg>
                </div>

                {/* X Axis Baseline Label */}
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 pt-2 border-t border-white/[0.04]">
                  <span>4000</span>
                  <span>$1,041.32</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
