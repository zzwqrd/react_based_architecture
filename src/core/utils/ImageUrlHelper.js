import { AppConstants } from '../constants/AppConstants';

/**
 * ImageUrlHelper.js
 * Mirrors Flutter's image_url_helper.dart extension logic.
 * Provides sanitization, S3 conversion, and cache-busting for image URLs.
 */

const _baseUrl = AppConstants.baseUrl;

/**
 * Returns the best possible valid image URL after sanitization & conversion.
 * @param {string|null|undefined} url 
 * @returns {string}
 */
export const getBestImageUrl = (url) => {
  const candidates = getAllPossibleUrls(url);
  return candidates.length > 0 ? candidates[0] : '';
};

/**
 * Returns all valid image URL candidates (best → fallback).
 * @param {string|null|undefined} url 
 * @returns {string[]}
 */
export const getAllPossibleUrls = (url) => {
  if (!url || typeof url !== 'string' || url.trim() === '') return [];

  const clean = _cleanUrl(url);
  const timestamp = Date.now();
  const urls = [];

  // 1. Try clean direct (without cache hash like 9320ae4c...)
  const direct = _removeCacheHash(clean);
  if (direct !== clean && _isValidUrl(direct)) {
    urls.push(_addTimestamp(direct, timestamp));
  }

  // 2. Original + timestamp
  if (_isValidUrl(clean)) {
    urls.push(_addTimestamp(clean, timestamp));
  }

  // 3. Try S3 → Site conversion
  if (clean.includes('fakestore-media-bucket.s3')) {
    const siteUrl = _convertS3ToSiteUrl(clean);
    if (_isValidUrl(siteUrl) && siteUrl !== clean) {
      urls.push(_addTimestamp(siteUrl, timestamp));
    }
  }

  // 4. Try fixing relative paths
  const fixed = _fixRelativePath(clean);
  if (fixed !== clean && _isValidUrl(fixed)) {
    urls.push(_addTimestamp(fixed, timestamp));
  }

  // Remove duplicates while preserving order
  return [...new Set(urls)];
};

// --- Private Helpers ---

const _cleanUrl = (raw) => raw.split('<Error>')[0].trim();

/**
 * Removes /cache/<any_hash_30_40> from the path.
 */
const _removeCacheHash = (url) => {
  try {
    const urlObj = new URL(url);
    const segments = urlObj.pathname.split('/');
    const newSegments = [];

    for (let i = 0; i < segments.length; i++) {
      if (segments[i] === 'cache' && i + 1 < segments.length) {
        const hash = segments[i + 1];
        // Matches hex patterns typically used for cache hashes (30-40 chars)
        if (/^[0-9a-f]{30,40}$/i.test(hash)) {
          i++; // skip hash segment
          continue;
        }
      }
      newSegments.push(segments[i]);
    }

    urlObj.pathname = newSegments.join('/');
    return urlObj.toString();
  } catch (e) {
    return url;
  }
};

const _convertS3ToSiteUrl = (s3Url) => {
  return s3Url.replace(
    /^https:\/\/fakestore-media-bucket\.s3\.[^/]+\//,
    `${_baseUrl}/media/`
  );
};

const _fixRelativePath = (url) => {
  if (url.startsWith('http')) return url;

  // Case 1: Relative path
  if (url.startsWith('/')) {
    return `${_baseUrl}${url}`;
  }

  // Case 2: Filename only
  if (url.includes('.') && !url.includes('/')) {
    return `${_baseUrl}/media/catalog/category/${url}`;
  }

  return url;
};

const _addTimestamp = (url, ts) => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('_t', ts);
    return urlObj.toString();
  } catch (e) {
    return url.includes('?') ? `${url}&_t=${ts}` : `${url}?_t=${ts}`;
  }
};

const _isValidUrl = (url) => {
  if (!url || url.includes('<Error>')) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { getBestImageUrl } from './core/utils/ImageUrlHelper';
import { Image } from 'react-native';

const ProductImage = ({ rawUrl }) => {
  const safeUrl = getBestImageUrl(rawUrl);

  return (
    <Image 
      source={{ uri: safeUrl }} 
      style={{ width: 100, height: 100 }} 
    />
  );
};
*/
