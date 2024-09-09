export const formatDate = (isoString : string) => {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    return formattedDate.replace(",", "");
};