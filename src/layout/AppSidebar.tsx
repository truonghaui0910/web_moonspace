"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

// Simple icons as JSX
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
  </svg>
);

const ChannelsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

type MenuItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    subItems: [
      { name: 'Overview', path: '/dashboard' }
    ]
  },
  {
    name: 'Channels',
    icon: <ChannelsIcon />,
    path: '/channels',
  },
  {
    name: 'Users',
    icon: <UsersIcon />,
    path: '/users',
  },
  {
    name: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
];

export default function AppSidebar() {
  const { isExpanded, isHovered, isMobileOpen, setIsHovered, setIsMobileOpen } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const isOpen = isExpanded || isHovered;
  const isActive = (path: string) => pathname === path;

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-[90px] ${
          isOpen ? 'lg:w-[290px]' : ''
        } transition-all duration-300 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              {isOpen && (
                <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  Moonspace
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                        openSubmenu === item.name
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {item.icon}
                      </div>
                      {isOpen && (
                        <>
                          <span className="ml-3 flex-1 text-left">{item.name}</span>
                          <ChevronDownIcon />
                        </>
                      )}
                    </button>
                    {item.subItems && isOpen && openSubmenu === item.name && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive(subItem.path)
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  item.path && (
                    <Link
                      href={item.path}
                      className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {item.icon}
                      </div>
                      {isOpen && (
                        <span className="ml-3">{item.name}</span>
                      )}
                    </Link>
                  )
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileOpen(false)} />
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 transform transition-transform ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  Moonspace
                </span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-2">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                          openSubmenu === item.name
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="ml-3 flex-1 text-left">{item.name}</span>
                        <ChevronDownIcon />
                      </button>
                      {item.subItems && openSubmenu === item.name && (
                        <div className="ml-6 mt-2 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              onClick={() => setIsMobileOpen(false)}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive(subItem.path)
                                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    item.path && (
                      <Link
                        href={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive(item.path)
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    )
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}