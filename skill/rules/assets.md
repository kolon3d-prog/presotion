---
name: assets
description: Using images and static files in Presotion
metadata:
  tags: assets, images, staticFile, public
---

## The public folder

Place assets in the `public/` folder at your project root.

## Using staticFile()

Use `staticFile()` to reference files from the `public/` folder:

```tsx
import { Img, staticFile } from '@presotion/core';

export const MySlide = () => {
  return <Img src={staticFile('logo.png')} alt="Logo" />;
};
```

## Using the Img component

Always use the `<Img>` component from `@presotion/core`:

```tsx
import { Img, staticFile } from '@presotion/core';

<Img src={staticFile('photo.png')} />
```

## Important Restrictions

**You MUST use the `<Img>` component from `@presotion/core`.** Do not use:

- Native HTML `<img>` elements
- Next.js `<Image>` component
- CSS `background-image`

The `<Img>` component ensures images are fully loaded before rendering.

## Remote URLs

Remote URLs can be used directly without `staticFile()`:

```tsx
<Img src="https://example.com/image.png" />
```

## Dynamic Images

Use template literals for dynamic file references:

```tsx
import { Img, staticFile, useFragment } from '@presotion/core';

const fragment = useFragment();

// Different image per fragment
<Img src={staticFile(`slides/slide-${fragment + 1}.png`)} />
```
