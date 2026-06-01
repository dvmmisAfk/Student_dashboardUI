"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Course } from "@/types/course";
import { mockUser } from "@/lib/mock-data";
import LeftRail from "./LeftRail";
import BottomNav from "./BottomNav";
import RightRail from "./RightRail";
import MissionControl from "./MissionControl";
import MetricsStrip from "./MetricsStrip";
import CourseGrid from "./CourseGrid";
import BentoActivityTile from "./BentoActivityTile";
import SearchOverlay from "./SearchOverlay";
import StudyTimer from "./StudyTimer";
import CourseModal from "./CourseModal";
import CoursesView from "./views/CoursesView";
import ActivityView from "./views/ActivityView";
import AchievementsView from "./views/AchievementsView";

export type View = "dashboard" | "courses" | "activity" | "achievements";

const bentoContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0 } },
};

const bentoItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 26, mass: 0.9 },
  },
};

interface Props {
  courses: Course[];
  greeting: string;
  user: typeof mockUser;
  date: string;
}

export default function DashboardShell({ courses, greeting, user, date }: Props) {
  const [view, setView]                     = useState<View>("dashboard");
  const [searchOpen, setSearchOpen]         = useState(false);
  const [timerOpen, setTimerOpen]           = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(s => !s); }
      if (e.key === "Escape") { setSearchOpen(false); setSelectedCourse(null); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openCourse(c: Course) { setSelectedCourse(c); }

  return (
    <div className="flex h-dvh overflow-hidden" style={{ background: "var(--surface-base)" }}>
      <LeftRail
        view={view}
        onNavigate={setView}
        onSearch={() => setSearchOpen(true)}
        onTimer={() => setTimerOpen(t => !t)}
      />

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="pb-6"
            >
              {view === "dashboard" && (
                <motion.div
                  variants={bentoContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={bentoItem}>
                    <MissionControl greeting={greeting} user={user} date={date} />
                  </motion.div>
                  <motion.div variants={bentoItem}>
                    <MetricsStrip user={user} />
                  </motion.div>
                  <motion.div variants={bentoItem}>
                    <CourseGrid courses={courses} onContinue={openCourse} />
                  </motion.div>
                  <motion.div variants={bentoItem}>
                    <BentoActivityTile />
                  </motion.div>
                </motion.div>
              )}
              {view === "courses"      && <CoursesView courses={courses} onContinue={openCourse} />}
              {view === "activity"     && <ActivityView />}
              {view === "achievements" && <AchievementsView />}
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNav view={view} onNavigate={setView} />
      </div>

      <RightRail onCourseSelect={openCourse} courses={courses} />

      <AnimatePresence>
        {searchOpen && (
          <SearchOverlay
            courses={courses}
            onClose={() => setSearchOpen(false)}
            onNavigate={(v) => { setView(v); setSearchOpen(false); }}
            onCourseSelect={(c) => { openCourse(c); setSearchOpen(false); }}
          />
        )}
        {selectedCourse && (
          <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
        {timerOpen && <StudyTimer onClose={() => setTimerOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
