import { z } from 'zod';

/**
 * Schema for a single slide in a presentation
 */
export const SlideSchema = z.object({
  /** Unique ID for the slide */
  id: z.string().optional(),
  /** Layout type for the slide */
  layout: z.enum([
    'default',
    'center',
    'cover',
    'two-cols',
    'two-cols-header',
    'image',
    'image-right',
    'image-left',
    'quote',
    'section',
  ]).default('default'),
  /** Slide title */
  title: z.string().optional(),
  /** Content items (bullet points, paragraphs) */
  content: z.array(z.string()).optional(),
  /** Code block content */
  code: z.object({
    language: z.string(),
    content: z.string(),
    highlightLines: z.array(z.number()).optional(),
  }).optional(),
  /** Image URL */
  image: z.string().optional(),
  /** Background color or gradient */
  background: z.string().optional(),
  /** Text color */
  color: z.string().optional(),
  /** Subtitle (for cover/section layouts) */
  subtitle: z.string().optional(),
  /** Footer text (for cover layouts) */
  footer: z.string().optional(),
  /** Quote attribution (for quote layouts) */
  author: z.string().optional(),
  /** Number of fragments (click steps) */
  fragmentCount: z.number().default(1),
  /** Speaker notes */
  notes: z.string().optional(),
});

export type SlideData = z.infer<typeof SlideSchema>;

/**
 * Schema for a complete presentation
 */
export const PresentationSchema = z.object({
  /** Unique ID for the presentation */
  id: z.string(),
  /** Presentation title */
  title: z.string(),
  /** Presentation author */
  author: z.string().optional(),
  /** Theme name */
  theme: z.enum(['dark', 'light', 'corporate', 'minimal']).default('dark'),
  /** Width in pixels */
  width: z.number().default(1920),
  /** Height in pixels */
  height: z.number().default(1080),
  /** Array of slides */
  slides: z.array(SlideSchema),
  /** Primary color for the theme */
  primaryColor: z.string().optional(),
  /** Secondary color for the theme */
  secondaryColor: z.string().optional(),
  /** Font family */
  fontFamily: z.string().optional(),
});

export type PresentationData = z.infer<typeof PresentationSchema>;

/**
 * Schema for creating a new presentation
 */
export const CreatePresentationSchema = PresentationSchema;

/**
 * Schema for adding a slide
 */
export const AddSlideSchema = z.object({
  presentationId: z.string(),
  slide: SlideSchema,
  position: z.number().optional().describe('Position to insert the slide (0-indexed). If not specified, appends to end.'),
});

/**
 * Schema for updating a slide
 */
export const UpdateSlideSchema = z.object({
  presentationId: z.string(),
  slideIndex: z.number(),
  updates: SlideSchema.partial(),
});

/**
 * Schema for removing a slide
 */
export const RemoveSlideSchema = z.object({
  presentationId: z.string(),
  slideIndex: z.number(),
});

/**
 * Schema for previewing a slide
 */
export const PreviewSlideSchema = z.object({
  presentationId: z.string(),
  slideIndex: z.number(),
  fragmentIndex: z.number().optional().default(0),
});

/**
 * Schema for exporting a presentation
 */
export const ExportPresentationSchema = z.object({
  presentationId: z.string(),
  format: z.enum(['pdf', 'pptx', 'html', 'spa']),
  outputPath: z.string().optional(),
});

/**
 * Schema for setting the theme
 */
export const SetThemeSchema = z.object({
  presentationId: z.string(),
  theme: z.enum(['dark', 'light', 'corporate', 'minimal']),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontFamily: z.string().optional(),
});
