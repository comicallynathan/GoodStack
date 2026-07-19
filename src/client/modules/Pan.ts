const parser = new DOMParser();

/**
 * Appends elements onto root.
 * @param root 
 * @param elements 
 */
export function Add( root: HTMLElement, elements: string )
{
    const container = parser.parseFromString( elements, "text/html" );
    for ( const v of container.children ) document.body.appendChild( v );
}

export const Pan = {
    Add
};

export default Pan;