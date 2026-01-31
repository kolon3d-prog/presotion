import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { z } from 'zod';

/**
 * Schema for a single slide in a presentation
 */
declare const SlideSchema: z.ZodObject<{
    /** Unique ID for the slide */
    id: z.ZodOptional<z.ZodString>;
    /** Layout type for the slide */
    layout: z.ZodDefault<z.ZodEnum<["default", "center", "cover", "two-cols", "two-cols-header", "image", "image-right", "image-left", "quote", "section"]>>;
    /** Slide title */
    title: z.ZodOptional<z.ZodString>;
    /** Content items (bullet points, paragraphs) */
    content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /** Code block content */
    code: z.ZodOptional<z.ZodObject<{
        language: z.ZodString;
        content: z.ZodString;
        highlightLines: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    }, "strip", z.ZodTypeAny, {
        content: string;
        language: string;
        highlightLines?: number[] | undefined;
    }, {
        content: string;
        language: string;
        highlightLines?: number[] | undefined;
    }>>;
    /** Image URL */
    image: z.ZodOptional<z.ZodString>;
    /** Background color or gradient */
    background: z.ZodOptional<z.ZodString>;
    /** Text color */
    color: z.ZodOptional<z.ZodString>;
    /** Subtitle (for cover/section layouts) */
    subtitle: z.ZodOptional<z.ZodString>;
    /** Footer text (for cover layouts) */
    footer: z.ZodOptional<z.ZodString>;
    /** Quote attribution (for quote layouts) */
    author: z.ZodOptional<z.ZodString>;
    /** Number of fragments (click steps) */
    fragmentCount: z.ZodDefault<z.ZodNumber>;
    /** Speaker notes */
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    layout: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section";
    fragmentCount: number;
    title?: string | undefined;
    content?: string[] | undefined;
    image?: string | undefined;
    id?: string | undefined;
    code?: {
        content: string;
        language: string;
        highlightLines?: number[] | undefined;
    } | undefined;
    background?: string | undefined;
    color?: string | undefined;
    subtitle?: string | undefined;
    footer?: string | undefined;
    author?: string | undefined;
    notes?: string | undefined;
}, {
    title?: string | undefined;
    content?: string[] | undefined;
    image?: string | undefined;
    id?: string | undefined;
    layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
    code?: {
        content: string;
        language: string;
        highlightLines?: number[] | undefined;
    } | undefined;
    background?: string | undefined;
    color?: string | undefined;
    subtitle?: string | undefined;
    footer?: string | undefined;
    author?: string | undefined;
    fragmentCount?: number | undefined;
    notes?: string | undefined;
}>;
type SlideData = z.infer<typeof SlideSchema>;
/**
 * Schema for a complete presentation
 */
declare const PresentationSchema: z.ZodObject<{
    /** Unique ID for the presentation */
    id: z.ZodString;
    /** Presentation title */
    title: z.ZodString;
    /** Presentation author */
    author: z.ZodOptional<z.ZodString>;
    /** Theme name */
    theme: z.ZodDefault<z.ZodEnum<["dark", "light", "corporate", "minimal"]>>;
    /** Width in pixels */
    width: z.ZodDefault<z.ZodNumber>;
    /** Height in pixels */
    height: z.ZodDefault<z.ZodNumber>;
    /** Array of slides */
    slides: z.ZodArray<z.ZodObject<{
        /** Unique ID for the slide */
        id: z.ZodOptional<z.ZodString>;
        /** Layout type for the slide */
        layout: z.ZodDefault<z.ZodEnum<["default", "center", "cover", "two-cols", "two-cols-header", "image", "image-right", "image-left", "quote", "section"]>>;
        /** Slide title */
        title: z.ZodOptional<z.ZodString>;
        /** Content items (bullet points, paragraphs) */
        content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /** Code block content */
        code: z.ZodOptional<z.ZodObject<{
            language: z.ZodString;
            content: z.ZodString;
            highlightLines: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        }, "strip", z.ZodTypeAny, {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        }, {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        }>>;
        /** Image URL */
        image: z.ZodOptional<z.ZodString>;
        /** Background color or gradient */
        background: z.ZodOptional<z.ZodString>;
        /** Text color */
        color: z.ZodOptional<z.ZodString>;
        /** Subtitle (for cover/section layouts) */
        subtitle: z.ZodOptional<z.ZodString>;
        /** Footer text (for cover layouts) */
        footer: z.ZodOptional<z.ZodString>;
        /** Quote attribution (for quote layouts) */
        author: z.ZodOptional<z.ZodString>;
        /** Number of fragments (click steps) */
        fragmentCount: z.ZodDefault<z.ZodNumber>;
        /** Speaker notes */
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        layout: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section";
        fragmentCount: number;
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        notes?: string | undefined;
    }, {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    }>, "many">;
    /** Primary color for the theme */
    primaryColor: z.ZodOptional<z.ZodString>;
    /** Secondary color for the theme */
    secondaryColor: z.ZodOptional<z.ZodString>;
    /** Font family */
    fontFamily: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    theme: "light" | "dark" | "corporate" | "minimal";
    id: string;
    width: number;
    height: number;
    slides: {
        layout: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section";
        fragmentCount: number;
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        notes?: string | undefined;
    }[];
    author?: string | undefined;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
    fontFamily?: string | undefined;
}, {
    title: string;
    id: string;
    slides: {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    }[];
    theme?: "light" | "dark" | "corporate" | "minimal" | undefined;
    author?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
    fontFamily?: string | undefined;
}>;
type PresentationData = z.infer<typeof PresentationSchema>;
/**
 * Schema for creating a new presentation
 */
declare const CreatePresentationSchema: z.ZodObject<{
    /** Unique ID for the presentation */
    id: z.ZodString;
    /** Presentation title */
    title: z.ZodString;
    /** Presentation author */
    author: z.ZodOptional<z.ZodString>;
    /** Theme name */
    theme: z.ZodDefault<z.ZodEnum<["dark", "light", "corporate", "minimal"]>>;
    /** Width in pixels */
    width: z.ZodDefault<z.ZodNumber>;
    /** Height in pixels */
    height: z.ZodDefault<z.ZodNumber>;
    /** Array of slides */
    slides: z.ZodArray<z.ZodObject<{
        /** Unique ID for the slide */
        id: z.ZodOptional<z.ZodString>;
        /** Layout type for the slide */
        layout: z.ZodDefault<z.ZodEnum<["default", "center", "cover", "two-cols", "two-cols-header", "image", "image-right", "image-left", "quote", "section"]>>;
        /** Slide title */
        title: z.ZodOptional<z.ZodString>;
        /** Content items (bullet points, paragraphs) */
        content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /** Code block content */
        code: z.ZodOptional<z.ZodObject<{
            language: z.ZodString;
            content: z.ZodString;
            highlightLines: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        }, "strip", z.ZodTypeAny, {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        }, {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        }>>;
        /** Image URL */
        image: z.ZodOptional<z.ZodString>;
        /** Background color or gradient */
        background: z.ZodOptional<z.ZodString>;
        /** Text color */
        color: z.ZodOptional<z.ZodString>;
        /** Subtitle (for cover/section layouts) */
        subtitle: z.ZodOptional<z.ZodString>;
        /** Footer text (for cover layouts) */
        footer: z.ZodOptional<z.ZodString>;
        /** Quote attribution (for quote layouts) */
        author: z.ZodOptional<z.ZodString>;
        /** Number of fragments (click steps) */
        fragmentCount: z.ZodDefault<z.ZodNumber>;
        /** Speaker notes */
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        layout: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section";
        fragmentCount: number;
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        notes?: string | undefined;
    }, {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    }>, "many">;
    /** Primary color for the theme */
    primaryColor: z.ZodOptional<z.ZodString>;
    /** Secondary color for the theme */
    secondaryColor: z.ZodOptional<z.ZodString>;
    /** Font family */
    fontFamily: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    theme: "light" | "dark" | "corporate" | "minimal";
    id: string;
    width: number;
    height: number;
    slides: {
        layout: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section";
        fragmentCount: number;
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        notes?: string | undefined;
    }[];
    author?: string | undefined;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
    fontFamily?: string | undefined;
}, {
    title: string;
    id: string;
    slides: {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    }[];
    theme?: "light" | "dark" | "corporate" | "minimal" | undefined;
    author?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
    fontFamily?: string | undefined;
}>;
/**
 * Schema for adding a slide
 */
declare const AddSlideSchema: z.ZodObject<{
    presentationId: z.ZodString;
    slide: z.ZodObject<{
        /** Unique ID for the slide */
        id: z.ZodOptional<z.ZodString>;
        /** Layout type for the slide */
        layout: z.ZodDefault<z.ZodEnum<["default", "center", "cover", "two-cols", "two-cols-header", "image", "image-right", "image-left", "quote", "section"]>>;
        /** Slide title */
        title: z.ZodOptional<z.ZodString>;
        /** Content items (bullet points, paragraphs) */
        content: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /** Code block content */
        code: z.ZodOptional<z.ZodObject<{
            language: z.ZodString;
            content: z.ZodString;
            highlightLines: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        }, "strip", z.ZodTypeAny, {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        }, {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        }>>;
        /** Image URL */
        image: z.ZodOptional<z.ZodString>;
        /** Background color or gradient */
        background: z.ZodOptional<z.ZodString>;
        /** Text color */
        color: z.ZodOptional<z.ZodString>;
        /** Subtitle (for cover/section layouts) */
        subtitle: z.ZodOptional<z.ZodString>;
        /** Footer text (for cover layouts) */
        footer: z.ZodOptional<z.ZodString>;
        /** Quote attribution (for quote layouts) */
        author: z.ZodOptional<z.ZodString>;
        /** Number of fragments (click steps) */
        fragmentCount: z.ZodDefault<z.ZodNumber>;
        /** Speaker notes */
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        layout: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section";
        fragmentCount: number;
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        notes?: string | undefined;
    }, {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    }>;
    position: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    presentationId: string;
    slide: {
        layout: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section";
        fragmentCount: number;
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        notes?: string | undefined;
    };
    position?: number | undefined;
}, {
    presentationId: string;
    slide: {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    };
    position?: number | undefined;
}>;
/**
 * Schema for updating a slide
 */
declare const UpdateSlideSchema: z.ZodObject<{
    presentationId: z.ZodString;
    slideIndex: z.ZodNumber;
    updates: z.ZodObject<{
        id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        layout: z.ZodOptional<z.ZodDefault<z.ZodEnum<["default", "center", "cover", "two-cols", "two-cols-header", "image", "image-right", "image-left", "quote", "section"]>>>;
        title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        content: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        code: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            language: z.ZodString;
            content: z.ZodString;
            highlightLines: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        }, "strip", z.ZodTypeAny, {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        }, {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        }>>>;
        image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        background: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        color: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        subtitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        footer: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        author: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        fragmentCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    }, {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    presentationId: string;
    slideIndex: number;
    updates: {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    };
}, {
    presentationId: string;
    slideIndex: number;
    updates: {
        title?: string | undefined;
        content?: string[] | undefined;
        image?: string | undefined;
        id?: string | undefined;
        layout?: "image" | "default" | "center" | "cover" | "two-cols" | "two-cols-header" | "image-right" | "image-left" | "quote" | "section" | undefined;
        code?: {
            content: string;
            language: string;
            highlightLines?: number[] | undefined;
        } | undefined;
        background?: string | undefined;
        color?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
        author?: string | undefined;
        fragmentCount?: number | undefined;
        notes?: string | undefined;
    };
}>;
/**
 * Schema for removing a slide
 */
declare const RemoveSlideSchema: z.ZodObject<{
    presentationId: z.ZodString;
    slideIndex: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    presentationId: string;
    slideIndex: number;
}, {
    presentationId: string;
    slideIndex: number;
}>;
/**
 * Schema for previewing a slide
 */
declare const PreviewSlideSchema: z.ZodObject<{
    presentationId: z.ZodString;
    slideIndex: z.ZodNumber;
    fragmentIndex: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    presentationId: string;
    slideIndex: number;
    fragmentIndex: number;
}, {
    presentationId: string;
    slideIndex: number;
    fragmentIndex?: number | undefined;
}>;
/**
 * Schema for exporting a presentation
 */
declare const ExportPresentationSchema: z.ZodObject<{
    presentationId: z.ZodString;
    format: z.ZodEnum<["pdf", "pptx", "html", "spa"]>;
    outputPath: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    presentationId: string;
    format: "pdf" | "pptx" | "html" | "spa";
    outputPath?: string | undefined;
}, {
    presentationId: string;
    format: "pdf" | "pptx" | "html" | "spa";
    outputPath?: string | undefined;
}>;
/**
 * Schema for setting the theme
 */
declare const SetThemeSchema: z.ZodObject<{
    presentationId: z.ZodString;
    theme: z.ZodEnum<["dark", "light", "corporate", "minimal"]>;
    primaryColor: z.ZodOptional<z.ZodString>;
    secondaryColor: z.ZodOptional<z.ZodString>;
    fontFamily: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    theme: "light" | "dark" | "corporate" | "minimal";
    presentationId: string;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
    fontFamily?: string | undefined;
}, {
    theme: "light" | "dark" | "corporate" | "minimal";
    presentationId: string;
    primaryColor?: string | undefined;
    secondaryColor?: string | undefined;
    fontFamily?: string | undefined;
}>;

/**
 * In-memory storage for presentations during a session.
 * In production, this would be backed by the file system or a database.
 */
declare class PresentationStore {
    private presentations;
    create(presentation: PresentationData): PresentationData;
    get(id: string): PresentationData | undefined;
    getAll(): PresentationData[];
    update(id: string, updates: Partial<PresentationData>): PresentationData | undefined;
    delete(id: string): boolean;
    addSlide(presentationId: string, slide: SlideData, position?: number): PresentationData | undefined;
    updateSlide(presentationId: string, slideIndex: number, updates: Partial<SlideData>): PresentationData | undefined;
    removeSlide(presentationId: string, slideIndex: number): PresentationData | undefined;
}
declare const store: PresentationStore;

/**
 * Create and configure the Presotion MCP server.
 */
declare function createServer(): Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
        progressToken?: string | number | undefined;
        "io.modelcontextprotocol/related-task"?: {
            taskId: string;
        } | undefined;
    } | undefined;
}>;

export { AddSlideSchema, CreatePresentationSchema, ExportPresentationSchema, type PresentationData, PresentationSchema, PreviewSlideSchema, RemoveSlideSchema, SetThemeSchema, type SlideData, SlideSchema, UpdateSlideSchema, createServer, store };
