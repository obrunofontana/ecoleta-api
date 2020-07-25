import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('itemscollect').del();

  // Inserts seed entries
  await knex('itemscollect').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg', },
    { title: 'Baterias e Pilhas', image: 'baterias.svg', },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg', },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg', },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg', },
    { title: 'Óleo de Cozinha', image: 'oleo.svg', },
  ]);
}
