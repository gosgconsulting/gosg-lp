/**
 * Template Engine for Variable Substitution
 * Replaces {{variable}} placeholders with actual content values
 */

export interface ContentData {
  [key: string]: string | number | boolean | ContentData | ContentData[];
}

/**
 * Replace template variables in a string with actual values
 * @param template - String containing {{variable}} placeholders
 * @param data - Object containing the replacement values
 * @returns String with variables replaced
 */
export function replaceTemplateVariables(template: string, data: ContentData): string {
  return template.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
    const value = getNestedValue(data, path);
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Get nested value from object using dot notation
 * @param obj - Object to search in
 * @param path - Dot-separated path (e.g., "hero.title")
 * @returns The value at the path or undefined
 */
function getNestedValue(obj: ContentData, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj);
}

/**
 * Process a React component template with content data
 * @param templateComponent - React component with {{variables}}
 * @param contentData - Data to replace variables with
 * @returns Processed component
 */
export function processTemplate<T>(
  templateComponent: T,
  contentData: ContentData
): T {
  // For React components, we'll need to process the JSX at runtime
  // This is a placeholder for the actual implementation
  return templateComponent;
}

/**
 * Load content data from JSON file
 * @param contentPath - Path to content JSON file
 * @returns Promise<ContentData>
 */
export async function loadContentData(contentPath: string): Promise<ContentData> {
  try {
    const response = await fetch(contentPath);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading content data:', error);
    return {};
  }
}

/**
 * Template processing hook for React components
 */
export function useTemplateContent(contentPath: string) {
  const [content, setContent] = React.useState<ContentData>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadContentData(contentPath)
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [contentPath]);

  return { content, loading, error };
}

/**
 * Template component wrapper that automatically processes variables
 */
export function withTemplate<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  contentPath: string
) {
  return function TemplateComponent(props: P) {
    const { content, loading, error } = useTemplateContent(contentPath);

    if (loading) {
      return <div>Loading content...</div>;
    }

    if (error) {
      return <div>Error loading content: {error}</div>;
    }

    // Pass content as props to the wrapped component
    return <WrappedComponent {...props} content={content} />;
  };
}
