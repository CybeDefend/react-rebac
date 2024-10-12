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

  return <h1>Bienvenue dans notre application !</h1>;
};

const MainContent: React.FC = () => (
  <div>
    <h2>Contenu conditionnel en fonction des accès utilisateur</h2>

    <AuthorizedContent entityId="orgA" entityType="Organization" relationship="Admin">
      <h3>Admin de l'Organisation A</h3>
      <p>Contenu pour les admins de l'Organisation A.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="team1" entityType="Team" relationship="Member">
      <h3>Membre de Team1</h3>
      <p>Contenu pour les membres de Team1.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="team2" entityType="Team" relationship="Viewer">
      <h3>Viewer de Team2</h3>
      <p>Contenu pour les Viewers de Team2.</p>
    </AuthorizedContent>

    <AuthorizedContent entityId="orgB" entityType="Organization" relationship="Viewer">
      <h3>Viewer de l'Organisation B</h3>
      <p>Contenu pour les Viewers de l'Organisation B.</p>
    </AuthorizedContent>
  </div>
);

export default App;