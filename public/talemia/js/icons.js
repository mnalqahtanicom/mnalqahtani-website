/* ==========================================================================
   TALEMIA · ICON SYSTEM — custom inline SVG (consistent 24px, 1.8 stroke)
   Replaces all unicode/emoji glyphs. Usage: ICON('home','ic')
   ========================================================================== */
window.ICONS = {
  /* --- navigation --- */
  home:    '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"/><path d="M10 20v-6h4v6"/>',
  thread:  '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="12" r="2.4"/><circle cx="6" cy="18" r="2.4"/><path d="M8.2 7.2 15.8 11"/><path d="M15.8 13 8.2 16.8"/>',
  target:  '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
  chat:    '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-4 4v-4H6.5"/>',
  spark:   '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 8.5 13.4 11l2.6 1-2.6 1L12 15.5 10.6 13 8 12l2.6-1z"/>',
  voice:   '<path d="M4 9v6M8 6v12M12 4v16M16 7v10M20 10v4"/>',
  user:    '<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/>',
  team:    '<circle cx="9" cy="8" r="3.2"/><path d="M3 19a6 6 0 0 1 12 0"/><path d="M16 6.2a3.2 3.2 0 0 1 0 6"/><path d="M17 13.5a6 6 0 0 1 4 5.5"/>',
  org:     '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="15" width="6" height="5" rx="1"/><rect x="15" y="15" width="6" height="5" rx="1"/><path d="M12 8v4M12 12H6v3M12 12h6v3"/>',
  console: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18"/><path d="M7 13h5M7 16h8"/>',
  gear:    '<circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  bell:    '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  grid:    '<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
  more:    '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',

  /* --- actions / status --- */
  plus:    '<path d="M12 5v14M5 12h14"/>',
  check:   '<path d="m5 12.5 4.5 4.5L19 7"/>',
  arrow:   '<path d="M14 6l-6 6 6 6"/>',
  flag:    '<path d="M6 21V4M6 4h11l-2 4 2 4H6"/>',
  download:'<path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 19h14"/>',
  heart:   '<path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z"/>',
  star:    '<path d="M12 4l2.3 5.2 5.7.5-4.3 3.8 1.3 5.6L12 16.9 7 19.1l1.3-5.6L4 9.7l5.7-.5z"/>',
  shield:  '<path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z"/>',
  play:    '<path d="M8 5v14l11-7z"/>',
  pause:   '<path d="M8 5v14M16 5v14"/>',
  close:   '<path d="M6 6l12 12M18 6 6 18"/>',
  growth:  '<path d="M4 18l5-5 3 3 7-8"/><path d="M16 8h3v3"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15 9-2 5-4 1 2-5z"/>',
  sparkle: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/>',
};
window.ICON = (name, cls='ic') =>
  `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${window.ICONS[name]||''}</svg>`;
