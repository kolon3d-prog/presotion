import { PresentationData, SlideData } from './schemas.js';

/**
 * In-memory storage for presentations during a session.
 * In production, this would be backed by the file system or a database.
 */
class PresentationStore {
  private presentations: Map<string, PresentationData> = new Map();

  create(presentation: PresentationData): PresentationData {
    this.presentations.set(presentation.id, presentation);
    return presentation;
  }

  get(id: string): PresentationData | undefined {
    return this.presentations.get(id);
  }

  getAll(): PresentationData[] {
    return Array.from(this.presentations.values());
  }

  update(id: string, updates: Partial<PresentationData>): PresentationData | undefined {
    const presentation = this.presentations.get(id);
    if (!presentation) return undefined;

    const updated = { ...presentation, ...updates };
    this.presentations.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.presentations.delete(id);
  }

  addSlide(presentationId: string, slide: SlideData, position?: number): PresentationData | undefined {
    const presentation = this.presentations.get(presentationId);
    if (!presentation) return undefined;

    const newSlide = { ...slide, id: slide.id || `slide-${Date.now()}` };
    const slides = [...presentation.slides];

    if (position !== undefined && position >= 0 && position <= slides.length) {
      slides.splice(position, 0, newSlide);
    } else {
      slides.push(newSlide);
    }

    const updated = { ...presentation, slides };
    this.presentations.set(presentationId, updated);
    return updated;
  }

  updateSlide(
    presentationId: string,
    slideIndex: number,
    updates: Partial<SlideData>
  ): PresentationData | undefined {
    const presentation = this.presentations.get(presentationId);
    if (!presentation) return undefined;
    if (slideIndex < 0 || slideIndex >= presentation.slides.length) return undefined;

    const slides = [...presentation.slides];
    slides[slideIndex] = { ...slides[slideIndex], ...updates };

    const updated = { ...presentation, slides };
    this.presentations.set(presentationId, updated);
    return updated;
  }

  removeSlide(presentationId: string, slideIndex: number): PresentationData | undefined {
    const presentation = this.presentations.get(presentationId);
    if (!presentation) return undefined;
    if (slideIndex < 0 || slideIndex >= presentation.slides.length) return undefined;

    const slides = presentation.slides.filter((_, i) => i !== slideIndex);
    const updated = { ...presentation, slides };
    this.presentations.set(presentationId, updated);
    return updated;
  }
}

export const store = new PresentationStore();
