// Stable IDs survive renaming and reordering price sections in the admin.
export const serviceAnchors = {
  'section-0': 'hairdresser',
  'section-1': 'makeup',
  'section-2': 'nails',
};

export function priceSectionId(section) {
  return serviceAnchors[section.id] || `price-${section.id}`;
}

export function serviceDestination(sectionId) {
  return { name: 'services', hash: `#${serviceAnchors[sectionId] || `price-${sectionId}`}` };
}
