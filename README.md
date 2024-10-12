# react-rebac

`react-rebac` is a lightweight React library written in TypeScript for handling relationship-based access controls (ReBAC) in React applications. It provides components, hooks, and helpers to manage access permissions to resources based on user relationships, such as membership in an organization or a team, with roles like Admin, Member, or Viewer.

## Table of Contents

- [Installation](#installation)
- [Project Configuration](#project-configuration)
- [Usage](#usage)
  - [Basic Setup](#basic-setup)
  - [Code Example](#code-example)
- [API](#api)
  - [RebacProvider](#rebacprovider)
  - [useRebac](#userebac)
  - [AuthorizedContent](#authorizedcontent)
  - [useAuthorization](#useauthorization)
  - [useUserEntities](#useuserentities)
- [Scripts](#scripts)
- [License](#license)

## Installation

Install with npm:

```bash
npm install react-rebac
```

Or with Yarn:
```
yarn add react-rebac
```

## Project Configuration

If you're using TypeScript, ensure you have a configured `tsconfig.json` file to compile the library. Here's an example configuration:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "declaration": true
  },
  "include": ["src/**/*", "examples/**/*"]
}
```

## Usage

### Basic Setup

1. Wrap your application with the `RebacProvider` to supply the context for user relationship access.
2. Use `setUser` to define a user's relationships with different entities.
3. Use `AuthorizedContent` to conditionally render content based on user permissions.

### Code Example

Here's an example of implementing an application using `react-rebac`.

```typescript
// examples/App.tsx
import React from 'react';
import { RebacProvider, AuthorizedContent, useRebac } from '../src';

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

    <AuthorizedContent entityId="orgA" entityType="Organization" relationship="Admin">
      <h3>Organization A Admin</h3>
      <p>Content for Organization A admins.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="team1" entityType="Team" relationship="Member">
      <h3>Team1 Member</h3>
      <p>Content for Team1 members.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="team2" entityType="Team" relationship="Viewer">
      <h3>Team2 Viewer</h3>
      <p>Content for Team2 viewers.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="orgB" entityType="Organization" relationship="Viewer">
      <h3>Organization B Viewer</h3>
      <p>Content for Organization B viewers.</p>
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

- `setUser(entities: Entity[])`: Defines user relationships with different entities. An `Entity` includes `{ id, type, relation }`.
- `hasAccess(entityId: string, entityType: string, relationship: string): boolean`: Checks if the user has a specific relationship with an entity.

### AuthorizedContent

A component that conditionally renders its content based on user permissions. Props include:

- `entityId: string`: Entity identifier.
- `entityType: string`: Entity type (e.g., "Team", "Organization").
- `relationship: string`: Required relationship (e.g., "Admin", "Viewer").

### useAuthorization

Hook returning a boolean indicating if the user has a specific relationship with a given entity. Usage:

```typescript
const canView = useAuthorization("orgA", "Organization", "Admin");
```

### useUserEntities

Hook returning the list of entities associated with the user. Usage:

```typescript
const userEntities = useUserEntities();
```

## Scripts

- `npm run build`: Compiles the TypeScript library to JavaScript and generates `.d.ts` files in the dist folder.
- `npm run start`: Runs an example application `App.tsx` using `ts-node`.

## License

This library is licensed under the Apache-2.0 License.