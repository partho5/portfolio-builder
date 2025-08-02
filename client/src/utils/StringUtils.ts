
export const truncateText = (input: string): string => {
    const maxLength = 100;  // Set the maximum length
    if (input.length > maxLength) {
        return input.slice(0, maxLength) + "....";  // Truncate and append ellipsis
    }
    return input; // Return the input as is, if it's within the limit
}


export const textToSlug = (title: string): string => {
    return title
        .toLowerCase()                          // Convert to lower case
        .trim()                                 // Remove whitespace from both ends
        .replace(/\s+/g, '-')                   // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')               // Remove all non-word characters (keep hyphens)
        .replace(/\-\-+/g, '-')                 // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '');               // Trim hyphens from start and end
}
