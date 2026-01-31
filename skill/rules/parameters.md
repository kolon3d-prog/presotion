---
name: parameters
description: Making presentations parametrizable with Zod schemas
metadata:
  tags: parameters, zod, schema, props
---

To make a presentation parametrizable, a Zod schema can be added.

First, install `zod`:

```bash
npm i zod@3.22.3
```

Then define a schema alongside the component:

```tsx title="src/MyTalk.tsx"
import { z } from 'zod';

export const MyTalkSchema = z.object({
  title: z.string(),
  author: z.string(),
  theme: z.enum(['dark', 'light']),
  slides: z.array(z.object({
    title: z.string(),
    bullets: z.array(z.string()),
  })),
});

export const MyTalk: React.FC<z.infer<typeof MyTalkSchema>> = (props) => {
  return (
    <Deck>
      <Deck.Slide>
        <CoverLayout title={props.title} footer={props.author} />
      </Deck.Slide>
      {props.slides.map((slide, i) => (
        <Deck.Slide key={i} fragmentCount={slide.bullets.length + 1}>
          <DefaultLayout>
            <h2>{slide.title}</h2>
            <FragmentList>
              {slide.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </FragmentList>
          </DefaultLayout>
        </Deck.Slide>
      ))}
    </Deck>
  );
};
```

In the root file, pass the schema:

```tsx title="src/Root.tsx"
import { Presentation } from '@presotion/core';
import { MyTalk, MyTalkSchema } from './MyTalk';

export const PresotionRoot = () => {
  return (
    <Presentation
      id="my-talk"
      component={MyTalk}
      slideCount={5}
      schema={MyTalkSchema}
      defaultProps={{
        title: 'My Talk',
        author: 'John Doe',
        theme: 'dark',
        slides: [
          { title: 'Introduction', bullets: ['Point 1', 'Point 2'] },
        ],
      }}
    />
  );
};
```

The schema enables:
- Type-safe props
- Visual editing in the Studio
- Validation for API/MCP inputs
