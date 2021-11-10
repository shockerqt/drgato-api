import { Store } from './store';

describe('Remedies store', () => {
  let store;

  it('load remedies', () => {
    store = new Store();
    const remedies = store.loadRemedies();

    expect(remedies).resolves.toContainEqual({
      category: 'Sistema respiratorio y alergias',
      uri: 'adrisin-heel-50-comprimidos',
      name: 'Adrisin',
      activePrinciple: 'Adrisin',
      laboratory: 'Heel',
      netContent: 50,
      netContentUnit: 'comprimidos',
      format: 'Comprimidos sublinguales',
    });
  });

  it('add remedy', () => {
    store = new Store();

    store.addRemedy({
      category: 'Sistema respiratorio y alergias',
      uri: 'adrisin-heel-50-comprimidos',
      name: 'Adrisin',
      activePrinciple: 'Adrisin',
      laboratory: 'Heel',
      netContent: 51,
      netContentUnit: 'comprimidos',
      format: 'Comprimidos sublinguales',
    });

    const remedies = store.loadRemedies();

    expect(remedies).resolves.toHaveLength(2);

  });


});
