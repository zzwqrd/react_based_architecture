/**
 * MiscExtensions.js
 * Mirrors Flutter's date_extensions, list_extensions, and pagination_extensions.
 */

export const DateExtensions = {
  /**
   * Simple time ago implementation
   */
  timeAgo: (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  },

  isToday: (date) => {
    const today = new Date();
    const d = new Date(date);
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear();
  },
};

export const ListExtensions = {
  /**
   * Append a new page to a list while checking for duplicates
   */
  appendPage: (list, newPage, idKey = 'id') => {
    const existingIds = new Set(list.map(item => item[idKey]));
    const filteredNewPage = newPage.filter(item => !existingIds.has(item[idKey]));
    return [...list, ...filteredNewPage];
  },

  /**
   * Get a slice of a list for local pagination
   */
  getPage: (list, page, pageSize) => {
    const start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize);
  },
};

export const PaginationResult = (items, page, pageSize) => ({
  items,
  hasMore: items.length === pageSize,
  currentPage: page,
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { DateExtensions } from './core/utils/extensions_app/MiscExtensions';

const PostDate = () => {
  const timeStr = DateExtensions.timeAgo('2024-10-15T10:00:00Z');
  return <Text>{timeStr}</Text>;
};
*/
