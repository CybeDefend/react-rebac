import { useRebac } from '../context/RebacContext';

export const useAuthorization = (
  entityId: string,
  entityType: string,
  relationship: string | string[]
): boolean | undefined => {
  const { hasAccess } = useRebac();
  return hasAccess(entityId, entityType, relationship);
};
