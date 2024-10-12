import { useRebac } from '../context/RebacContext';

export const useUserEntities = () => {
  const { userEntities } = useRebac();
  return userEntities;
};