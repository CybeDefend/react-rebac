import { Entity } from '../context/RebacContext';

export const findEntitiesByType = (userEntities: Entity[], entityType: string) => {
  return userEntities.filter(entity => entity.type === entityType);
};
