import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Entity {
  id: string;
  type: string;
  relation: string;
}

interface RebacContextType {
  userEntities: Entity[];
  setUser: (entities: Entity[]) => void;
  hasAccess: (entityId: string, entityType: string, relationship: string) => boolean;
}

const RebacContext = createContext<RebacContextType | null>(null);

export const useRebac = () => {
  const context = useContext(RebacContext);
  if (!context) {
    throw new Error('useRebac must be used within a RebacProvider');
  }
  return context;
};

interface RebacProviderProps {
  children: ReactNode;
}

export const RebacProvider: React.FC<RebacProviderProps> = ({ children }) => {
  const [userEntities, setUserEntities] = useState<Entity[]>([]);

  const setUser = (entities: Entity[]) => {
    setUserEntities(entities);
  };

  const hasAccess = (entityId: string, entityType: string, relationship: string) => {
    return userEntities.some(
      (entity) => entity.id === entityId && entity.type === entityType && entity.relation === relationship
    );
  };

  return (
    <RebacContext.Provider value={{ userEntities, setUser, hasAccess }}>
      {children}
    </RebacContext.Provider>
  );
};
