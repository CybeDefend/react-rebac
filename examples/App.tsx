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

    {/* Example of authorization for a single relationship */}
    <AuthorizedContent entityId="orgA" entityType="Organization" relationship="Admin">
      <h3>Organization A Admin</h3>
      <p>Content for Organization A admins.</p>
    </AuthorizedContent>

    {/* Example of authorization for multiple relationships */}
    <AuthorizedContent entityId="team1" entityType="Team" relationship={['Member', 'Admin']}>
      <h3>Team1 Member or Admin</h3>
      <p>Content accessible to Team1 members or admins.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="team2" entityType="Team" relationship={['Viewer', 'Member']}>
      <h3>Team2 Viewer or Member</h3>
      <p>Content accessible to Team2 viewers or members.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="orgB" entityType="Organization" relationship="Viewer">
      <h3>Organization B Viewer</h3>
      <p>Content for Organization B viewers.</p>
    </AuthorizedContent>
  </div>
);

export default App;