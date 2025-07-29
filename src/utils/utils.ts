export function hexToLocaleString(hex: string): string {
    return parseInt(hex, 16).toLocaleString()
}

export const camelCaseToRegularText = (camelCaseString: string) => {
    // Add a space before each uppercase letter that is preceded by a lowercase letter
    const withSpaces = camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2")

    // Capitalize the first letter of the entire string
    const capitalizedFirst =
        withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)

    return capitalizedFirst
}

export function isValidETHAddress(str: string | null): boolean {
    // Regex to check valid
    // BITCOIN Address
    const regex = new RegExp(/^(0x)?[0-9a-fA-F]{40}$/);

    // if str
    // is empty return false
    if (str == null) {
        return false;
    }

    // Return true if the str
    // matched the ReGex
    if (regex.test(str) == true) {
        return true;
    } else {
        return false;
    }
}