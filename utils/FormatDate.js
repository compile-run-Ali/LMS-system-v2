export const formatDate = (dateInString) => {
    // date is in format   "2021-05-20T18:30:00.000Z"
    const date = new Date(dateInString);
    console.log("date is ", date);

    const dateString =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0");

    return dateString;
};

export const formatTime = (dateInString) => {
    // date is in format   "2021-05-20T18:30:00.000Z"
    const date = new Date(dateInString);
    console.log("date is ", date);

    const timeString =
        (date.getHours()-5).toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0") +
        ":" +
        date.getSeconds().toString().padStart(2, "0");

    return timeString;
}
