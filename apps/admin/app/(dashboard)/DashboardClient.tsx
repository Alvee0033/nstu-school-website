'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  NoticeIcon,
  AcademicsIcon,
  TeacherIcon,
  StudentIcon,
  StaffIcon,
  ResultIcon,
  GalleryIcon,
  ProfileIcon,
  SearchIcon,
  RefreshIcon
} from '@/components/icons';
import styles from './page.module.css';

interface DashboardClientProps {
  initialStats: {
    noticeCount: number;
    classCount: number;
    teacherCount: number;
    studentCount: number;
    staffCount: number;
  };
}

export default function DashboardClient({ initialStats }: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'management'>('all');
  const [lastUpdated, setLastUpdated] = useState<string>(() => new Date().toLocaleTimeString());
  const [chartMetric, setChartMetric] = useState<'enrollment' | 'activity'>('enrollment');
  const [isPending, startTransition] = useTransition();

  // Mock server statistics for system health panel
  const [systemHealth, setSystemHealth] = useState({
    dbLatency: '14ms',
    apiStatus: 'Optimal',
    diskUsage: '34%'
  });

  const handleRefresh = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLastUpdated(new Date().toLocaleTimeString());
      setSystemHealth({
        dbLatency: `${Math.floor(Math.random() * 10) + 8}ms`,
        apiStatus: 'Optimal',
        diskUsage: '34%'
      });
    });
  };

  const statItems = [
    {
      id: 'notices',
      title: 'Notices',
      count: initialStats.noticeCount,
      icon: <NoticeIcon size={22} />,
      link: '/notices',
      category: 'management',
      color: '#3b82f6' // Notice Blue
    },
    {
      id: 'classes',
      title: 'Academics Classes',
      count: initialStats.classCount,
      icon: <AcademicsIcon size={22} />,
      link: '/academics',
      category: 'academic',
      color: '#10b981' // Success Green
    },
    {
      id: 'teachers',
      title: 'Teachers',
      count: initialStats.teacherCount,
      icon: <TeacherIcon size={22} />,
      link: '/teachers',
      category: 'academic',
      color: '#f59e0b' // Warning Gold
    },
    {
      id: 'students',
      title: 'Students',
      count: initialStats.studentCount,
      icon: <StudentIcon size={22} />,
      link: '/students',
      category: 'academic',
      color: '#8b5cf6' // Purple
    },
    {
      id: 'staff',
      title: 'Staff Members',
      count: initialStats.staffCount,
      icon: <StaffIcon size={22} />,
      link: '/staff',
      category: 'management',
      color: '#ec4899' // Pink
    }
  ];

  const quickLinks = [
    {
      title: 'Edit School Profile',
      description: 'Update phone contacts, map frames, logo assets, and social channels',
      icon: <ProfileIcon size={18} />,
      link: '/school-info',
      category: 'management'
    },
    {
      title: 'Manage Student Results',
      description: 'Define exams, evaluate score cards, and compile grade points',
      icon: <ResultIcon size={18} />,
      link: '/results',
      category: 'academic'
    },
    {
      title: 'Upload Media Gallery',
      description: 'Manage event folders, sports day photos, and campus slides',
      icon: <GalleryIcon size={18} />,
      link: '/gallery',
      category: 'management'
    }
  ];

  // Filtering lists
  const filteredStats = statItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const filteredLinks = quickLinks.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || link.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className={styles.container}>
      {/* Welcome Banner */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1 className={styles.title}>Notun Kuri High School Portal</h1>
          <p className={styles.subtitle}>Welcome back, administrator. Manage school rosters, directories, notices, and results.</p>
        </div>
        <div className={styles.statusBadge}>
          <span className={styles.lastUpdated}>Sync: {lastUpdated}</span>
          <button
            onClick={handleRefresh}
            disabled={isPending}
            className={`${styles.refreshBtn} ${isPending ? styles.rotating : ''}`}
          >
            <RefreshIcon size={14} />
            <span>{isPending ? 'Syncing' : 'Sync'}</span>
          </button>
        </div>
      </div>

      {/* Row: Overview Analytics & Diagnostics */}
      <div className={styles.analyticsRow}>
        {/* SVG Chart Panel */}
        <div className={styles.chartPanel}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitleWrapper}>
              <span className={styles.chartTitle}>Console Activity Metrics</span>
              <span className={styles.chartSubtitle}>System statistics over the last semester</span>
            </div>
            <div className={styles.chartToggler}>
              <button
                onClick={() => setChartMetric('enrollment')}
                className={`${styles.toggleBtn} ${chartMetric === 'enrollment' ? styles.toggleBtnActive : ''}`}
              >
                Enrollment
              </button>
              <button
                onClick={() => setChartMetric('activity')}
                className={`${styles.toggleBtn} ${chartMetric === 'activity' ? styles.toggleBtnActive : ''}`}
              >
                Notices
              </button>
            </div>
          </div>

          <div className={styles.chartContainer}>
            {chartMetric === 'enrollment' ? (
              <svg viewBox="0 0 500 180" className={styles.svgChart}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15803d" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#15803d" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                {/* Area Fill */}
                <path d="M 0 150 L 50 120 L 120 135 L 200 90 L 280 110 L 360 60 L 430 80 L 500 40 L 500 160 L 0 160 Z" fill="url(#chartGrad)" />
                {/* Line Path */}
                <path d="M 0 150 L 50 120 L 120 135 L 200 90 L 280 110 L 360 60 L 430 80 L 500 40" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
                {/* Dots */}
                <circle cx="200" cy="90" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
                <circle cx="360" cy="60" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
                <circle cx="500" cy="40" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
                {/* Labels */}
                <text x="10" y="175" fill="#94a3b8" fontSize="10">Jan</text>
                <text x="120" y="175" fill="#94a3b8" fontSize="10">Mar</text>
                <text x="240" y="175" fill="#94a3b8" fontSize="10">May</text>
                <text x="360" y="175" fill="#94a3b8" fontSize="10">Jul</text>
                <text x="470" y="175" fill="#94a3b8" fontSize="10">Sep</text>
              </svg>
            ) : (
              <svg viewBox="0 0 500 180" className={styles.svgChart}>
                <defs>
                  <linearGradient id="chartGradNotice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="#f1f5f9" strokeWidth="1" />
                {/* Area Fill */}
                <path d="M 0 130 L 70 80 L 150 140 L 230 110 L 310 50 L 390 120 L 500 60 L 500 160 L 0 160 Z" fill="url(#chartGradNotice)" />
                {/* Line Path */}
                <path d="M 0 130 L 70 80 L 150 140 L 230 110 L 310 50 L 390 120 L 500 60" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                {/* Dots */}
                <circle cx="310" cy="50" r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                <circle cx="500" cy="60" r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                {/* Labels */}
                <text x="10" y="175" fill="#94a3b8" fontSize="10">Jan</text>
                <text x="120" y="175" fill="#94a3b8" fontSize="10">Mar</text>
                <text x="240" y="175" fill="#94a3b8" fontSize="10">May</text>
                <text x="360" y="175" fill="#94a3b8" fontSize="10">Jul</text>
                <text x="470" y="175" fill="#94a3b8" fontSize="10">Sep</text>
              </svg>
            )}
          </div>
        </div>

        {/* Server Diagnostics panel */}
        <div className={styles.healthPanel}>
          <span className={styles.healthTitle}>System Diagnostics</span>
          <div className={styles.healthStats}>
            <div className={styles.healthItem}>
              <span className={styles.healthLabel}>Database Response</span>
              <span className={styles.healthVal}>{systemHealth.dbLatency}</span>
            </div>
            <div className={styles.healthItem}>
              <span className={styles.healthLabel}>Gateway Latency</span>
              <span className={styles.healthVal}>{systemHealth.apiStatus}</span>
            </div>
            <div className={styles.healthItem}>
              <span className={styles.healthLabel}>Server Disk Load</span>
              <span className={styles.healthVal}>{systemHealth.diskUsage}</span>
            </div>
          </div>

          <div className={styles.healthProgressWrapper}>
            <div className={styles.healthProgressBar}>
              <div className={styles.healthProgressFill} style={{ width: '88%' }}></div>
            </div>
            <div className={styles.healthProgressLabels}>
              <span className={styles.progressText}>All services online</span>
              <span className={styles.progressPercent}>88%</span>
            </div>
          </div>
        </div>
      </div>

      {/* State Controls: Search and Tabs */}
      <div className={styles.controlsRow}>
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab('all')}
            className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
          >
            All Sections
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`${styles.tabButton} ${activeTab === 'academic' ? styles.activeTab : ''}`}
          >
            Academic Panel
          </button>
          <button
            onClick={() => setActiveTab('management')}
            className={`${styles.tabButton} ${activeTab === 'management' ? styles.activeTab : ''}`}
          >
            Administrative Panel
          </button>
        </div>

        <div className={styles.searchWrapper}>
          <SearchIcon size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search panels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className={styles.grid}>
        {filteredStats.map((stat) => (
          <div
            key={stat.id}
            className={styles.card}
            style={{ borderTop: `4px solid ${stat.color}` }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconCircle}>{stat.icon}</div>
              <span className={styles.cardTitle}>{stat.title}</span>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardCount}>{stat.count}</span>
            </div>
            <div className={styles.cardFooter}>
              <Link href={stat.link} className={styles.cardLink}>
                <span>Manage directory</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.linkArrow}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        ))}
        {filteredStats.length === 0 && (
          <div className={styles.noResults}>
            No panels matching your search filter.
          </div>
        )}
      </div>

      {/* Quick Action Shortcuts */}
      <div className={styles.quickLinks}>
        <h2 className={styles.sectionTitle}>Quick Management Shortcuts</h2>
        <div className={styles.linkGrid}>
          {filteredLinks.map((link, idx) => (
            <Link key={idx} href={link.link} className={styles.linkCard}>
              <div className={styles.linkCardHeader}>
                <div className={styles.linkIconWrapper}>{link.icon}</div>
                <div className={styles.linkCardInfo}>
                  <span className={styles.linkTitle}>{link.title}</span>
                  <span className={styles.linkDesc}>{link.description}</span>
                </div>
              </div>
              <div className={styles.linkCardArrow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
