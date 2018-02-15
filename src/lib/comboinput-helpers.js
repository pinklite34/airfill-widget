export const sectionsToItemList = (sections, titles) =>
  sections.reduce((items, section, index) => {
    if (section.length) {
      return items.concat(
        [
          {
            __type: 'sectionTitle',
            title: titles[index],
            key: `section-${index}`,
          },
        ],
        section
      );
    } else {
      return items;
    }
  }, []);

export const virtualIndexToItemIndex = (sections, virtualIndex) => {
  let offset = 0;
  let cursor = 0;

  for (let i = 0, l = sections.length; i < l; i++) {
    const section = sections[i];

    if (section.length) {
      // If we're at the start of a section
      if (virtualIndex - offset - cursor === 0) {
        return virtualIndex - offset;
      }

      // Add offset to compensate for section title
      offset += 1;
      cursor += section.length;

      // If item can be found within current section, return its index
      if (virtualIndex - offset <= cursor) {
        return virtualIndex - offset;
      }
    }
  }

  // Remove one due to 0-indexed array
  return cursor - 1;
};

export const itemIndexToVirtualIndex = (sections, itemIndex) => {
  let offset = 0;
  let cursor = 0;

  for (let i = 0, l = sections.length; i < l; i++) {
    const section = sections[i];

    if (section.length) {
      // If we're at the start of a section
      if (itemIndex + offset - cursor === 0) {
        return itemIndex + offset;
      }

      // Add offset to compensate for section title
      offset += 1;
      cursor += section.length;

      // If item can be found within current section, return its index
      if (itemIndex <= cursor) {
        return itemIndex + offset;
      }
    }
  }

  return cursor + offset;
};
