   export const camelCaseToRegularText = (camelCaseString: string) => {
        // Add a space before each uppercase letter that is preceded by a lowercase letter
        const withSpaces = camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2")

        // Capitalize the first letter of the entire string
        const capitalizedFirst =
            withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)

        return capitalizedFirst
    }