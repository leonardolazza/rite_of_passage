import { describe, it, expect } from 'vitest';
import { siteConfig } from '../src/data/siteConfig';
import { services } from '../src/data/services';
import { artists } from '../src/data/artists';
import { assetUrl } from '../src/utils/paths';

describe('Site Configuration & Domain Entity', () => {
  it('should define core company brand metadata', () => {
    expect(siteConfig.name).toBe('Rite of Passage');
    expect(siteConfig.tagline).toBeTruthy();
    expect(siteConfig.phone).toMatch(/^\+?[0-9\s-]+$/);
    expect(siteConfig.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('should include verified social media links', () => {
    expect(siteConfig.socials.instagram.url).toContain('instagram.com');
    expect(siteConfig.socials.youtube.url).toContain('youtube.com');
  });
});

describe('Services Domain Data Integrity', () => {
  it('should contain all 10 curated bespoke services', () => {
    expect(services.length).toBe(10);
  });

  it('should validate service categories and sequential numbers', () => {
    const validCategories = ['produccion', 'artistas', 'gestion'];
    services.forEach((service, index) => {
      expect(validCategories).toContain(service.category);
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      const expectedNumber = (index + 1).toString().padStart(2, '0');
      expect(service.number).toBe(expectedNumber);
    });
  });
});

describe('Artist Entity & Mini-site Scaling', () => {
  it('should include resident artist Joa Lamtzev', () => {
    const joa = artists.find(a => a.slug === 'joa-lamtzev');
    expect(joa).toBeDefined();
    expect(joa?.name).toBe('Joa Lamtzev');
    expect(joa?.role).toContain('Saxofonista');
    expect(joa?.formats.length).toBeGreaterThanOrEqual(3);
  });

  it('should have valid show formats with media and descriptions', () => {
    const joa = artists.find(a => a.slug === 'joa-lamtzev')!;
    joa.formats.forEach(format => {
      expect(format.number).toBeTruthy();
      expect(format.title).toBeTruthy();
      expect(format.description).toBeTruthy();
      expect(format.image).toBeTruthy();
      expect(format.waMessage).toBeTruthy();
    });
  });
});

describe('Routing & Asset Path Utility', () => {
  it('should normalize and prepend base path for GitHub Pages', () => {
    const path = assetUrl('/assets/logo_brand.png');
    expect(path).toContain('assets/logo_brand.png');
  });

  it('should handle already relative paths without double slashes', () => {
    const path = assetUrl('assets/favicon.png');
    expect(path).not.toContain('//assets');
  });
});
