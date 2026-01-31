// src/store.ts
var PresentationStore = class {
  constructor() {
    this.presentations = /* @__PURE__ */ new Map();
  }
  create(presentation) {
    this.presentations.set(presentation.id, presentation);
    return presentation;
  }
  get(id) {
    return this.presentations.get(id);
  }
  getAll() {
    return Array.from(this.presentations.values());
  }
  update(id, updates) {
    const presentation = this.presentations.get(id);
    if (!presentation) return void 0;
    const updated = { ...presentation, ...updates };
    this.presentations.set(id, updated);
    return updated;
  }
  delete(id) {
    return this.presentations.delete(id);
  }
  addSlide(presentationId, slide, position) {
    const presentation = this.presentations.get(presentationId);
    if (!presentation) return void 0;
    const newSlide = { ...slide, id: slide.id || `slide-${Date.now()}` };
    const slides = [...presentation.slides];
    if (position !== void 0 && position >= 0 && position <= slides.length) {
      slides.splice(position, 0, newSlide);
    } else {
      slides.push(newSlide);
    }
    const updated = { ...presentation, slides };
    this.presentations.set(presentationId, updated);
    return updated;
  }
  updateSlide(presentationId, slideIndex, updates) {
    const presentation = this.presentations.get(presentationId);
    if (!presentation) return void 0;
    if (slideIndex < 0 || slideIndex >= presentation.slides.length) return void 0;
    const slides = [...presentation.slides];
    slides[slideIndex] = { ...slides[slideIndex], ...updates };
    const updated = { ...presentation, slides };
    this.presentations.set(presentationId, updated);
    return updated;
  }
  removeSlide(presentationId, slideIndex) {
    const presentation = this.presentations.get(presentationId);
    if (!presentation) return void 0;
    if (slideIndex < 0 || slideIndex >= presentation.slides.length) return void 0;
    const slides = presentation.slides.filter((_, i) => i !== slideIndex);
    const updated = { ...presentation, slides };
    this.presentations.set(presentationId, updated);
    return updated;
  }
};
var store = new PresentationStore();

// src/schemas.ts
import { z } from "zod";
var SlideSchema = z.object({
  /** Unique ID for the slide */
  id: z.string().optional(),
  /** Layout type for the slide */
  layout: z.enum([
    "default",
    "center",
    "cover",
    "two-cols",
    "two-cols-header",
    "image",
    "image-right",
    "image-left",
    "quote",
    "section"
  ]).default("default"),
  /** Slide title */
  title: z.string().optional(),
  /** Content items (bullet points, paragraphs) */
  content: z.array(z.string()).optional(),
  /** Code block content */
  code: z.object({
    language: z.string(),
    content: z.string(),
    highlightLines: z.array(z.number()).optional()
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
  notes: z.string().optional()
});
var PresentationSchema = z.object({
  /** Unique ID for the presentation */
  id: z.string(),
  /** Presentation title */
  title: z.string(),
  /** Presentation author */
  author: z.string().optional(),
  /** Theme name */
  theme: z.enum(["dark", "light", "corporate", "minimal"]).default("dark"),
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
  fontFamily: z.string().optional()
});
var CreatePresentationSchema = PresentationSchema;
var AddSlideSchema = z.object({
  presentationId: z.string(),
  slide: SlideSchema,
  position: z.number().optional().describe("Position to insert the slide (0-indexed). If not specified, appends to end.")
});
var UpdateSlideSchema = z.object({
  presentationId: z.string(),
  slideIndex: z.number(),
  updates: SlideSchema.partial()
});
var RemoveSlideSchema = z.object({
  presentationId: z.string(),
  slideIndex: z.number()
});
var PreviewSlideSchema = z.object({
  presentationId: z.string(),
  slideIndex: z.number(),
  fragmentIndex: z.number().optional().default(0)
});
var ExportPresentationSchema = z.object({
  presentationId: z.string(),
  format: z.enum(["pdf", "pptx", "html", "spa"]),
  outputPath: z.string().optional()
});
var SetThemeSchema = z.object({
  presentationId: z.string(),
  theme: z.enum(["dark", "light", "corporate", "minimal"]),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  fontFamily: z.string().optional()
});

// src/server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
function createServer() {
  const server = new Server(
    {
      name: "presotion-mcp",
      version: "0.1.0"
    },
    {
      capabilities: {
        tools: {},
        resources: {}
      }
    }
  );
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "create_presentation",
          description: "Create a new presentation with slides. Use this to start a new presentation from scratch.",
          inputSchema: {
            type: "object",
            properties: {
              id: { type: "string", description: "Unique identifier for the presentation" },
              title: { type: "string", description: "Title of the presentation" },
              author: { type: "string", description: "Author name" },
              theme: {
                type: "string",
                enum: ["dark", "light", "corporate", "minimal"],
                description: "Color theme for the presentation"
              },
              width: { type: "number", description: "Width in pixels (default: 1920)" },
              height: { type: "number", description: "Height in pixels (default: 1080)" },
              slides: {
                type: "array",
                description: "Array of slide objects",
                items: {
                  type: "object",
                  properties: {
                    layout: {
                      type: "string",
                      enum: ["default", "center", "cover", "two-cols", "image-right", "quote", "section"]
                    },
                    title: { type: "string" },
                    content: { type: "array", items: { type: "string" } },
                    code: {
                      type: "object",
                      properties: {
                        language: { type: "string" },
                        content: { type: "string" }
                      }
                    },
                    image: { type: "string" },
                    subtitle: { type: "string" },
                    fragmentCount: { type: "number" },
                    notes: { type: "string" }
                  }
                }
              }
            },
            required: ["id", "title", "slides"]
          }
        },
        {
          name: "add_slide",
          description: "Add a new slide to an existing presentation",
          inputSchema: {
            type: "object",
            properties: {
              presentationId: { type: "string", description: "ID of the presentation" },
              slide: {
                type: "object",
                description: "Slide data",
                properties: {
                  layout: { type: "string" },
                  title: { type: "string" },
                  content: { type: "array", items: { type: "string" } },
                  code: { type: "object" },
                  image: { type: "string" }
                }
              },
              position: { type: "number", description: "Position to insert (0-indexed)" }
            },
            required: ["presentationId", "slide"]
          }
        },
        {
          name: "update_slide",
          description: "Update an existing slide in a presentation",
          inputSchema: {
            type: "object",
            properties: {
              presentationId: { type: "string" },
              slideIndex: { type: "number", description: "Index of the slide (0-indexed)" },
              updates: {
                type: "object",
                description: "Partial slide data to update"
              }
            },
            required: ["presentationId", "slideIndex", "updates"]
          }
        },
        {
          name: "remove_slide",
          description: "Remove a slide from a presentation",
          inputSchema: {
            type: "object",
            properties: {
              presentationId: { type: "string" },
              slideIndex: { type: "number" }
            },
            required: ["presentationId", "slideIndex"]
          }
        },
        {
          name: "get_presentation",
          description: "Get the full data of a presentation including all slides",
          inputSchema: {
            type: "object",
            properties: {
              presentationId: { type: "string" }
            },
            required: ["presentationId"]
          }
        },
        {
          name: "list_presentations",
          description: "List all presentations in the current session",
          inputSchema: {
            type: "object",
            properties: {}
          }
        },
        {
          name: "set_theme",
          description: "Set the theme and styling for a presentation",
          inputSchema: {
            type: "object",
            properties: {
              presentationId: { type: "string" },
              theme: { type: "string", enum: ["dark", "light", "corporate", "minimal"] },
              primaryColor: { type: "string", description: "Primary color (hex)" },
              secondaryColor: { type: "string", description: "Secondary color (hex)" },
              fontFamily: { type: "string" }
            },
            required: ["presentationId", "theme"]
          }
        },
        {
          name: "preview_slide",
          description: "Get a text description of what a slide looks like (for verification)",
          inputSchema: {
            type: "object",
            properties: {
              presentationId: { type: "string" },
              slideIndex: { type: "number" },
              fragmentIndex: { type: "number" }
            },
            required: ["presentationId", "slideIndex"]
          }
        },
        {
          name: "generate_code",
          description: "Generate the React/TypeScript code for a presentation",
          inputSchema: {
            type: "object",
            properties: {
              presentationId: { type: "string" }
            },
            required: ["presentationId"]
          }
        }
      ]
    };
  });
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    switch (name) {
      case "create_presentation": {
        const parsed = CreatePresentationSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: "text", text: `Invalid input: ${parsed.error.message}` }],
            isError: true
          };
        }
        const presentation = store.create(parsed.data);
        return {
          content: [{
            type: "text",
            text: `Created presentation "${presentation.title}" with ${presentation.slides.length} slides.
ID: ${presentation.id}`
          }]
        };
      }
      case "add_slide": {
        const parsed = AddSlideSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: "text", text: `Invalid input: ${parsed.error.message}` }],
            isError: true
          };
        }
        const result = store.addSlide(parsed.data.presentationId, parsed.data.slide, parsed.data.position);
        if (!result) {
          return {
            content: [{ type: "text", text: `Presentation not found: ${parsed.data.presentationId}` }],
            isError: true
          };
        }
        return {
          content: [{
            type: "text",
            text: `Added slide. Presentation now has ${result.slides.length} slides.`
          }]
        };
      }
      case "update_slide": {
        const parsed = UpdateSlideSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: "text", text: `Invalid input: ${parsed.error.message}` }],
            isError: true
          };
        }
        const result = store.updateSlide(
          parsed.data.presentationId,
          parsed.data.slideIndex,
          parsed.data.updates
        );
        if (!result) {
          return {
            content: [{ type: "text", text: `Presentation or slide not found` }],
            isError: true
          };
        }
        return {
          content: [{ type: "text", text: `Updated slide ${parsed.data.slideIndex + 1}` }]
        };
      }
      case "remove_slide": {
        const parsed = RemoveSlideSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: "text", text: `Invalid input: ${parsed.error.message}` }],
            isError: true
          };
        }
        const result = store.removeSlide(parsed.data.presentationId, parsed.data.slideIndex);
        if (!result) {
          return {
            content: [{ type: "text", text: `Presentation or slide not found` }],
            isError: true
          };
        }
        return {
          content: [{
            type: "text",
            text: `Removed slide. Presentation now has ${result.slides.length} slides.`
          }]
        };
      }
      case "get_presentation": {
        const { presentationId } = args;
        const presentation = store.get(presentationId);
        if (!presentation) {
          return {
            content: [{ type: "text", text: `Presentation not found: ${presentationId}` }],
            isError: true
          };
        }
        return {
          content: [{ type: "text", text: JSON.stringify(presentation, null, 2) }]
        };
      }
      case "list_presentations": {
        const presentations = store.getAll();
        if (presentations.length === 0) {
          return {
            content: [{ type: "text", text: "No presentations created yet." }]
          };
        }
        const list = presentations.map((p) => `- ${p.title} (${p.id}): ${p.slides.length} slides`);
        return {
          content: [{ type: "text", text: `Presentations:
${list.join("\n")}` }]
        };
      }
      case "set_theme": {
        const parsed = SetThemeSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: "text", text: `Invalid input: ${parsed.error.message}` }],
            isError: true
          };
        }
        const result = store.update(parsed.data.presentationId, {
          theme: parsed.data.theme,
          primaryColor: parsed.data.primaryColor,
          secondaryColor: parsed.data.secondaryColor,
          fontFamily: parsed.data.fontFamily
        });
        if (!result) {
          return {
            content: [{ type: "text", text: `Presentation not found` }],
            isError: true
          };
        }
        return {
          content: [{ type: "text", text: `Theme set to "${parsed.data.theme}"` }]
        };
      }
      case "preview_slide": {
        const parsed = PreviewSlideSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: "text", text: `Invalid input: ${parsed.error.message}` }],
            isError: true
          };
        }
        const presentation = store.get(parsed.data.presentationId);
        if (!presentation) {
          return {
            content: [{ type: "text", text: `Presentation not found` }],
            isError: true
          };
        }
        const slide = presentation.slides[parsed.data.slideIndex];
        if (!slide) {
          return {
            content: [{ type: "text", text: `Slide not found` }],
            isError: true
          };
        }
        let description = `Slide ${parsed.data.slideIndex + 1}:
`;
        description += `  Layout: ${slide.layout}
`;
        if (slide.title) description += `  Title: "${slide.title}"
`;
        if (slide.subtitle) description += `  Subtitle: "${slide.subtitle}"
`;
        if (slide.content?.length) {
          description += `  Content:
`;
          slide.content.forEach((item, i) => {
            description += `    ${i + 1}. ${item}
`;
          });
        }
        if (slide.code) {
          description += `  Code (${slide.code.language}):
`;
          description += `    ${slide.code.content.split("\n").slice(0, 5).join("\n    ")}...
`;
        }
        if (slide.image) description += `  Image: ${slide.image}
`;
        if (slide.notes) description += `  Notes: ${slide.notes}
`;
        return {
          content: [{ type: "text", text: description }]
        };
      }
      case "generate_code": {
        const { presentationId } = args;
        const presentation = store.get(presentationId);
        if (!presentation) {
          return {
            content: [{ type: "text", text: `Presentation not found` }],
            isError: true
          };
        }
        const code = generatePresentationCode(presentation);
        return {
          content: [{ type: "text", text: code }]
        };
      }
      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true
        };
    }
  });
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const presentations = store.getAll();
    return {
      resources: presentations.map((p) => ({
        uri: `presotion://presentation/${p.id}`,
        name: p.title,
        description: `Presentation with ${p.slides.length} slides`,
        mimeType: "application/json"
      }))
    };
  });
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    const match = uri.match(/^presotion:\/\/presentation\/(.+)$/);
    if (match) {
      const presentation = store.get(match[1]);
      if (presentation) {
        return {
          contents: [{
            uri,
            mimeType: "application/json",
            text: JSON.stringify(presentation, null, 2)
          }]
        };
      }
    }
    throw new Error(`Resource not found: ${uri}`);
  });
  return server;
}
function generatePresentationCode(presentation) {
  const imports = [
    `import { Deck, Fragment, FragmentList, usePresentationConfig } from '@presotion/core';`
  ];
  const layoutsUsed = new Set(presentation.slides.map((s) => s.layout));
  if (layoutsUsed.size > 0) {
    const layoutImports = Array.from(layoutsUsed).filter((l) => l !== "default").map((l) => `${capitalize(l)}Layout`);
    if (layoutImports.length > 0) {
      imports.push(`import { ${layoutImports.join(", ")} } from '@presotion/layouts';`);
    }
  }
  const hasCode = presentation.slides.some((s) => s.code);
  if (hasCode) {
    imports.push(`import { CodeBlock } from '@presotion/code';`);
  }
  let code = imports.join("\n") + "\n\n";
  code += `export const ${toPascalCase(presentation.id)} = () => {
`;
  code += `  return (
`;
  code += `    <Deck>
`;
  presentation.slides.forEach((slide, i) => {
    code += `      <Deck.Slide fragmentCount={${slide.fragmentCount || 1}}>
`;
    code += generateSlideContent(slide, 8);
    code += `      </Deck.Slide>
`;
  });
  code += `    </Deck>
`;
  code += `  );
`;
  code += `};
`;
  return code;
}
function generateSlideContent(slide, indent) {
  const pad = " ".repeat(indent);
  let content = "";
  switch (slide.layout) {
    case "center":
      content += `${pad}<CenterLayout>
`;
      if (slide.title) content += `${pad}  <h1>${slide.title}</h1>
`;
      if (slide.content) {
        content += `${pad}  <FragmentList>
`;
        slide.content.forEach((item) => {
          content += `${pad}    <p>${item}</p>
`;
        });
        content += `${pad}  </FragmentList>
`;
      }
      content += `${pad}</CenterLayout>
`;
      break;
    case "cover":
      content += `${pad}<CoverLayout
`;
      if (slide.title) content += `${pad}  title="${slide.title}"
`;
      if (slide.subtitle) content += `${pad}  subtitle="${slide.subtitle}"
`;
      if (slide.footer) content += `${pad}  footer="${slide.footer}"
`;
      content += `${pad}/>
`;
      break;
    default:
      content += `${pad}<DefaultLayout>
`;
      if (slide.title) content += `${pad}  <h2>${slide.title}</h2>
`;
      if (slide.content) {
        content += `${pad}  <FragmentList>
`;
        slide.content.forEach((item) => {
          content += `${pad}    <li>${item}</li>
`;
        });
        content += `${pad}  </FragmentList>
`;
      }
      if (slide.code) {
        content += `${pad}  <CodeBlock language="${slide.code.language}">
`;
        content += `${pad}    {\`${slide.code.content}\`}
`;
        content += `${pad}  </CodeBlock>
`;
      }
      content += `${pad}</DefaultLayout>
`;
  }
  return content;
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function toPascalCase(str) {
  return str.split(/[-_\s]+/).map((word) => capitalize(word)).join("");
}

export {
  store,
  SlideSchema,
  PresentationSchema,
  CreatePresentationSchema,
  AddSlideSchema,
  UpdateSlideSchema,
  RemoveSlideSchema,
  PreviewSlideSchema,
  ExportPresentationSchema,
  SetThemeSchema,
  createServer
};
