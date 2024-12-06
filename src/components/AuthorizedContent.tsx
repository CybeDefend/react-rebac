import React, { ReactNode } from 'react';
import { useAuthorization } from '../hooks/useAuthorization';

interface AuthorizedEntity {
  entityId: string;
  entityType: string;
  relationship: string | string[];
}

interface AuthorizedContentProps {
  entityId?: string;
  entityType?: string;
  relationship?: string | string[];
  entities?: AuthorizedEntity[];
  loading?: ReactNode;
  children: ReactNode;
}

export const AuthorizedContent: React.FC<AuthorizedContentProps> = ({
  entityId,
  entityType,
  relationship,
  entities,
  loading = null,
  children,
}) => {
  // Ensure that both single-entity mode and multi-entity mode are not used simultaneously
  const singleEntityMode = entityId && entityType && relationship;
  const multiEntityMode = entities && entities.length > 0;

  if (singleEntityMode && multiEntityMode) {
    console.warn(
      'AuthorizedContent: Both approaches (entities and entityId/entityType/relationship) are used simultaneously. Please choose only one.'
    );
    return null;
  }

  // Helper function to check access for a single entity
  const checkSingleEntityAccess = (
    eId: string,
    eType: string,
    rel: string | string[]
  ): boolean | undefined => {
    return useAuthorization(eId, eType, rel);
  };

  let hasAccess: boolean | undefined;

  if (multiEntityMode && entities) {
    // Multi-entity mode
    const accessResults = entities.map((ent) =>
      checkSingleEntityAccess(ent.entityId, ent.entityType, ent.relationship)
    );

    // Check loading state (if any entity is still undefined)
    if (accessResults.some((res) => res === undefined)) {
      return loading;
    }

    // At least one entity must be accessible
    hasAccess = accessResults.some((res) => res === true);
  } else if (singleEntityMode && entityId && entityType && relationship) {
    // Single-entity mode
    hasAccess = useAuthorization(entityId, entityType, relationship);

    if (hasAccess === undefined) {
      return loading;
    }
  } else {
    // Neither single nor multi-entity mode is valid
    console.warn(
      'AuthorizedContent: No valid approach provided (neither a single entity nor an entities array). No content will be rendered.'
    );
    return null;
  }

  return hasAccess ? <>{children}</> : null;
};