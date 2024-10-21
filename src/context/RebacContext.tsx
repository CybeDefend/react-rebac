import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Entity {
  id: string;
  type: string;
  relation: string;
}

interface RebacContextType {
  userEntities: Entity[] | null;
  setUser: (entities: Entity[]) => void;
  hasAccess: (entityId: string, entityType: string, relationship: string | string[]) => boolean | undefined;
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
  const [userEntities, setUserEntities] = useState<Entity[] | null>(null);

  const setUser = (entities: Entity[]) => {
    setUserEntities(entities);
  };

  const hasAccess = (
    entityId: string,
    entityType: string,
    relationship: string | string[]
  ): boolean | undefined => {
    if (userEntities === null) {
      // Entités non chargées
      return undefined;
    }

    const relationships = Array.isArray(relationship) ? relationship : [relationship];

    // Vérifier si l'utilisateur a l'une des relations spécifiées
    return userEntities.some(
      (entity) =>
        entity.id === entityId &&
        entity.type === entityType &&
        relationships.includes(entity.relation) // Vérification multiple
    );
  };

  return (
    <RebacContext.Provider value={{ userEntities, setUser, hasAccess }}>
      {children}
    </RebacContext.Provider>
  );
};
