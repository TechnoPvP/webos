import { Button, Persona, Text } from '@fluentui/react-components';
import Screen from '../lib/components/Screen/Screen';
import SlackIcon from '../lib/components/AppIcons/SlackIcon';
import AppTile from '../lib/components/AppTile/AppTile';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import Terminal from '../lib/components/Terminal/Terminal';

export function Index() {

  return (
    <>
        <Screen>
          {/* <AppTile icon={<SlackIcon />} /> */}

          <Terminal />
        </Screen>

      <style jsx>{`
        h1 {
          font-weight: 500;
        }
      `}</style>
    </>
  );
}

export default Index;
