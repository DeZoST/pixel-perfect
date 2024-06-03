export function snakeToCamel(obj) {
    const newObj = {}
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // Convert key to lowercase, then to camelCase
            const camelCaseKey = key.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
            newObj[camelCaseKey] = obj[key]
        }
    }
    return newObj
}

export function getWoolColor(wool) {
    switch (wool) {
        case 1:
            return "red"
        case 2:
            return "pink"
        case 3:
            return "lime"
        case 4:
            return "green"
        case 5:
            return "blue"
        case 6:
            return "yellow"
        default:
            return null
    }
}
