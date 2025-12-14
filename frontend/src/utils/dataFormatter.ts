export function convertDate(givenDate: string): string {
    return new Date(givenDate).toLocaleString("en-US",
        {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }
    );
}