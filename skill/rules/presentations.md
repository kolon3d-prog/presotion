---
name: presentations
description: Defining presentations, props, and dynamic metadata
metadata:
  tags: presentation, composition, props, metadata
---

A `<Presentation>` defines the component, width, height, and slide count of a renderable presentation.

It is normally placed in the `src/Root.tsx` file.

```tsx
import { Presentation } from '@presotion/core';
import { MyTalk } from './MyTalk';

export const PresotionRoot = () => {
  return (
    <Presentation
      id="my-talk"
      component={MyTalk}
      slideCount={10}
      width={1920}
      height={1080}
    />
  );
};
```

## Default Props

Pass `defaultProps` to provide initial values for your component.
Values must be JSON-serializable.

```tsx
import { Presentation } from '@presotion/core';
import { MyTalk, MyTalkProps } from './MyTalk';

export const PresotionRoot = () => {
  return (
    <Presentation
      id="my-talk"
      component={MyTalk}
      slideCount={10}
      width={1920}
      height={1080}
      defaultProps={{
        title: 'My Amazing Talk',
        author: 'John Doe',
        theme: 'dark',
      } satisfies MyTalkProps}
    />
  );
};
```

## Calculate Metadata

Use `calculateMetadata` to make slide count, dimensions, or props dynamic based on data.

```tsx
import { CalculateMetadataFunction } from '@presotion/core';
import { MyTalk, MyTalkProps } from './MyTalk';

const calculateMetadata: CalculateMetadataFunction<MyTalkProps> = async ({ props, abortSignal }) => {
  const data = await fetch(`https://api.example.com/talk/${props.talkId}`, {
    signal: abortSignal,
  }).then((res) => res.json());

  return {
    slideCount: data.slides.length,
    props: {
      ...props,
      slides: data.slides,
    },
  };
};

export const PresotionRoot = () => {
  return (
    <Presentation
      id="my-talk"
      component={MyTalk}
      slideCount={10} // Placeholder, will be overridden
      width={1920}
      height={1080}
      defaultProps={{ talkId: 'abc123' }}
      calculateMetadata={calculateMetadata}
    />
  );
};
```

The function can return `props`, `slideCount`, `width`, and `height`.
