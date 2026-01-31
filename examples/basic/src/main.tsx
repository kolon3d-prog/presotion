import React from 'react';
import ReactDOM from 'react-dom/client';
import { Player } from '@presotion/player';
import { Presentation } from './Presentation';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Player
      component={Presentation}
      compositionWidth={1920}
      compositionHeight={1080}
      slideCount={3}
      fragmentCounts={[1, 3, 1]}
      controls
      allowKeyboard
    />
  </React.StrictMode>
);
