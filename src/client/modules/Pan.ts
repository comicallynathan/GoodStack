const parser = new DOMParser();

/**
 * Appends elements onto root.
 * @param root 
 * @param elements 
 */
export function Add( root: HTMLElement, elements: string ): HTMLCollection
{
    const container = parser.parseFromString( elements, "text/html" );
    const nodes = container.children;
    for ( const v of nodes ) document.body.appendChild( v );
    return nodes;
            
}

export const Pan = {
    Add
};

export default Pan;