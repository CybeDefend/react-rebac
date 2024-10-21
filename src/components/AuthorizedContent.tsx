import React, { ReactNode } from 'react';
import { useAuthorization } from '../hooks/useAuthorization';

interface AuthorizedContentProps {
  entityId: string;
  entityType: string;
  relationship: string | string[]; // Peut être une chaîne ou un tableau de relations
  loading?: ReactNode; // Contenu optionnel pendant le chargement
  children: ReactNode;
}

export const AuthorizedContent: React.FC<AuthorizedContentProps> = ({
  entityId,
  entityType,
  relationship,
  loading = null, // Contenu à afficher pendant le chargement
  children,
}) => {
  const hasAccess = useAuthorization(entityId, entityType, relationship);

  if (hasAccess === undefined) {
    // Pendant le chargement des entités
    return loading;
  }

  return hasAccess ? <>{children}</> : null;
};
