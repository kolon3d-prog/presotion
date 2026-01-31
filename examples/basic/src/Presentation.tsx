import { Deck, FragmentList } from '@presotion/core';
import { CoverLayout, DefaultLayout, CenterLayout } from '@presotion/layouts';

export const Presentation = () => {
  return (
    <Deck>
      <Deck.Slide fragmentCount={1}>
        <CoverLayout
          title="Welcome to Presotion"
          subtitle="Programmatic Presentations in React"
          footer="Press Space or Arrow Keys to navigate"
        />
      </Deck.Slide>

      <Deck.Slide fragmentCount={3}>
        <DefaultLayout style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: 80 }}>
          <h2 style={{ fontSize: 48, marginBottom: 40 }}>Key Features</h2>
          <FragmentList>
            <p style={{ fontSize: 32, marginBottom: 20 }}>React-based slide creation</p>
            <p style={{ fontSize: 32, marginBottom: 20 }}>Fragment animations for step-by-step reveals</p>
            <p style={{ fontSize: 32, marginBottom: 20 }}>AI agent integration via MCP</p>
          </FragmentList>
        </DefaultLayout>
      </Deck.Slide>

      <Deck.Slide fragmentCount={1}>
        <CenterLayout style={{ backgroundColor: '#3b82f6', color: '#fff' }}>
          <h1 style={{ fontSize: 64 }}>Thank You!</h1>
          <p style={{ fontSize: 24, marginTop: 20, opacity: 0.8 }}>
            github.com/kolon3d-prog/presotion
          </p>
        </CenterLayout>
      </Deck.Slide>
    </Deck>
  );
};
