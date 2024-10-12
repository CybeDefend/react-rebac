import React, { ReactNode } from 'react';
import { useAuthorization } from '../hooks/useAuthorization';

interface AuthorizedContentProps {
  entityId: string;
  entityType: string;
  relationship: string;
  children: ReactNode;
}

export const AuthorizedContent: React.FC<AuthorizedContentProps> = ({ entityId, entityType, relationship, children }) => {
  const isAuthorized = useAuthorization(entityId, entityType, relationship);
  return isAuthorized ? <>{children}</> : null;
};