'use client';

import { useState, useEffect } from 'react';

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

export default function DateRangePicker({
  startDate: initialStartDate = '',
  endDate: initialEndDate = '',
  onDateChange,
}: DateRangePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [selectingStart, setSelectingStart] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (date: string) => {
    const isPast = new Date(date) < new Date(new Date().toISOString().split('T')[0]);
    if (isPast) return;

    if (selectingStart || !startDate) {
      // 시작 날짜 선택
      setStartDate(date);
      setEndDate('');
      setSelectingStart(false);
    } else {
      // 종료 날짜 선택
      if (date > startDate) {
        setEndDate(date);
        onDateChange(startDate, date);
        setSelectingStart(true);
      } else {
        // 시작 날짜보다 이전 날짜를 선택하면 새로 시작
        setStartDate(date);
        setEndDate('');
        setSelectingStart(false);
      }
    }
  };

  const resetSelection = () => {
    setStartDate('');
    setEndDate('');
    setSelectingStart(true);
  };

  const days = [];
  const today = new Date().toISOString().split('T')[0];

  // 이전 달의 날짜들
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i);
    days.push({
      date: date.toISOString().split('T')[0],
      isCurrentMonth: false,
      isToday: false,
      isPast: date < new Date(today),
    });
  }

  // 현재 달의 날짜들
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      isCurrentMonth: true,
      isToday: dateStr === today,
      isPast: date < new Date(today),
    });
  }

  // 다음 달의 날짜들
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    days.push({
      date: date.toISOString().split('T')[0],
      isCurrentMonth: false,
      isToday: false,
      isPast: false,
    });
  }

  const isInRange = (date: string) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isSelected = (date: string) => {
    return date === startDate || date === endDate;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-gray-900">
          {year}년 {month + 1}월
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Selection Info */}
      <div className="mb-4 text-sm">
        {!startDate && (
          <p className="text-gray-600">체크인 날짜를 선택하세요</p>
        )}
        {startDate && !endDate && (
          <p className="text-gray-600">체크아웃 날짜를 선택하세요</p>
        )}
        {startDate && endDate && (
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-600">체크인: </span>
              <span className="font-semibold text-gray-900">{startDate}</span>
              <span className="text-gray-600 mx-2">→</span>
              <span className="text-gray-600">체크아웃: </span>
              <span className="font-semibold text-gray-900">{endDate}</span>
            </div>
            <button
              onClick={resetSelection}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              다시 선택
            </button>
          </div>
        )}
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-semibold py-2 ${
              index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const selected = isSelected(day.date);
          const inRange = isInRange(day.date);
          const disabled = day.isPast;
          const dayOfWeek = index % 7;

          return (
            <button
              key={day.date}
              onClick={() => handleDateClick(day.date)}
              disabled={disabled}
              className={`
                aspect-square p-2 text-sm rounded-lg transition-all relative
                ${!day.isCurrentMonth ? 'text-gray-300' : ''}
                ${day.isToday ? 'ring-2 ring-green-500' : ''}
                ${selected ? 'bg-green-600 text-white font-bold' : ''}
                ${inRange && !selected ? 'bg-green-100 text-green-800' : ''}
                ${!selected && !inRange && !disabled && day.isCurrentMonth ? 'hover:bg-gray-100' : ''}
                ${disabled ? 'cursor-not-allowed opacity-40 line-through' : 'cursor-pointer'}
                ${dayOfWeek === 0 && day.isCurrentMonth && !selected && !inRange ? 'text-red-600' : ''}
                ${dayOfWeek === 6 && day.isCurrentMonth && !selected && !inRange ? 'text-blue-600' : ''}
              `}
            >
              {new Date(day.date).getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded border-2 border-green-500"></div>
            <span>오늘</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-green-600"></div>
            <span>선택됨</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-green-100"></div>
            <span>숙박 기간</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-gray-200 line-through"></div>
            <span>지난 날짜</span>
          </div>
        </div>
      </div>
    </div>
  );
}
