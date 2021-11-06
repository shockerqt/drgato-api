import { DataSource } from 'apollo-datasource';
import { ActivePrinciple, Laboratory, Remedy, RemedyCategory, RemedyFormat, Unit } from '../models';
import { AddRemedyInput, AddRemedyPayload } from '../schema/remedyResolvers';

export default class RemedyAPI extends DataSource {

  async getAllRemedies() {
    const remedies = await Remedy.findAll({
      include: [Remedy.associations.priceHistories],
    });
    console.log(remedies);
    return remedies;
  }

  async getRemedyById(id: number) {
    const remedy = await Remedy.findByPk(id, {
      include: [Remedy.associations.priceHistories],
      rejectOnEmpty: true,
    });

    return remedy;
  }

  async addRemedy(input: AddRemedyInput): Promise<AddRemedyPayload> {

    const [
      [activePrinciple],
      [category],
      [format],
      [laboratory],
      [netContentUnit],
    ] = await Promise.all([
      ActivePrinciple.findOrCreate({ where: { name: input.activePrinciple } }),
      RemedyCategory.findOrCreate({ where: { name: input.category } }),
      RemedyFormat.findOrCreate({ where: { name: input.format } }),
      Laboratory.findOrCreate({ where: { name: input.laboratory } }),
      Unit.findOrCreate({ where: { name: input.netContentUnit } }),
    ]);

    console.log('ACTIVE PRINCIPLE', category.get('id'));

    const [remedy, created] = await Remedy.findOrCreate({
      where: {
        activePrincipleId: activePrinciple.get('id'),
        categoryId: category.get('id'),
        dose: input.dose,
        formatId: format.get('id'),
        laboratoryId: laboratory.get('id'),
        name: input.name,
        netContent: input.netContent,
        netContentUnitId: netContentUnit.get('id'),
      },
    });

    console.log('REMEDY ADDED', created, remedy.get({ plain: true }));


    return {
      success: true,
      message: 'Success',
      addedRemedy: remedy.get({ plain: true }),
      remedies: await this.getAllRemedies(),
    };
  }

}
