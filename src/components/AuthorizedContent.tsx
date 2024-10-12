import React, { ReactNode } from 'react';
import { useAuthorization } from '../hooks/useAuthorization';

interface AuthorizedContentProps {
  entityId: string;
  entityType: string;
  relationship: string | string[];
  children: ReactNode;
}

export const AuthorizedContent: React.FC<AuthorizedContentProps> = ({ entityId, entityType, relationship, children }) => {
  const hasAccess = Array.isArray(relationship)
    ? relationship.some((rel) => useAuthorization(entityId, entityType, rel)) // Check multiple relationships
    : useAuthorization(entityId, entityType, relationship); // Check a single relationship

  return hasAccess ? <>{children}</> : null;
};