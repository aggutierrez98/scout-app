export const formatEmptyStrings = (data: object) => {
    for (const key of Object.keys(data)) {
        if (data[key as keyof object] === "") (data[key as keyof object] as unknown) = null;
    }
    return data
}