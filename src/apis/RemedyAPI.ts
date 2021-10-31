import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server-core';
import { ActivePrinciple, Laboratory, Remedy, RemedyCategory, RemedyFormat, Unit } from '../models';
import { AddRemedyInput } from '../schema/remedyResolvers';

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

  async addRemedy(input: AddRemedyInput) {
    const remedies = Remedy.create({
      name: input.name,
      categoryId: {
        name: input.category,
      },
      dose: input.dose,
      activePrincipleId: {
        name: input.activePrinciple,
      },
      laboratoryId: {
        name: input.laboratory,
      },
      netContent: input.netContent,
      netContentUnitId: {
        name: input.netContentUnit,
      },
      formatId: input.format ? {
        name: input.format,
      } : null,
    }, {
      include: [RemedyCategory, ActivePrinciple, Laboratory, Unit, RemedyFormat],
    });

    return remedies;
  }

}
