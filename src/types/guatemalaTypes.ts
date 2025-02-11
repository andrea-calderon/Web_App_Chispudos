// types/guatemalaTypes.ts
export type Department = {
    name: string;
    municipalities: string[];
  };
  
  export const GUATEMALA_DEPARTMENTS: Department[] = [
    {
      name: 'Guatemala',
      municipalities: ['San José Pinula', 'Santa Catarina Pinula', 'Fraijanes', /*...*/],
    },
    {
      name: 'Alta Verapaz',
      municipalities: ['Cobán', 'Chisec', 'San Pedro Carchá', /*...*/],
    },
    {
      name: 'Chimaltenango', 
      municipalities: ['Chimaltenango', 'San José Poaquil', 'San Martín Jilotepeque', 'Tecpán Guatemala', /*...*/],
    },
    {
      name: 'Quetzaltenango',
      municipios: ['Quetzaltenango', 'Salcajá', 'La Esperanza', /*...*/],
    },
    {
      name: 'Sololá',
      municipios: ['Sololá', 'Panajachel', 'Santa Catarina Ixtahuacán', /*...*/],
    },
    {
      name: 'Totonicapán',
      municipios: ['Totonicapán', 'Santa María Chiquimula', 'San Francisco El Alto', /*...*/],
    },
    {
      name: 'Suchitepéquez',
      municipios: ['Mazatenango', 'Cuyotenango', 'Santa Lucía Cotzumalguapa', /*...*/],
    },
    // Agregar todos los departamentos según ISO 3166-2:GT
    // Fuente: https://es.wikipedia.org/wiki/Departamentos_de_Guatemala
  ];