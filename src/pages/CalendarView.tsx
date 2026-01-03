import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Trash2, MapPin, Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TravelEntry {
  id: string;
  occasion: string;
  place: string;
  notes?: string;
  date: string;
  color: string;
}

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CalendarView() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
  const [entries, setEntries] = useState<Record<string, TravelEntry[]>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TravelEntry | null>(null);
  const [entryForm, setEntryForm] = useState({
    occasion: "",
    place: "",
    notes: "",
    color: "bg-blue-500"
  });
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('travelEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('travelEntries', JSON.stringify(entries));
  }, [entries]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));
  const goToToday = () => setCurrentDate(new Date(today.getFullYear(), today.getMonth()));

  const handleDateClick = (day: number) => {
    const dateKey = formatDateKey(year, month, day);
    setSelectedDate(dateKey);
    setIsDialogOpen(true);
    setEditingEntry(null);
    setEntryForm({ occasion: "", place: "", notes: "", color: "bg-blue-500" });
  };

  const handleEntryClick = (entry: TravelEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingEntry(entry);
    setEntryForm({
      occasion: entry.occasion,
      place: entry.place,
      notes: entry.notes || "",
      color: entry.color
    });
    setSelectedDate(entry.date);
    setIsDialogOpen(true);
  };

  const saveEntry = () => {
    if (!selectedDate || !entryForm.occasion.trim() || !entryForm.place.trim()) return;

    const newEntry: TravelEntry = {
      id: editingEntry?.id || Date.now().toString(),
      occasion: entryForm.occasion,
      place: entryForm.place,
      notes: entryForm.notes,
      date: selectedDate,
      color: entryForm.color
    };

    setEntries(prev => {
      const updated = { ...prev };
      if (!updated[selectedDate]) {
        updated[selectedDate] = [];
      }
      
      if (editingEntry) {
        const index = updated[selectedDate].findIndex(e => e.id === editingEntry.id);
        if (index !== -1) {
          updated[selectedDate][index] = newEntry;
        }
      } else {
        updated[selectedDate].push(newEntry);
      }
      
      return updated;
    });

    setIsDialogOpen(false);
    setEditingEntry(null);
    setEntryForm({ occasion: "", place: "", notes: "", color: "bg-blue-500" });
  };

  const deleteEntry = () => {
    if (!editingEntry || !selectedDate) return;

    setEntries(prev => {
      const updated = { ...prev };
      if (updated[selectedDate]) {
        updated[selectedDate] = updated[selectedDate].filter(e => e.id !== editingEntry.id);
        if (updated[selectedDate].length === 0) {
          delete updated[selectedDate];
        }
      }
      return updated;
    });

    setIsDialogOpen(false);
    setEditingEntry(null);
  };

  // Calculate stats
  const allEntries = Object.values(entries).flat();
  const totalTrips = allEntries.length;
  const totalDays = Object.keys(entries).length;
  const placeCounts = allEntries.reduce((acc, entry) => {
    acc[entry.place] = (acc[entry.place] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostVisited = Object.entries(placeCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || "None";
  const upcomingTrips = Object.keys(entries).filter(date => new Date(date) > today).length;

  // Generate calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Travel Calendar
          </h1>
          <p className="text-muted-foreground">
            Plan and track your travel adventures
          </p>
        </motion.div>

        {/* Calendar Controls */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={goToToday} variant="outline">
            Today
          </Button>
        </div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border overflow-hidden mb-8"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-display text-xl font-semibold">
              {months[month]} {year}
            </h2>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-border">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-medium bg-primary text-white"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dateKey = day ? formatDateKey(year, month, day) : null;
              const dayEntries = dateKey ? entries[dateKey] || [] : [];
              const isToday = dateKey === todayKey;
              const hasEntries = dayEntries.length > 0;
              
              return (
                <div
                  key={index}
                  onClick={() => day && handleDateClick(day)}
                  className={`min-h-[100px] p-2 border-2 border-primary ${
                    day ? 'hover:bg-muted/50 cursor-pointer transition-colors' : 'bg-muted/20'
                  } ${hasEntries ? 'bg-primary/10' : ''}`}
                >
                  {day && (
                    <>
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${
                          isToday
                            ? 'bg-primary text-primary-foreground font-bold'
                            : hasEntries
                            ? 'bg-primary/20 text-primary font-medium'
                            : 'text-foreground'
                        }`}
                      >
                        {day}
                      </span>
                      
                      {/* Entries */}
                      <div className="mt-1 space-y-1">
                        {dayEntries.map((entry) => (
                          <div
                            key={entry.id}
                            onClick={(e) => handleEntryClick(entry, e)}
                            className={`${entry.color} text-white text-xs px-2 py-1 rounded truncate hover:opacity-80 transition-opacity cursor-pointer`}
                          >
                            {entry.occasion}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Total Trips</h3>
            <p className="text-2xl font-bold text-primary">{totalTrips}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Days Traveled</h3>
            <p className="text-2xl font-bold text-primary">{totalDays}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Most Visited</h3>
            <p className="text-lg font-bold text-primary truncate">{mostVisited}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-1">Upcoming</h3>
            <p className="text-2xl font-bold text-primary">{upcomingTrips}</p>
          </div>
        </motion.div>

        {/* Entry Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEntry ? 'Edit Travel Entry' : 'Add Travel Entry'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Occasion</label>
                <Input
                  placeholder="e.g., Birthday Trip, Vacation"
                  value={entryForm.occasion}
                  onChange={(e) => setEntryForm(prev => ({ ...prev, occasion: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Place</label>
                <Input
                  placeholder="e.g., Paris, Tokyo"
                  value={entryForm.place}
                  onChange={(e) => setEntryForm(prev => ({ ...prev, place: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Notes (Optional)</label>
                <Textarea
                  placeholder="Add any notes about your trip..."
                  value={entryForm.notes}
                  onChange={(e) => setEntryForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { name: 'Blue', value: 'bg-blue-500' },
                    { name: 'Green', value: 'bg-green-500' },
                    { name: 'Red', value: 'bg-red-500' },
                    { name: 'Purple', value: 'bg-purple-500' },
                    { name: 'Orange', value: 'bg-orange-500' },
                    { name: 'Pink', value: 'bg-pink-500' },
                    { name: 'Teal', value: 'bg-teal-500' },
                    { name: 'Yellow', value: 'bg-yellow-500' }
                  ].map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setEntryForm(prev => ({ ...prev, color: color.value }))}
                      className={`w-8 h-8 rounded-full ${color.value} border-2 transition-all ${
                        entryForm.color === color.value ? 'border-foreground scale-110' : 'border-transparent'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={saveEntry} className="flex-1">
                  {editingEntry ? 'Update' : 'Save'}
                </Button>
                {editingEntry && (
                  <Button onClick={deleteEntry} variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}