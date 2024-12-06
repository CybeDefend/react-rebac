# react-rebac

`react-rebac` is a lightweight React library written in TypeScript for handling relationship-based access controls (ReBAC) in React applications. It provides components, hooks, and helpers to manage access permissions to resources based on user relationships, such as membership in an organization or a team, with roles like Admin, Member, or Viewer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Setup](#basic-setup)
  - [Code Example](#code-example)
- [API](#api)
  - [RebacProvider](#rebacprovider)
  - [useRebac](#userebac)
  - [AuthorizedContent](#authorizedcontent)
  - [useAuthorization](#useauthorization)
  - [useUserEntities](#useuserentities)
- [License](#license)

## Installation

Install with npm:

```bash
npm install react-rebac
```

Or with Yarn:

```bash
yarn add react-rebac
```

## Usage

### Basic Setup

- Wrap your application with the `RebacProvider` to supply the authorization context.
- Use `setUser` to define the user's relationships with different entities.
- Use `AuthorizedContent` to conditionally render content based on user permissions. It now supports two modes:
  - **Single-entity mode**: Use `entityId`, `entityType`, and `relationship`.
  - **Multi-entity mode**: Use an `entities` array, where each element specifies `entityId`, `entityType`, and `relationship`.

**Important:** You must choose one approach at a time. If you provide both (for example, `entityId`, `entityType`, `relationship` along with `entities`), a warning will be logged and no content will be rendered.

### Code Example

Here's an example of implementing an application using `react-rebac`.

```typescript
import React from 'react';
import { RebacProvider, AuthorizedContent, useRebac } from 'react-rebac';

const App: React.FC = () => (
  <RebacProvider>
    <Header />
    <MainContent />
  </RebacProvider>
);

const Header: React.FC = () => {
  const { setUser } = useRebac();
  const userEntities = [
    { id: 'orgA', type: 'Organization', relation: 'Admin' },
    { id: 'team1', type: 'Team', relation: 'Member' },
    { id: 'team2', type: 'Team', relation: 'Viewer' },
    { id: 'orgB', type: 'Organization', relation: 'Viewer' },
  ];
  setUser(userEntities);
  return <h1>Welcome to our application!</h1>;
};

const MainContent: React.FC = () => (
  <div>
    <h2>Conditional content based on user access</h2>

    {/* Single-entity mode examples */}
    <AuthorizedContent entityId="orgA" entityType="Organization" relationship="Admin">
      <h3>Organization A Admin</h3>
      <p>Content visible to Organization A admins.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="team1" entityType="Team" relationship={['Member', 'Admin']}>
      <h3>Team1 Member or Admin</h3>
      <p>Content visible to Team1 members or admins.</p>
    </AuthorizedContent>

    {/* Multi-entity mode example */}
    <AuthorizedContent
      entities={[
        { entityId: 'team2', entityType: 'Team', relationship: ['Viewer', 'Member'] },
        { entityId: 'orgB', entityType: 'Organization', relationship: 'Viewer' },
      ]}
    >
      <h3>Access for Multiple Entities</h3>
      <p>This content is visible if the user has access to at least one of the specified entities (Team2 Viewer/Member or OrgB Viewer).</p>
    </AuthorizedContent>
  </div>
);

export default App;
```

## API

### RebacProvider

Contextual component that wraps the application, making the authorization context available to all child components.

### useRebac

Hook for accessing the authorization context, returning `userEntities`, `setUser`, and `hasAccess`.

- `setUser(entities: Entity[])`: Defines the user's relationships with various entities. An `Entity` includes `{ id, type, relation }`.
- `hasAccess(entityId: string, entityType: string, relationship: string | string[]): boolean`: Checks if the user has a specific relationship(s) with an entity.

### AuthorizedContent

A component that conditionally renders its children based on user permissions. It supports two modes:

1. **Single-entity mode**:
   - `entityId: string`  
   - `entityType: string`  
   - `relationship: string | string[]`  

2. **Multi-entity mode**:
   - `entities: { entityId: string; entityType: string; relationship: string | string[]; }[]`

**Note:** You must choose either single-entity mode or multi-entity mode. If both are provided, no content will be rendered and a warning will be logged.

`loading?: ReactNode` can be provided to display a fallback element while the access state is being resolved.

### useAuthorization

Hook that returns a boolean (or `undefined` during loading) indicating if the user has a specified relationship with a given entity.

Usage in single-entity mode:

```typescript
const canView = useAuthorization("orgA", "Organization", "Admin");
```

### useUserEntities

Hook returning the list of entities associated with the user.

```typescript
const userEntities = useUserEntities();
```

## License

This library is licensed under the Apache-2.0 License.