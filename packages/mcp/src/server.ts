import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { store } from './store.js';
import {
  CreatePresentationSchema,
  AddSlideSchema,
  UpdateSlideSchema,
  RemoveSlideSchema,
  PreviewSlideSchema,
  ExportPresentationSchema,
  SetThemeSchema,
  PresentationData,
} from './schemas.js';

/**
 * Create and configure the Presotion MCP server.
 */
export function createServer() {
  const server = new Server(
    {
      name: 'presotion-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'create_presentation',
          description: 'Create a new presentation with slides. Use this to start a new presentation from scratch.',
          inputSchema: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Unique identifier for the presentation' },
              title: { type: 'string', description: 'Title of the presentation' },
              author: { type: 'string', description: 'Author name' },
              theme: {
                type: 'string',
                enum: ['dark', 'light', 'corporate', 'minimal'],
                description: 'Color theme for the presentation',
              },
              width: { type: 'number', description: 'Width in pixels (default: 1920)' },
              height: { type: 'number', description: 'Height in pixels (default: 1080)' },
              slides: {
                type: 'array',
                description: 'Array of slide objects',
                items: {
                  type: 'object',
                  properties: {
                    layout: {
                      type: 'string',
                      enum: ['default', 'center', 'cover', 'two-cols', 'image-right', 'quote', 'section'],
                    },
                    title: { type: 'string' },
                    content: { type: 'array', items: { type: 'string' } },
                    code: {
                      type: 'object',
                      properties: {
                        language: { type: 'string' },
                        content: { type: 'string' },
                      },
                    },
                    image: { type: 'string' },
                    subtitle: { type: 'string' },
                    fragmentCount: { type: 'number' },
                    notes: { type: 'string' },
                  },
                },
              },
            },
            required: ['id', 'title', 'slides'],
          },
        },
        {
          name: 'add_slide',
          description: 'Add a new slide to an existing presentation',
          inputSchema: {
            type: 'object',
            properties: {
              presentationId: { type: 'string', description: 'ID of the presentation' },
              slide: {
                type: 'object',
                description: 'Slide data',
                properties: {
                  layout: { type: 'string' },
                  title: { type: 'string' },
                  content: { type: 'array', items: { type: 'string' } },
                  code: { type: 'object' },
                  image: { type: 'string' },
                },
              },
              position: { type: 'number', description: 'Position to insert (0-indexed)' },
            },
            required: ['presentationId', 'slide'],
          },
        },
        {
          name: 'update_slide',
          description: 'Update an existing slide in a presentation',
          inputSchema: {
            type: 'object',
            properties: {
              presentationId: { type: 'string' },
              slideIndex: { type: 'number', description: 'Index of the slide (0-indexed)' },
              updates: {
                type: 'object',
                description: 'Partial slide data to update',
              },
            },
            required: ['presentationId', 'slideIndex', 'updates'],
          },
        },
        {
          name: 'remove_slide',
          description: 'Remove a slide from a presentation',
          inputSchema: {
            type: 'object',
            properties: {
              presentationId: { type: 'string' },
              slideIndex: { type: 'number' },
            },
            required: ['presentationId', 'slideIndex'],
          },
        },
        {
          name: 'get_presentation',
          description: 'Get the full data of a presentation including all slides',
          inputSchema: {
            type: 'object',
            properties: {
              presentationId: { type: 'string' },
            },
            required: ['presentationId'],
          },
        },
        {
          name: 'list_presentations',
          description: 'List all presentations in the current session',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'set_theme',
          description: 'Set the theme and styling for a presentation',
          inputSchema: {
            type: 'object',
            properties: {
              presentationId: { type: 'string' },
              theme: { type: 'string', enum: ['dark', 'light', 'corporate', 'minimal'] },
              primaryColor: { type: 'string', description: 'Primary color (hex)' },
              secondaryColor: { type: 'string', description: 'Secondary color (hex)' },
              fontFamily: { type: 'string' },
            },
            required: ['presentationId', 'theme'],
          },
        },
        {
          name: 'preview_slide',
          description: 'Get a text description of what a slide looks like (for verification)',
          inputSchema: {
            type: 'object',
            properties: {
              presentationId: { type: 'string' },
              slideIndex: { type: 'number' },
              fragmentIndex: { type: 'number' },
            },
            required: ['presentationId', 'slideIndex'],
          },
        },
        {
          name: 'generate_code',
          description: 'Generate the React/TypeScript code for a presentation',
          inputSchema: {
            type: 'object',
            properties: {
              presentationId: { type: 'string' },
            },
            required: ['presentationId'],
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'create_presentation': {
        const parsed = CreatePresentationSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: 'text', text: `Invalid input: ${parsed.error.message}` }],
            isError: true,
          };
        }
        const presentation = store.create(parsed.data);
        return {
          content: [{
            type: 'text',
            text: `Created presentation "${presentation.title}" with ${presentation.slides.length} slides.\nID: ${presentation.id}`,
          }],
        };
      }

      case 'add_slide': {
        const parsed = AddSlideSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: 'text', text: `Invalid input: ${parsed.error.message}` }],
            isError: true,
          };
        }
        const result = store.addSlide(parsed.data.presentationId, parsed.data.slide, parsed.data.position);
        if (!result) {
          return {
            content: [{ type: 'text', text: `Presentation not found: ${parsed.data.presentationId}` }],
            isError: true,
          };
        }
        return {
          content: [{
            type: 'text',
            text: `Added slide. Presentation now has ${result.slides.length} slides.`,
          }],
        };
      }

      case 'update_slide': {
        const parsed = UpdateSlideSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: 'text', text: `Invalid input: ${parsed.error.message}` }],
            isError: true,
          };
        }
        const result = store.updateSlide(
          parsed.data.presentationId,
          parsed.data.slideIndex,
          parsed.data.updates
        );
        if (!result) {
          return {
            content: [{ type: 'text', text: `Presentation or slide not found` }],
            isError: true,
          };
        }
        return {
          content: [{ type: 'text', text: `Updated slide ${parsed.data.slideIndex + 1}` }],
        };
      }

      case 'remove_slide': {
        const parsed = RemoveSlideSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: 'text', text: `Invalid input: ${parsed.error.message}` }],
            isError: true,
          };
        }
        const result = store.removeSlide(parsed.data.presentationId, parsed.data.slideIndex);
        if (!result) {
          return {
            content: [{ type: 'text', text: `Presentation or slide not found` }],
            isError: true,
          };
        }
        return {
          content: [{
            type: 'text',
            text: `Removed slide. Presentation now has ${result.slides.length} slides.`,
          }],
        };
      }

      case 'get_presentation': {
        const { presentationId } = args as { presentationId: string };
        const presentation = store.get(presentationId);
        if (!presentation) {
          return {
            content: [{ type: 'text', text: `Presentation not found: ${presentationId}` }],
            isError: true,
          };
        }
        return {
          content: [{ type: 'text', text: JSON.stringify(presentation, null, 2) }],
        };
      }

      case 'list_presentations': {
        const presentations = store.getAll();
        if (presentations.length === 0) {
          return {
            content: [{ type: 'text', text: 'No presentations created yet.' }],
          };
        }
        const list = presentations.map((p) => `- ${p.title} (${p.id}): ${p.slides.length} slides`);
        return {
          content: [{ type: 'text', text: `Presentations:\n${list.join('\n')}` }],
        };
      }

      case 'set_theme': {
        const parsed = SetThemeSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: 'text', text: `Invalid input: ${parsed.error.message}` }],
            isError: true,
          };
        }
        const result = store.update(parsed.data.presentationId, {
          theme: parsed.data.theme,
          primaryColor: parsed.data.primaryColor,
          secondaryColor: parsed.data.secondaryColor,
          fontFamily: parsed.data.fontFamily,
        });
        if (!result) {
          return {
            content: [{ type: 'text', text: `Presentation not found` }],
            isError: true,
          };
        }
        return {
          content: [{ type: 'text', text: `Theme set to "${parsed.data.theme}"` }],
        };
      }

      case 'preview_slide': {
        const parsed = PreviewSlideSchema.safeParse(args);
        if (!parsed.success) {
          return {
            content: [{ type: 'text', text: `Invalid input: ${parsed.error.message}` }],
            isError: true,
          };
        }
        const presentation = store.get(parsed.data.presentationId);
        if (!presentation) {
          return {
            content: [{ type: 'text', text: `Presentation not found` }],
            isError: true,
          };
        }
        const slide = presentation.slides[parsed.data.slideIndex];
        if (!slide) {
          return {
            content: [{ type: 'text', text: `Slide not found` }],
            isError: true,
          };
        }
        
        // Generate a text description of the slide
        let description = `Slide ${parsed.data.slideIndex + 1}:\n`;
        description += `  Layout: ${slide.layout}\n`;
        if (slide.title) description += `  Title: "${slide.title}"\n`;
        if (slide.subtitle) description += `  Subtitle: "${slide.subtitle}"\n`;
        if (slide.content?.length) {
          description += `  Content:\n`;
          slide.content.forEach((item, i) => {
            description += `    ${i + 1}. ${item}\n`;
          });
        }
        if (slide.code) {
          description += `  Code (${slide.code.language}):\n`;
          description += `    ${slide.code.content.split('\n').slice(0, 5).join('\n    ')}...\n`;
        }
        if (slide.image) description += `  Image: ${slide.image}\n`;
        if (slide.notes) description += `  Notes: ${slide.notes}\n`;
        
        return {
          content: [{ type: 'text', text: description }],
        };
      }

      case 'generate_code': {
        const { presentationId } = args as { presentationId: string };
        const presentation = store.get(presentationId);
        if (!presentation) {
          return {
            content: [{ type: 'text', text: `Presentation not found` }],
            isError: true,
          };
        }
        
        const code = generatePresentationCode(presentation);
        return {
          content: [{ type: 'text', text: code }],
        };
      }

      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }
  });

  // List resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const presentations = store.getAll();
    return {
      resources: presentations.map((p) => ({
        uri: `presotion://presentation/${p.id}`,
        name: p.title,
        description: `Presentation with ${p.slides.length} slides`,
        mimeType: 'application/json',
      })),
    };
  });

  // Read resources
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    const match = uri.match(/^presotion:\/\/presentation\/(.+)$/);
    
    if (match) {
      const presentation = store.get(match[1]);
      if (presentation) {
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(presentation, null, 2),
          }],
        };
      }
    }
    
    throw new Error(`Resource not found: ${uri}`);
  });

  return server;
}

/**
 * Generate TypeScript code for a presentation
 */
function generatePresentationCode(presentation: PresentationData): string {
  const imports = [
    `import { Deck, Fragment, FragmentList, usePresentationConfig } from '@presotion/core';`,
  ];

  const layoutsUsed = new Set(presentation.slides.map((s) => s.layout));
  if (layoutsUsed.size > 0) {
    const layoutImports = Array.from(layoutsUsed)
      .filter((l) => l !== 'default')
      .map((l) => `${capitalize(l)}Layout`);
    if (layoutImports.length > 0) {
      imports.push(`import { ${layoutImports.join(', ')} } from '@presotion/layouts';`);
    }
  }

  const hasCode = presentation.slides.some((s) => s.code);
  if (hasCode) {
    imports.push(`import { CodeBlock } from '@presotion/code';`);
  }

  let code = imports.join('\n') + '\n\n';

  code += `export const ${toPascalCase(presentation.id)} = () => {\n`;
  code += `  return (\n`;
  code += `    <Deck>\n`;

  presentation.slides.forEach((slide, i) => {
    code += `      <Deck.Slide fragmentCount={${slide.fragmentCount || 1}}>\n`;
    code += generateSlideContent(slide, 8);
    code += `      </Deck.Slide>\n`;
  });

  code += `    </Deck>\n`;
  code += `  );\n`;
  code += `};\n`;

  return code;
}

function generateSlideContent(slide: any, indent: number): string {
  const pad = ' '.repeat(indent);
  let content = '';

  switch (slide.layout) {
    case 'center':
      content += `${pad}<CenterLayout>\n`;
      if (slide.title) content += `${pad}  <h1>${slide.title}</h1>\n`;
      if (slide.content) {
        content += `${pad}  <FragmentList>\n`;
        slide.content.forEach((item: string) => {
          content += `${pad}    <p>${item}</p>\n`;
        });
        content += `${pad}  </FragmentList>\n`;
      }
      content += `${pad}</CenterLayout>\n`;
      break;

    case 'cover':
      content += `${pad}<CoverLayout\n`;
      if (slide.title) content += `${pad}  title="${slide.title}"\n`;
      if (slide.subtitle) content += `${pad}  subtitle="${slide.subtitle}"\n`;
      if (slide.footer) content += `${pad}  footer="${slide.footer}"\n`;
      content += `${pad}/>\n`;
      break;

    default:
      content += `${pad}<DefaultLayout>\n`;
      if (slide.title) content += `${pad}  <h2>${slide.title}</h2>\n`;
      if (slide.content) {
        content += `${pad}  <FragmentList>\n`;
        slide.content.forEach((item: string) => {
          content += `${pad}    <li>${item}</li>\n`;
        });
        content += `${pad}  </FragmentList>\n`;
      }
      if (slide.code) {
        content += `${pad}  <CodeBlock language="${slide.code.language}">\n`;
        content += `${pad}    {\`${slide.code.content}\`}\n`;
        content += `${pad}  </CodeBlock>\n`;
      }
      content += `${pad}</DefaultLayout>\n`;
  }

  return content;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => capitalize(word))
    .join('');
}

export { store } from './store.js';
export * from './schemas.js';
