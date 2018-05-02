import reducer, {
  selectCountryList,
  selectCountry,
  selectAvailableOperators,
  selectSelectedOperator,
} from './inventory';

describe('reducer', () => {
  const state = {};

  it('returns state for unknown actions', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };

    expect(reducer(state, action)).toEqual(state);
  });

  it('handles SET_COUNTRY action', () => {
    const country = 'SE';

    const action = {
      type: 'SET_COUNTRY',
      payload: country,
    };

    const expected = {
      ...state,
      selectedCountry: country,
    };

    expect(reducer(state, action)).toEqual(expected);
  });

  it('handles LOAD_OPERATOR action', () => {
    const action = {
      type: 'LOAD_OPERATOR',
      payload: {
        operatorSlug: 'operator',
      },
    };

    const expected = {
      ...state,
      selectedOperator: action.payload.operatorSlug,
    };

    expect(reducer(state, action)).toEqual(expected);
  });

  it('handles LOAD_OPERATOR_SUCCESS action', () => {
    const action = {
      type: 'LOAD_OPERATOR_SUCCESS',
      payload: {
        slug: 'slug',
      },
    };

    const expected = {
      ...state,
      selectedOperator: action.payload.slug,
    };

    expect(reducer(state, action)).toEqual(expected);
  });
});

describe('selectInventory', () => {});
// export const selectInventory = createSingleResultSelector('airfillWidget.inventory');

describe('selectors', () => {
  const sweden = {
    alpha2: 'SE',
    name: 'Sweden',
    slug: 'sweden',
  };
  const germany = {
    alpha2: 'DE',
    name: 'Germany',
    slug: 'germany',
    operators: {
      'atg-mobile-germany': {
        name: 'ATG Mobile Germany',
        slug: 'atg-mobile-germany',
      },
      viber: {
        name: 'Viber',
        slug: 'viber',
        type: 'voip',
      },
    },
  };

  const baseState = {
    airfillWidget: {
      inventory: {
        items: [{ [sweden.alpha2]: sweden, [germany.alpha2]: germany }],
        selectedCountry: germany.alpha2,
        selectedOperator: 'viber',
      },
    },
  };

  describe('selectCountryList', () => {
    it('returns an alphabetically sorted array of countries', () => {
      expect(
        selectCountryList(baseState).filter(country => !country.virtual)
      ).toEqual([germany, sweden]);
    });
  });

  describe('selectCountry', () => {
    it('returns null if no country was selected', () => {
      const state = {
        airfillWidget: {
          inventory: {
            ...baseState.airfillWidget.inventory,
            selectedCountry: null,
          },
        },
      };
      expect(selectCountry(state)).toEqual(null);
    });

    it('returns the selected country', () => {
      expect(selectCountry(baseState)).toEqual(germany);
    });
  });

  describe('selectAvailableOperators', () => {
    it('returns an empty object if country is not found', () => {
      const state = {
        airfillWidget: {
          inventory: {
            ...baseState.airfillWidget.inventory,
            selectedCountry: null,
          },
        },
      };

      const expected = {};

      expect(selectAvailableOperators(state)).toEqual(expected);
    });

    it('returns an object with operators grouped by type', () => {
      const groupedOperators = {
        mobile: [germany.operators['atg-mobile-germany']],
        voip: [germany.operators['viber']],
      };

      expect(selectAvailableOperators(baseState)).toEqual(groupedOperators);
    });

    it('returns an object with operators sorted by popularity', () => {
      const operators = {
        'e-plus-germany': {
          name: 'E-Plus Germany',
          slug: 'e-plus-germany',
          stats: {
            popularity: 30.017241379310345,
          },
        },
        'o2-germany': {
          name: 'O2 Germany',
          slug: 'o2-germany',
          stats: {
            popularity: 55,
          },
        },
      };

      const state = {
        airfillWidget: {
          inventory: {
            ...baseState.airfillWidget.inventory,
            items: [
              {
                [germany.alpha2]: {
                  operators: {
                    'atg-mobile-germany':
                      germany.operators['atg-mobile-germany'],
                    ...operators,
                  },
                },
              },
            ],
          },
        },
      };

      const sortedOperators = {
        mobile: [
          operators['o2-germany'],
          operators['e-plus-germany'],
          germany.operators['atg-mobile-germany'],
        ],
      };

      expect(selectAvailableOperators(state)).toEqual(sortedOperators);
    });
  });

  describe('selectSelectedOperator', () => {
    it('returns null if no operator is selected', () => {
      const state = {
        airfillWidget: {
          inventory: {
            ...baseState.airfillWidget.inventory,
            selectedOperator: null,
          },
        },
      };

      expect(selectSelectedOperator(state)).toEqual(null);
    });

    it('returns null if no country is selected', () => {
      const state = {
        airfillWidget: {
          inventory: {
            ...baseState.airfillWidget.inventory,
            selectedCountry: null,
          },
        },
      };

      expect(selectSelectedOperator(state)).toEqual(null);
    });

    it("returns null if operator is not in the country's operators", () => {
      const state = {
        airfillWidget: {
          inventory: {
            ...baseState.airfillWidget.inventory,
            selectedOperator: 'notexisting',
          },
        },
      };

      expect(selectSelectedOperator(state)).toEqual(null);
    });

    it('returns selected operator', () => {
      expect(selectSelectedOperator(baseState)).toEqual(
        germany.operators['viber']
      );
    });
  });
});
